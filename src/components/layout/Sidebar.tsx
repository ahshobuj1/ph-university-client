import {Layout, Menu} from 'antd';
import {studentPaths} from '../../routes/student.routes';
import {sidebarItemsGenerator} from '../../utils/sidebarItemsGenerator';
import {useAppSelector} from '../../redux/hooks';
import {adminPaths} from '../../routes/admin.routes';
import {facultyPaths} from '../../routes/faculty.routes';

const {Sider} = Layout;

const userRole = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
} as const;

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth.user);
  // console.log('currentUser', user);

  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, user.role);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, user.role);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, user.role);
      break;
  }

  // if (user?.role === userRole.ADMIN) {
  //   sidebarItems = sidebarItemsGenerator(adminPaths, user.role);
  // } else if (user?.role === userRole.FACULTY) {
  //   sidebarItems = sidebarItemsGenerator(facultyPaths, user.role);
  // } else if (user?.role === userRole.STUDENT) {
  //   sidebarItems = sidebarItemsGenerator(studentPaths, user.role);
  // }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{height: '100vh', position: 'sticky', top: '0', left: '0'}}>
      <div className="demo-logo-vertical" />

      <p className="text-white text-2xl font-bold italic text-center py-3.5">
        PH University
      </p>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
