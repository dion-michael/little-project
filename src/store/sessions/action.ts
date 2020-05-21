import { ISessionAction } from './reducer';
import api from '../../api';
import renewToken from '../../utils/renewToken';

type ILoginFn = (param: loginParam) => ISessionAction;

interface loginParam {
    username: string;
    password: string;
}

export const login = ({ username, password }: loginParam) => {
    return (dispatch: any) => {
        dispatch(setLoading(true));
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api({
                    url: '/users/login',
                    data: {
                        username,
                        password,
                    },
                    method: 'POST',
                });
                renewToken(data.token);
                dispatch(setLoading(false));
                resolve();
            } catch ({ response }) {
                dispatch(setLoading(false));
                reject(response.data);
            }
        });
    };
};

export const getProfile = () => {
    renewToken(localStorage.getItem('token'));
    return (dispatch: any) => {
        dispatch(setLoading(true));
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await api({
                    url: '/users/profile',
                });
                dispatch({
                    type: 'SET_PROFILE',
                    data,
                });
                dispatch(setLoading(false));
                resolve(data.displayName);
            } catch (error) {
                console.log(error);
                const { response } = error;
                renewToken();
                dispatch(setLoading(false));
                reject(response.data);
            }
        });
    };
};

export const logout = () => {
    localStorage.clear();
    return {
        type: 'RESET',
    };
};

export const setLoading = (data: boolean) => {
    return {
        type: 'SET_LOADING',
        data,
    };
};
