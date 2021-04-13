import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../core/Recommend/store/index';

export default combineReducers({
    recommend: recommendReducer
});