import type {ReactNode} from 'react';
import type {TUserPath} from '../types';
import {NavLink} from 'react-router-dom';

type TSidebarItem = {
  key: string;
  label?: string | ReactNode;
  children?: TSidebarItem[];
};

export const sidebarItemsGenerator = (paths: TUserPath[], role: string) => {
  return paths.reduce((acc: TSidebarItem[], item) => {
    // console.log(acc, item);

    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: (
          <NavLink
            to={`/${role}/${item.path}`}
            className="flex items-center font-semibold text-md">
            {item.icon && <span className="pr-2 text-xl">{item.icon}</span>}
            {item.name}
          </NavLink>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: (
          <span className="flex items-center font-semibold text-md">
            {item.icon && <span className="pr-2 text-xl">{item.icon}</span>}
            {item.name}
          </span>
        ),
        children: item.children.map((child) => ({
          key: child.name,
          label: (
            <NavLink
              to={`/${role}/${child.path}`}
              className="flex items-center font-semibold text-md">
              {item.icon && <span className="pr-2 text-xl">{child.icon}</span>}
              {child.name}
            </NavLink>
          ),
        })),
      });
    }

    return acc;
  }, []);
};

// import type {ReactNode} from 'react';
// import type {TUserPath} from '../types';
// import {NavLink} from 'react-router-dom';

// type TSidebarItem = {
//   key: string;
//   label?: string | ReactNode;
//   children?: TSidebarItem[];
// };

// export const sidebarItemsGenerator = (paths: TUserPath[], role: string) => {
//   return paths.reduce((acc: TSidebarItem[], item) => {
//     // console.log(acc, item);

//     if (item.name && item.path) {
//       acc.push({
//         key: item.name,
//         label: (
//           <NavLink to={`/${role}/${item.path}`}>
//             {item.icon && <span className="pr-1 text-center">{item.icon}</span>}{' '}
//             {item.name}
//           </NavLink>
//         ),
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: (
//           <span>
//             {item.icon && <span className="pr-1 text-center">{item.icon}</span>}{' '}
//             {item.name}
//           </span>
//         ),
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: (
//             <NavLink to={`/${role}/${child.path}`}>
//               {child.icon && (
//                 <span className="pr-1 text-center">{child.icon}</span>
//               )}{' '}
//               {child.name}
//             </NavLink>
//           ),
//         })),
//       });
//     }

//     return acc;
//   }, []);
// };
