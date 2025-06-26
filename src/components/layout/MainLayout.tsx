import {Layout, Menu} from 'antd';
import {Outlet} from 'react-router-dom';
import {adminPaths} from '../../routes/admin.routes';
import {sidebarItemsGenerator} from '../../utils/sidebarItemsGenerator';
const {Header, Content, Footer, Sider} = Layout;

const userRole = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
} as const;

const MainLayout = () => {
  return (
    <Layout className="h-screen">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={sidebarItemsGenerator(adminPaths, userRole.ADMIN)}
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
