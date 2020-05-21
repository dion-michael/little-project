import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link, Route, useLocation } from 'react-router-dom';
import { logout } from '../../store/sessions/action';
import { Menu, Layout, Breadcrumb, Avatar, Button } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { LogoutOutlined, MoneyCollectFilled, AccountBookTwoTone } from '@ant-design/icons';
import './index.css';
import getRoutes from '../../configs/routes';
import { IState } from '../../configs/interfaces';
import { IUserData } from '../../store/sessions/reducer';

interface Props {
    logout: () => void;
    userData: IUserData;
}

const Main: React.FC<Props> = ({ logout, userData }) => {

    const { Header, Content, Footer, Sider } = Layout;
    const location = useLocation();
    const routes = getRoutes(userData);

    const [currentPage, setCurrentPage] = useState<string>('/pelayanan')

    const handleClick = (e: ClickParam) => {
        setCurrentPage(e.key)
    }

    useEffect(() => {
        setCurrentPage(location.pathname)
    }, [])

    return (
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
                width={250}
                theme={"light"}
            >
                <div style={{ height: 'calc(100vh - 162px)' }}>
                    <div className='logo'>
                        <img src="/logo.png" width={150} />
                    </div>
                    <Menu style={{ height: '100' }} theme='light' onClick={handleClick} selectedKeys={[currentPage]} mode='inline'>
                        {routes.map((route) =>
                            <Menu.Item icon={<route.icon />} key={route.path} hidden={route.hidden}>
                                <Link to={route.path}>{route.text}</Link>
                            </Menu.Item>
                        )}
                    </Menu>
                </div>
                <Layout>
                    <Footer style={{ backgroundColor: 'white', padding: '24px 16px 24px 24px' }}>
                        <div className="profile">
                            <Avatar style={{ backgroundColor: '#f56a00' }}>A</Avatar>
                            <div className="profile-text">
                                <span className="profile-name">
                                    {`${userData.displayName}`}
                                </span>
                                <span className="profile-title">
                                    {`${userData.position.title} ${userData.position.branch}`}
                                </span>
                            </div>
                        </div>
                        <Button icon={<LogoutOutlined />} type="default" block={true} onClick={logout}>Logout</Button>
                    </Footer>
                </Layout>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 250 }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-content">
                        {routes.map((route, i) =>
                            <Route key={i} path={route.path}>
                                {<route.component />}
                            </Route>
                        )}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>BPJSTK ©2020 Created by Dion Michael</Footer>
            </Layout>
        </Layout>
    )
}

const mapDispatch = {
    logout,
}

const mapState = (state: IState) => ({
    userData: state.session.userData,
})

export default connect(mapState, mapDispatch)(Main);
