import React from 'react';
import {
    Switch,
    Route,
    Router,
} from 'react-router-dom';
import Login from './containers/login';
import { createBrowserHistory } from 'history';
import Main from './containers/main';
import { Provider } from 'react-redux';
import store from './store';
import Protected from './components/protected'
import 'antd/dist/antd.css';

const history = createBrowserHistory();

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route path='/login' exact={true}>
                        <Login />
                    </Route>
                    <Protected path='/'>
                        <Main />
                    </Protected>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
