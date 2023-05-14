import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@material-ui/core';
import { Save, Delete, Edit, Update, ArrowBack } from '@material-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePerson, updatePerson, savePerson } from '../index';
import { fetchSavedPeopleAsync ,deletePersonAsync} from '../reducers/people';

const Profile = () => {
  const { id } = useParams();
  const { loading, people, error } = useSelector((state) => state.people);
  const [person, setPerson] = useState(people[id]);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteClick = async (id) => {
    try {
      await deletePerson(id);
      dispatch(fetchSavedPeopleAsync());
      navigate('/saved');
    } catch (error) {
      console.error(error);
      navigate('/delete');
      dispatch(deletePersonAsync())
    }
  };

  const handleUpdateClick = async (id, updatedPerson) => {
    try {
      await updatePerson(id, updatedPerson);
      dispatch(fetchSavedPeopleAsync());
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('Error updating person. Please try again later.');
    }
  };

  const handleSaveClick = async (person) => {
    try {
      await savePerson(person);
      dispatch(fetchSavedPeopleAsync());
      navigate('/saved');
    } catch (error) {
      console.error(error);
      alert('Error saving person. Please try again later.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader title={`${person.name.title} ${person.name.first} ${person.name.last}`} />
        <CardContent>
          <div>
            <img src={person.picture.large} alt="Profile" />
          </div>
          <div>
            <div>Gender: {person.gender}</div>
            <div>
              Name:
              {isEditing ? (
                <TextField value={person.name.first} onChange={(e) => setPerson({ ...person, name: { ...person.name, first: e.target.value } })} />
              ) : (
                <span>{person.name.first} {person.name.last}</span>
              )}
              <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? <Update /> : <Edit />}</Button>
            </div>
            <div>Age: {person.dob.age}</div>
            <div>
              <div>Street: {person.location.street.number} {person.location.street.name}</div>
              <div>City: {person.location.city}</div>
              <div>State: {person.location.state}</div>
            </div>
            <div>
              <div>Email: {person.email}</div>
              <div>Phone: {person.phone}</div>
            </div>
            <div>
              {person.id ? (
                <Button variant="contained" color="secondary" startIcon={<Delete />} onClick={() => handleDeleteClick(person.id)}>Delete</Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Save />} onClick={() => handleSaveClick(person)}>Save</Button>
              )}
              <Button variant="contained" startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Back</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;