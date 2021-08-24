//basic grid layout
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Drawer, List, ListItem } from '@material-ui/core';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

const theme = {
    spacing: 8,
}

const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}



export const FavouriteDogsModalComponent = ({ modalVisibility }: favouriteDogsModalProps) => {
    const [refreshImages, setRefreshImages] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);
    const [fav, setFavs] = useState<string[]>([]);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const getImages = () => {
        Array.from(Array(6), async (e, i) => {
            const a = await axios.get('https://random.dog/woof.json')
                .then(response => {
                    setImages(oldArray => [...oldArray, response.data.url])
                }).then(() => {
                    console.log(images)
                    // axios.get(images).then(res => {
                    // })
                });
        })
    }

    useEffect(() => {
        setRefreshImages(false);
        setImages([]);
        getImages();
    }, [refreshImages]);

    return (
        <>
            <Drawer anchor={'left'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                {fav &&
                    <List>
                        {fav.forEach((element, index) => {
                            { console.log(fav[index]) }
                            <ListItem key={index}>
                                <img src={fav[0]} />
                            </ListItem>
                        })}
                        <ListItem key={999}>
                            <div>{!fav && 'No Favourites so far'}</div>
                        </ListItem>
                    </List>
                }

            </Drawer>
            <div className="App-padding">
                <Button variant="contained" color='primary' onClick={() => modalVisibility(false)}>
                    Go Back
                </Button>
                <Button variant="contained" color='primary' onClick={() => {
                    setRefreshImages(true);
                }}>
                    Refresh
                </Button>
                <Button variant="contained" color='primary' onClick={() => {
                    setDrawerOpen(true);
                    console.log('should show', fav)
                }}>
                    Open Favourites
                </Button>
                <div className="Margin-top">
                    <Grid container spacing={3} >
                        {Array.from(Array(6), (e, i) => {
                            return (<Grid item xs={4}>
                                <div style={{ background: randomColor() }}>
                                    <img width='50%' src={images[i]} />
                                </div>
                                <Button variant="contained" color='secondary' onClick={() => { setFavs(oldArray => [...oldArray, images[i]]) }}>Favourite</Button>
                            </Grid>)
                        })}
                    </Grid>
                </div>
            </div >
        </>
    )
}
