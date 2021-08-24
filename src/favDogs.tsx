//basic grid layout
import Grid from '@material-ui/core/Grid';
import { Button, Drawer, List, ListItem } from '@material-ui/core';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface favouriteDogsModalProps {
    modalVisibility: (visible: boolean) => void;
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
            <div className="Drawer-width">
                <Drawer anchor={'right'} open={drawerOpen} onClose={() => setDrawerOpen(false)} >
                    <h2>
                        Your Favourite Dogs
                    </h2>
                    {fav &&
                        <List>
                            <Button variant="contained" color='secondary' onClick={() => setDrawerOpen(false)}>
                                Close Favourites
                            </Button>
                            {fav.map((element, index) => {
                                { console.log(fav[index]) }
                                return (<ListItem key={index}>
                                    <img width='50%' src={fav[index]} />
                                </ListItem>)
                            })}
                        </List>
                    }
                </Drawer>
            </div>
            <div className="App-padding">
                <Grid container>
                    <Grid item xs={4}>
                        <Button variant="contained" color='primary' onClick={() => modalVisibility(false)}>
                            Go Back
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color='primary' onClick={() => {
                            setRefreshImages(true);
                        }}>
                            Refresh
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color='primary' onClick={() => {
                            setDrawerOpen(true);
                            console.log('should show', fav)
                        }}>
                            Open Favourites
                        </Button>
                    </Grid>
                </Grid>
                <div className="Margin-top">
                    <Grid container spacing={3} >
                        {Array.from(Array(6), (e, i) => {
                            return (<Grid item xs={4}>
                                <div style={{ background: randomColor() }}>
                                    <img width='50%' src={images[i]} />
                                </div>
                                <Button variant="contained" color='secondary' onClick={() => { !fav.includes(images[i]) && setFavs(oldArray => [...oldArray, images[i]]) }}>Favourite</Button>
                            </Grid>)
                        })}
                    </Grid>
                </div>
            </div >
        </>
    )
}
