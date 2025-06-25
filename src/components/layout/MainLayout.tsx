import {Layout, Menu} from 'antd';
import {Outlet} from 'react-router-dom';
import {adminSidebarItems} from '../../routes/admin.routes';
const {Header, Content, Footer, Sider} = Layout;

const MainLayout = () => {
  return (
    <Layout className="h-screen">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={adminSidebarItems}
        />
      </Sider>
      <Layout>
        <Header style={{padding: 0}} />
        <Content style={{margin: '24px 16px 0'}}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          AH ©{new Date().getFullYear()} Created by AH
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
