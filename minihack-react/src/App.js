import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import CreateGameScreen from './pages/CreateGameSreen';
import GameDetailScreen from './pages/GameDetailScreen';

function App() {
  return (
    // "/" => Create Game
    // "/game/:gameId" => Game Detail
    <Router>
      <Route path="/" exact={true} component={CreateGameScreen} />
      <Route path="/game/:gameId" component={GameDetailScreen} />
    </Router>
  );
}

export default App;
