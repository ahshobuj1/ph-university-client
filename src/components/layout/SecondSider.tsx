import {Menu} from 'antd';
import {studentPaths} from '../../routes/student.routes';
import {sidebarItemsGenerator} from '../../utils/sidebarItemsGenerator';
import {useAppSelector} from '../../redux/hooks';
import {adminPaths} from '../../routes/admin.routes';
import {facultyPaths} from '../../routes/faculty.routes';

const userRole = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
} as const;

const SecondSider = () => {
  const user = useAppSelector((state) => state.auth.user);
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

  return (
    <>
      <div className="flex items-center justify-center h-16 border-b-2 border-gray-400 border-dashed">
        <h1 className="text-xl font-bold text-indigo-700">PH University</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={sidebarItems}
          style={{background: '#d9d9d9'}}
        />
      </nav>

      <div className="border-t-2 border-dashed border-gray-400 px-6 py-4 text-xs text-gray-400">
        &copy; 2025 A H
      </div>
    </>
  );
};

export default SecondSider;
