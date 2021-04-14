import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../core/Recommend/store/index';
import { reducer as singersReducer } from '../core/Singers/store/index';

export default combineReducers({
    recommend: recommendReducer,
    singers: singersReducer
});