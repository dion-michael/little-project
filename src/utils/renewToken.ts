import gateway from '../api';

export default function renewToken(token?: any) {
    console.log(token);
    if (!token) {
        token = localStorage.getItem('token') || '';
    }
    localStorage.setItem('token', token);
    gateway.defaults.headers.common['token'] = token;
}
