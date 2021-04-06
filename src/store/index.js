import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // 使用开发者工具时间旅行器

const store = createStore(reducer, composeEnhancers (
    applyMiddleware(thunk) // 使用中间件redux-thunk
));

export default store;

