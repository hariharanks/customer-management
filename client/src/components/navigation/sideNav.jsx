import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { useAuth } from '../context/authContext';

const SideNav = ({ collapsed, onNavClick }) => {
  const { Sider } = Layout;
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
  const navigate = useNavigate();
  const { clearToken } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
  const handleLogout = () => {
    clearToken();
    logout();
    navigate('/login');
  }

  const menuItems = [{
    key: '1',
    icon: <UserOutlined />,
    label: 'Customer',
    children: [
      {
        key: '2',
        label: 'Add Customer',
      }
    ],
    onClick: () => { onNavClick('add') }
  },{
    key: '3',
    icon: <UserOutlined />,
    label: 'Logout',
    onClick: () => { handleLogout() }
  }
]

  return (
    <Sider
      width={200}
      style={{
        background: colorBgContainer,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{
          height: '100%',
          borderRight: 0,
        }}
        items={menuItems}
      />
      
    </Sider>
  )
}
export default SideNav;