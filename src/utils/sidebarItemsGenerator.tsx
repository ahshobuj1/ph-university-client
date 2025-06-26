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
        label: <NavLink to={`/${role}/${item.path}`}> {item.name} </NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);
};
