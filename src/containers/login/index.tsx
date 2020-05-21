import React, { CSSProperties, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { login, getProfile } from '../../store/sessions/action';
import { connect } from 'react-redux';
import { Button, Input, Form, Checkbox, message } from 'antd';
import { GoogleCircleFilled } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { IState } from '../../configs/interfaces';
import renewToken from '../../utils/renewToken';

interface Props {
    login: (param: { username: string, password: string }) => any;
    getProfile: () => any;
    isLogin: boolean;
    loading: boolean;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login: React.FC<Props> = ({ login, isLogin, loading, getProfile }) => {

    const location = useLocation();
    const history = useHistory();

    //@ts-ignore
    const { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            renewToken(localStorage.getItem('token'))
            getProfile();
        }
    }, [])

    useEffect(() => {
        if (isLogin) {
            history.replace(from)
        }
    }, [isLogin])

    const style: { [key: string]: CSSProperties } = {
        center: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
        }
    }

    const onFinish = async (values: Store) => {
        const { username, password } = values;
        const key = 'loadingMsg';
        message.loading({ content: 'signing in', key })
        try {
            await login({ username, password })
            const profile = await getProfile();
            message.success({ content: `hello, ${profile}`, key })
        } catch (error) {
            message.error({ content: error.message, key })
        }
    };

    return (
        <div style={style.center}>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const mapDispatch = {
    login,
    getProfile,
}

const mapState = (state: IState) => ({
    isLogin: state.session.isLogin,
    loading: state.session.loading,
})

export default connect(mapState, mapDispatch)(Login);
