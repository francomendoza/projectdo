import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

export default function configStore(initialState){
  return createStore(
    rootReducer,
    initialState
  );
}
