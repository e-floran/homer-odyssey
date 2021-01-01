import React, { useEffect} from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import {profileAction, deleteSessionAction} from '../actions/authActions';
import {
    List,
    ListItem,
    ListItemText,
    Button,
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


    return(
        <>
            <List>
            <ListItem>
            <ListItemText primary="email" secondary={profile.email} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="fullname"
              secondary={`${profile.firstname} ${profile.lastname}`}
            />
          </ListItem>
            </List>
            <Button
                onClick={handleLogout}
                variant="contained"
                color="primary"
                style={{
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    marginTop: '16px',
                }}
                >
                Log out
            </Button>
        </>
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