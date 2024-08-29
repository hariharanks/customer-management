import { Layout, Menu, theme } from 'antd';
import React from 'react';


const Nav = ({ setCollapsed, collapsed }) => {
  const { Header } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const loggedInUser = localStorage.getItem('loggedInUser');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
  const items1 = ['Home', 'Sales'].map((item, index) => ({
    index,
    label: item,
  }));
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        zIndex: '999'
      }}
    >
      <div className="demo-logo" >
        {/* LOGO */}
        <a href='/home'><img className='main-logo' src={require('../../assests/logo.jpg')} alt="" /></a>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['Home']}
        items={items1}
        style={{
          flex: 1,
          minWidth: 5,
        }}
      />
      {
        isLoggedIn &&
        <>
          <a style={{ color: '#fff', alignContent: 'center' }} href="/">Hi, {loggedInUser}</a>
        </>
      }
    </Header>

  )
};

export default Nav;