import React, {useState} from "react";
import { Link } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    SnackbarContent,
    createMuiTheme,
} from "@material-ui/core";

export default function Profile(){
    const [profile, setProfile] = useState({
        email:  "power.ranger@wildcodeschool.fr",
        firstname:  "Power",
        lastname:  "Ranger"
    })
    const handleSubmit = () => {
        return 
      };
    const classes = createMuiTheme();

    return(
        <List>
            <ListItem>
                <ListItemText primary={profile.email} secondary={profile.firstname + " " + profile.lastname}/>
            </ListItem>
            <Link to="/" className={classes.submit}>
                <Button
                    type="submit"
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
            </Link>
        </List>
    )
}