import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/login';
import PrivateRoutes from './components/utils/PrivateRoutes';
import { AuthProvider } from './components/context/authContext';
import { CustomerProvider } from './components/context/customerContext';
import RefreshHandler from './components/utils/RefreshHandler';
import ProductContainer from './components/product/container/productContainer';
import Nav from './components/navigation/nav';
import SideNav from './components/navigation/sideNav';
import { Layout, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const LayoutWrapper = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="site-layout-background" style={{ padding: '0 20px' }}>
        <Nav />
      </Header>
      <Layout>
        <Sider>
          <SideNav />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isLoggedIn') || false);
  console.log("isAuthenticated=====", isAuthenticated);
  return (
    <Router>
      <AuthProvider>
        <CustomerProvider>
          <Routes>
            <Route element={<PrivateRoutes isAuthenticated={isAuthenticated}/>}>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
              <Route
                path="/*"
                element={
                  <LayoutWrapper>
                    <RefreshHandler isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/product" element={<ProductContainer />} />
                      {/* Uncomment these routes as needed */}
                      {/* <Route path="/addCustomer" element={<UpdateCustomer />} /> */}
                      {/* <Route path="/update/:id" element={<UpdateCustomer />} /> */}
                    </Routes>
                  </LayoutWrapper>
                }
              />
            </Route>
          </Routes>
        </CustomerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
