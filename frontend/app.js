import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import AddBlog from './routes/AddBlog';
import Login from './routes/Login';
import Register from './routes/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add-blog" component={AddBlog} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;