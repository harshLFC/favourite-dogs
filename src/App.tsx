import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import { FavouriteDogsModalComponent } from './favDogs';

function App() {
  const [showModal, setModal] = useState(false);
  return (
    <div className="App">
      {!showModal && (<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Favourite Dogs; <code>Click </code>below to go to the app
        </p>
        <Button variant="contained" color='primary' onClick={() => setModal(true)}>
          Take Me There
        </Button>
      </header>)}
      {showModal && <FavouriteDogsModalComponent modalVisibility={(showModal) => setModal(showModal)} />}
    </div>
  );
}

export default App;
