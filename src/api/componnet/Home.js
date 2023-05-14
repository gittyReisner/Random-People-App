import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import { fetchPeopleAsync } from '../reducers/people';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFetch = () => {
    dispatch(fetchPeopleAsync({ name: '', country: '' }));
    navigate('/list');
  };

  const handleHistory = () => {
    navigate('/saved');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleFetch}>Fetch</Button>
      <Button variant="contained" color="secondary" onClick={handleHistory}>History</Button>
    </div>
  );
};

export default Home;