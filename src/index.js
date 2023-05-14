import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './api/componnet/Home';
import List from './api/componnet/List';
import Profile from './api/componnet/Profile';
import store from './api/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Container maxWidth="sm">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/list" element={<List />} />
          <Route exact path="/saved" element={<List />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
      </Container>
    </Router>
  </Provider>,
  document.getElementById('root')
);
