import React, { useEffect} from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {profileAction, deleteSessionAction} from '../actions/authActions';
import {
    List,
    ListItem,
    ListItemText,
    Button,
    createMuiTheme,
} from "@material-ui/core";

function Profile({ token, profile, deleteSession, updateProfile }){
    useEffect(() => {
        axios({
          method: 'get',
          url: '/profile',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => updateProfile(res.data));
    }, []);
    const handleLogout = () => {
    deleteSession();
    updateProfile({});
    };

    const classes = createMuiTheme();

    return(
        <List>
            <ListItem>
                <ListItemText primary={profile.email} secondary={profile.firstname + " " + profile.lastname}/>
            </ListItem>
            <Button
                onClick={handleLogout}
                variant="contained"
                color="primary"
                className={classes.textField}
                style={{
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    marginTop: '16px',
                }}
                >
                Log out
            </Button>
        </List>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    profile: state.auth.profile,
});

const mapDispatchToProps = (dispatch) => ({
    deleteSession: (token) => dispatch(deleteSessionAction()),
    updateProfile: (profile) => dispatch(profileAction(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);