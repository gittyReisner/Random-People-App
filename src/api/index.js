import axios from 'axios';



export const fetchPeople = async () => {
  const url = 'https://randomuser.me/api/?results=10';
  const response = await axios.get(url);
  console.log('response:', response);
  return response.data.results;
};

export const savePerson = async (person) => {
  const response = await axios.post('http://localhost:5000/profiles/', person);
  console.log('response:', response);
  return response.data;
};

export const deletePerson = async (id) => {
  const response = await axios.delete(`http://localhost:5000/profiles/${id}`);
  return response.data;
};

export const updatePerson = async (id, person) => {
  const response = await axios.put(`/profiles/profiles/${id}`, person);
  return response.data;
};

export const fetchSavedPeople = async () => {
  const response = await axios.get('http://localhost:5000/profiles');
  return response.data;
};