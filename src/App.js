import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import './App.css';
import addTodo from './pages/addTodo';
import EditTodo from './pages/EditTodo';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">

    <Switch>
      <Route exact path="/" component={Home}>
      </Route>
      <Route exact path="/addTodo" component={addTodo}></Route>
      <Route exact path="/editTodo/:id" component={EditTodo}></Route>

    </Switch>

    </div>
  );
}

export default App;
