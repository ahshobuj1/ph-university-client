import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateStudent from '../pages/admin/CreateStudent';
import CreateFaculty from '../pages/admin/CreateFaculty';
import type {TUserPath} from '../types';

export const adminPaths: TUserPath[] = [
  // {
  //   index: true,
  //   element: <AdminDashboard />,
  // },
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'User',
    children: [
      {
        name: 'Create-Student',
        path: 'create-student',
        element: <CreateStudent />,
      },
      {
        name: 'Create-Faculty',
        path: 'create-faculty',
        element: <CreateFaculty />,
      },
    ],
  },
];

// * hard coded Admin sidebar
// export const adminSidebarItems = adminPaths.reduce(
//   (acc: TSidebarItem[], item) => {
//     // console.log(acc, item);

//     if (item.name && item.path) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}> {item.name} </NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }

//     return acc;
//   },
//   []
// );

// * hard coded AdminRoutes
// export const adminRoutes = adminPaths.reduce((acc: TRoutes[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }

//   return acc;
// }, []);
