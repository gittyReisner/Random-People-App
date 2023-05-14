import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { fetchSavedPeopleAsync, fetchPeopleAsync ,savePersonAsync} from '../reducers/people';

const List = () => {
  const { loading, people, error } = useSelector((state) => state.people);
  const [nameFilter, setNameFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

useEffect(() => {
    dispatch(fetchPeopleAsync({ name: nameFilter, country: countryFilter }));
  }, [dispatch, nameFilter, countryFilter]);

  if (!people) {
    return null;
  }
  const filteredPeople = people
  .filter((person) =>
    person.name.first.toLowerCase().includes(nameFilter.toLowerCase())
  )
  .filter((person) =>
  person.location?.country &&
  person.location.country.toLowerCase().includes(countryFilter.toLowerCase())
);
 

  const handleProfileClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleSaveClick = async (person) => {
    await dispatch(savePersonAsync (person));
    dispatch(fetchSavedPeopleAsync());
  };

  const handleSearchClick = () => {
    dispatch(fetchPeopleAsync({ name: nameFilter, country: countryFilter }));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <TextField
        label="Name"
        variant="outlined"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <TextField
        label="Country"
        variant="outlined"
        value={countryFilter}
        onChange={(e) => setCountryFilter(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<Search />}
        onClick={handleSearchClick}
      >
        Search
      </Button>
      {filteredPeople.length === 0 ? (
        <div>No results found.</div>
      ) : (
        filteredPeople.map((person, index) => (
          <Card key={index}>
            <CardHeader
              title={`${person.name.title} ${person.name.first} ${person.name.last}`}
            />
            <CardContent>
              <div>Gender: {person.gender}</div>
              <div>Country: {person.location.country}</div>
              <div>Phone: {person.phone}</div>
              <div>Email: {person.email}</div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleProfileClick(index)}
              >
                View Profile
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleSaveClick(person)}
              >
                Save
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default List;
