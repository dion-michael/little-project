import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { IState } from '../configs/interfaces';
import { connect } from 'react-redux';

interface IProtectedProps extends RouteProps {
    isLogin: boolean;
    loading: boolean;
}

const Protected: React.FC<IProtectedProps> = ({ children, isLogin, loading, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                ({ location }) =>
                    isLogin
                        ? children
                        : <Redirect to={{ pathname: '/login', state: { from: location } }} />
            }
        />
    )
}

const mapState = (state: IState) => ({
    isLogin: state.session.isLogin,
    loading: state.session.loading,
});

export default connect(mapState)(Protected);
