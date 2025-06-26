import type {TUserPath} from '../types';
import type {ReactNode} from 'react';

type TRoutes = {
  path?: string;
  element: ReactNode;
  // index?: boolean;
};

const routesGenerator = (paths: TUserPath[]) => {
  const routes = paths.reduce((acc: TRoutes[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }

    // if (item.index) {
    //   acc.push({
    //     index: true,
    //     element: item.element,
    //   });
    // }

    return acc;
  }, []);

  return routes;
};

export default routesGenerator;
