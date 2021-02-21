import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const Message = ({pos,message,user}) => {
    let color = (pos==="right")? "primary" : "secondary"
    return (
        <ListItem key="1">
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align={pos} ><Chip color={color} size="medium" label={message} /></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={pos} secondary={user} ></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default Message;
