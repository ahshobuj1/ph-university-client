const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
  },
  {
    name: 'User',
    children: [
      {
        name: 'Create-Student',
        path: 'create-student',
      },
      {
        name: 'Create-Faculty',
        path: 'create-faculty',
      },
    ],
  },
];

export const adminSidebarItems = adminPaths.reduce((acc, items) => {
  // console.log(acc, items);

  if (items.name && items.path) {
    acc.push({
      key: items.name,
      label: items.name,
    });
  }

  if (items.children) {
    acc.push({
      key: items.name,
      label: items.name,
      children: items.children.map((child) => ({
        key: child.name,
        label: child.name,
      })),
    });
  }

  return acc;
}, []);

console.log(adminSidebarItems);
