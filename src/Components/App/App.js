import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../Login/Login';
import DreamInput from '../DreamInput/DreamInput';
import DreamList from '../DreamList/DreamList';
import NotFound from '../NotFound/NotFound';
import Nav from '../Nav/Nav';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Login /> } />
        <Route exact path="/Home" render={() => 
        <>
        <Nav />
        <DreamInput />
        </>} />
        <Route exact path="/Dreams" render={() => 
        <>
        <Nav />
        <DreamList />
        </>} />
        <Route path="*" render={() =>
        <>
        <Nav />
        <NotFound />
        </> } />
      </Switch>
    </div>
  );
};

export default App;
