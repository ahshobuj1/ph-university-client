import {Layout, Menu} from 'antd';
import {studentPaths} from '../../routes/student.routes';
import {sidebarItemsGenerator} from '../../utils/sidebarItemsGenerator';

const {Sider} = Layout;

const userRole = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
} as const;

const Sidebar = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="demo-logo-vertical" />

      <p className="text-white text-2xl font-bold italic text-center py-3.5">
        PH University
      </p>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={sidebarItemsGenerator(studentPaths, userRole.STUDENT)}
      />
    </Sider>
  );
};

export default Sidebar;
