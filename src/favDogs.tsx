//basic grid layout
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import './App.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1), //grid padding
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export interface favouriteDogsModalProps {
    modalVisibility: (visible: boolean) => void;
}

export const FavouriteDogsModalComponent = ({ modalVisibility }: favouriteDogsModalProps) => {

    return (
        <div className="App">
            <Grid container justifyContent="center" alignItems="center">
                <Button variant="contained" color='primary' onClick={() => modalVisibility(false)}>
                    Go Back
                </Button>
                <Grid item>
                    <div>
                        TEST
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}



// for other modules to 
//     //import in the grid function. 
//     //create class based upon class outside of export default. 
//     const classes = useStyles();

//     function FormRow() {
//         return ( //return renders the grid
//             <React.Fragment>
//                 <Grid item xs={4}>
//                     <Paper className={classes.paper}>item</Paper>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <Paper className={classes.paper}>item</Paper>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <Paper className={classes.paper}>item</Paper>
//                 </Grid>
//             </React.Fragment>
//         );
//     } //end of function declaration/creation FormRow()
//     //usage of formrow element. The declaration above doesn't run. 
//     return (<Grid container spacing={1}>
//         <Grid container item xs={12} spacing={3}>
//             <FormRow />
//         </Grid>
//         <Grid container item xs={12} spacing={3}>
//             <FormRow />
//         </Grid>
//         <Grid container item xs={12} spacing={3}>
//             <FormRow />
//         </Grid>
//     </Grid>)