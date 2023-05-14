import { combineReducers } from 'redux';
import peopleSlice from './people';

const rootReducer = combineReducers({
  people: peopleSlice,
});

export default rootReducer;


