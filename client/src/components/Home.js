import { Layout, theme } from 'antd';
import React, { useState } from 'react';
import CustomerList from './CustomerList';
import UpdateCustomer from './UpdateCustomer';
import Nav from './navigation/nav';
import SideNav from './navigation/sideNav';
import { useCustomers } from '../components/context/customerContext';
const { Header, Sider, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState('');
  const [view, setView] = useState('list');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { customerId, handleCustomer } = useCustomers();
  const handleNavClick = (newView) => {
    setView(newView); 
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Nav collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
      <SideNav collapsed={collapsed} onNavClick={handleNavClick}/>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className=''>
          {(view=='list') && <CustomerList handleCustomer={handleCustomer} query={query} onNavClick={handleNavClick}/>}
          {(view=='add') && <UpdateCustomer customerId={''} query={query} onNavClick={handleNavClick}/>}
          {(view=='view') && <UpdateCustomer customerId={customerId} query={query} onNavClick={handleNavClick}/>}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;

// import { useState } from "react";
// import CustomerList from "./CustomerList";
// import Header from "./utils/Header";

// const Home = () => {
//   const [query, setQuery] = useState('');
//   return (
//     <>
//     <Header query={query} setQuery={setQuery} />
//       <div className='main'>
//         <CustomerList query={query}/>
//       </div>
//     </>
//   )
// }
// export default Home;