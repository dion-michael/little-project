import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import session from '../store/sessions/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
    session,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
