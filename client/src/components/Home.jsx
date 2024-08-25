import { Layout, theme } from 'antd';
import React from 'react';


const { Content } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <div className="">
        </div>
      </Layout>
    </>
  );
};

export default Home;
