import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import React from 'react';
import { Button, Layout, Menu, Row, Col, theme } from 'antd';


const Nav = ({ setCollapsed, collapsed }) => {
  const { Header } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const loggedInUser = localStorage.getItem('loggedInUser');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
  const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="demo-logo" > LOGO </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
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