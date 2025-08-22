import {useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {FaBars} from 'react-icons/fa';
import {Popover, Avatar, Button, Popconfirm} from 'antd';
import SecondSider from './SecondSider';
import {logout} from '../../redux/features/auth/authSlice';
import {useAppDispatch} from '../../redux/hooks';
import {UserOutlined, SettingOutlined, LogoutOutlined} from '@ant-design/icons';

export default function SecondLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dispatch = useAppDispatch();

  // const showLogoutConfirm = () => {
  //   Modal.confirm({
  //     title: 'Confirm Logout',
  //     content: 'Are you sure you want to logout?',
  //     okText: 'Yes',
  //     cancelText: 'No',
  //     okType: 'danger',
  //     onOk: () => dispatch(logout()),
  //   });
  // };

  const profileDropdown = (
    <div className="flex flex-col p-2 space-y-2 min-w-[150px]">
      <Link
        to="/"
        className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 transition-colors">
        <UserOutlined />
        <span>My Profile</span>
      </Link>

      <Link
        to="/"
        className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 transition-colors">
        <SettingOutlined />
        <span>Settings</span>
      </Link>

      <Popconfirm
        title="Are you sure you want to logout?"
        okText="Logout"
        cancelText="Cancel"
        onConfirm={() => dispatch(logout())}
        icon={<LogoutOutlined />}
        placement="bottomLeft">
        <Button
          danger
          size="small"
          className="flex items-center gap-2 justify-start px-3 py-1 w-full">
          <LogoutOutlined />
          Logout
        </Button>
      </Popconfirm>
    </div>
  );

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-20 md:hidden bg-black/20 transition-opacity duration-300 cursor-pointer ${
          drawerOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary-main shadow-lg transform transition-transform duration-300 md:translate-x-0 md:static md:shadow-none flex flex-col ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <SecondSider />

        {/* <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = item.to && location.pathname === item.to;
            const isOpen = openKeys.includes(item.key);

            if (item.children) {
              return (
                <div key={item.key}>
                  <button
                    onClick={() => toggleMenu(item.key)}
                    className="flex items-center w-full px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-100 focus:outline-none transition-all">
                    {item.icon} {item.label}
                    <FaChevronDown
                      className={`ml-auto transform transition-transform transition-all ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="ml-8 space-y-1">
                      {item.children.map((child) => {
                        const childActive = location.pathname === child.to;
                        return (
                          <Link
                            key={child.key}
                            to={child.to}
                            onClick={() => setDrawerOpen(false)}
                            className={`flex items-center px-3 py-1 rounded-md text-sm ${
                              childActive
                                ? 'bg-indigo-600  text-white'
                                : 'text-gray-700 hover:bg-indigo-100'
                            }`}>
                            {child.icon} {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                to={item.to!}
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-indigo-100'
                }`}>
                {item.icon} {item.label}
              </Link>
            );
          })}

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={sidebarItems}
          />
        </nav> */}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-primary-main px-4 md:px-6 h-16 ">
          <button
            className="md:hidden text-gray-600 cursor-pointer hover:text-indigo-600"
            onClick={() => setDrawerOpen(true)}>
            <FaBars size={22} />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Hello, A H Shobuj</h2>
            <p className="text-gray-900">Welcome To StackHub University</p>
          </div>

          {/* // Profile */}
          <Popover
            content={profileDropdown}
            placement="bottomRight"
            trigger="click"
            overlayClassName="rounded-lg shadow-lg">
            <Avatar
              size={45}
              shape="square"
              src="https://i.pravatar.cc/48"
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
            />
          </Popover>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// import {useState, useEffect, useRef} from 'react';
// import {
//   FaHome,
//   FaUserCircle,
//   FaCog,
//   FaSignOutAlt,
//   FaBars,
// } from 'react-icons/fa';

// const sidebarItems = [
//   {label: 'Home', icon: <FaHome size={24} />, href: '#'},
//   {label: 'Profile', icon: <FaUserCircle size={24} />, href: '#'},
//   {label: 'Settings', icon: <FaCog size={24} />, href: '#'},
//   {label: 'Logout', icon: <FaSignOutAlt size={24} />, href: '#'},
// ];

// export default function DashboardLayout() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const drawerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         drawerRef.current &&
//         !drawerRef.current.contains(event.target as Node) &&
//         drawerOpen
//       ) {
//         setDrawerOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [drawerOpen]);

//   useEffect(() => {
//     function handleEsc(event: KeyboardEvent) {
//       if (event.key === 'Escape' && drawerOpen) {
//         setDrawerOpen(false);
//       }
//     }
//     document.addEventListener('keydown', handleEsc);
//     return () => document.removeEventListener('keydown', handleEsc);
//   }, [drawerOpen]);

//   return (
//     <div className="flex h-screen bg-gray-50 font-sans">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden transition-opacity duration-300 ${
//           drawerOpen
//             ? 'opacity-100 pointer-events-auto'
//             : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={() => setDrawerOpen(false)}
//         aria-hidden="true"
//       />
//       <aside
//         ref={drawerRef}
//         className={`
//           fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform
//           transition-transform duration-300 ease-in-out
//           ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
//           md:translate-x-0 md:static md:shadow-none
//           flex flex-col
//         `}
//         aria-label="Sidebar Navigation">
//         <div className="flex items-center justify-center h-16 border-b px-6">
//           <h1 className="text-2xl font-bold text-indigo-700">MyDashboard</h1>
//         </div>
//         <nav className="flex-1 overflow-y-auto py-6 px-2 space-y-1">
//           {sidebarItems.map(({label, icon, href}, idx) => (
//             <a
//               key={label}
//               href={href}
//               onClick={() => {
//                 setActiveIndex(idx);
//                 setDrawerOpen(false);
//               }}
//               className={`flex items-center px-4 py-3 rounded-md cursor-pointer
//                 ${
//                   idx === activeIndex
//                     ? 'bg-indigo-600 text-white'
//                     : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
//                 }
//               `}>
//               <span className="mr-3">{icon}</span>
//               <span className="text-md font-medium">{label}</span>
//             </a>
//           ))}
//         </nav>

//         <div className="border-t px-6 py-4 text-sm text-gray-500">
//           &copy; 2025 Your Company
//         </div>
//       </aside>

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="flex items-center justify-between bg-white shadow-md px-6 h-16">
//           <button
//             className="md:hidden text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
//             onClick={() => setDrawerOpen(true)}
//             aria-label="Open sidebar">
//             <FaBars size={24} />
//           </button>
//           <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
//           <div className="relative">
//             <button
//               className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
//               aria-haspopup="true">
//               <img
//                 src="https://i.pravatar.cc/40"
//                 alt="User Avatar"
//                 className="w-10 h-10 rounded-full"
//               />
//               <span className="hidden sm:block font-medium text-gray-700">
//                 John Doe
//               </span>
//             </button>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 p-6 overflow-auto bg-gray-50">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-lg font-semibold mb-4">User Stats</h3>
//               <p className="text-gray-600">
//                 Active users this month:{' '}
//                 <span className="font-bold">1,234</span>
//               </p>
//               <p className="text-gray-600">
//                 New signups: <span className="font-bold">123</span>
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-lg font-semibold mb-4">Revenue</h3>
//               <p className="text-gray-600">
//                 Monthly revenue: <span className="font-bold">$12,345</span>
//               </p>
//               <p className="text-gray-600">
//                 Growth: <span className="text-green-600 font-bold">+12%</span>
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-lg font-semibold mb-4">Tasks</h3>
//               <p className="text-gray-600">
//                 Pending tasks: <span className="font-bold">8</span>
//               </p>
//               <p className="text-gray-600">
//                 Completed tasks: <span className="font-bold">15</span>
//               </p>
//             </div>
//           </div>

//           <section className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
//             <ul className="divide-y divide-gray-200">
//               <li className="py-3 flex justify-between items-center">
//                 <span className="text-gray-700">User Jane registered.</span>
//                 <time className="text-xs text-gray-400">2 hours ago</time>
//               </li>
//               <li className="py-3 flex justify-between items-center">
//                 <span className="text-gray-700">Server restarted.</span>
//                 <time className="text-xs text-gray-400">5 hours ago</time>
//               </li>
//               <li className="py-3 flex justify-between items-center">
//                 <span className="text-gray-700">New comment posted.</span>
//                 <time className="text-xs text-gray-400">1 day ago</time>
//               </li>
//             </ul>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

// import {useState, useRef, useEffect} from 'react';
// import {
//   FaHome,
//   FaUserCircle,
//   FaCog,
//   FaSignOutAlt,
//   FaBars,
// } from 'react-icons/fa';

// const sidebarItems = [
//   {label: 'Home', icon: <FaHome size={24} />, href: '#'},
//   {label: 'Profile', icon: <FaUserCircle size={24} />, href: '#'},
//   {label: 'Settings', icon: <FaCog size={24} />, href: '#'},
//   {label: 'Logout', icon: <FaSignOutAlt size={24} />, href: '#'},
// ];

// export default function DashboardLayout() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const drawerRef = useRef<HTMLDivElement>(null);
//   const profileRef = useRef<HTMLDivElement>(null);

//   // Close drawer on outside click (mobile)
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         drawerRef.current &&
//         !drawerRef.current.contains(event.target as Node) &&
//         drawerOpen
//       ) {
//         setDrawerOpen(false);
//       }
//       if (
//         profileRef.current &&
//         !profileRef.current.contains(event.target as Node) &&
//         profileOpen
//       ) {
//         setProfileOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [drawerOpen, profileOpen]);

//   // Close drawer and profile on Escape key
//   useEffect(() => {
//     function handleEsc(event: KeyboardEvent) {
//       if (event.key === 'Escape') {
//         if (drawerOpen) setDrawerOpen(false);
//         if (profileOpen) setProfileOpen(false);
//       }
//     }
//     document.addEventListener('keydown', handleEsc);
//     return () => document.removeEventListener('keydown', handleEsc);
//   }, [drawerOpen, profileOpen]);

//   return (
//     <div className="flex h-screen bg-gray-50 font-sans">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden transition-opacity duration-300 ${
//           drawerOpen
//             ? 'opacity-100 pointer-events-auto'
//             : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={() => setDrawerOpen(false)}
//         aria-hidden="true"
//       />
//       <aside
//         ref={drawerRef}
//         className={`
//           fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform
//           transition-transform duration-300 ease-in-out
//           ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
//           md:translate-x-0 md:static md:shadow-none
//           flex flex-col
//         `}
//         aria-label="Sidebar Navigation">
//         <div className="flex items-center justify-center h-16 border-b px-6">
//           <h1 className="text-2xl font-bold text-indigo-700">MyDashboard</h1>
//         </div>
//         <nav className="flex-1 overflow-y-auto py-6 px-2 space-y-1">
//           {sidebarItems.map(({label, icon, href}, idx) => (
//             <a
//               key={label}
//               href={href}
//               onClick={() => {
//                 setActiveIndex(idx);
//                 setDrawerOpen(false);
//               }}
//               className={`flex items-center px-4 py-3 rounded-md cursor-pointer
//                 ${
//                   idx === activeIndex
//                     ? 'bg-indigo-600 text-white'
//                     : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
//                 }
//               `}>
//               <span className="mr-3">{icon}</span>
//               <span className="text-md font-medium">{label}</span>
//             </a>
//           ))}
//         </nav>

//         <div className="border-t px-6 py-4 text-sm text-gray-500">
//           &copy; 2025 Your Company
//         </div>
//       </aside>

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="flex items-center justify-between bg-white shadow-md px-6 h-16">
//           <button
//             className="md:hidden text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
//             onClick={() => setDrawerOpen(true)}
//             aria-label="Open sidebar">
//             <FaBars size={24} />
//           </button>
//           <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>

//           {/* Profile dropdown */}
//           <div className="relative" ref={profileRef}>
//             <button
//               onClick={() => setProfileOpen(!profileOpen)}
//               className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
//               aria-haspopup="true"
//               aria-expanded={profileOpen}
//               aria-controls="profile-menu"
//               type="button">
//               <img
//                 src="https://i.pravatar.cc/40"
//                 alt="User Avatar"
//                 className="w-10 h-10 rounded-full"
//               />
//               <span className="hidden sm:block font-medium text-gray-700">
//                 John Doe
//               </span>
//               <svg
//                 className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
//                   profileOpen ? 'rotate-180' : ''
//                 }`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {profileOpen && (
//               <div
//                 id="profile-menu"
//                 role="menu"
//                 aria-orientation="vertical"
//                 aria-labelledby="profile-menu-button"
//                 className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
//                 <a
//                   href="#"
//                   role="menuitem"
//                   tabIndex={0}
//                   className="block px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
//                   onClick={() => setProfileOpen(false)}>
//                   Profile
//                 </a>
//                 <a
//                   href="#"
//                   role="menuitem"
//                   tabIndex={0}
//                   className="block px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
//                   onClick={() => setProfileOpen(false)}>
//                   Settings
//                 </a>
//                 <a
//                   href="#"
//                   role="menuitem"
//                   tabIndex={0}
//                   className="block px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white"
//                   onClick={() => setProfileOpen(false)}>
//                   Logout
//                 </a>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 p-6 overflow-auto bg-gray-50">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-lg font-semibold mb-4">User Stats</h3>
//               <p className="text-gray-600">
//                 Active users this month:{' '}
//                 <span className="font-bold">1,234</span>
//               </p>
//               <p className="text-gray-600">
//                 New signups: <span className="font-bold">123</span>
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-lg font-semibold mb-4">Revenue</h3>
//               <p className="text-gray-600">
//                 Monthly revenue: <span className="font-bold">$12,345</span>
//               </p>
//               <p className="text-gray-600">
//                 Growth: <span className="text-green-600 font-bold">+12%</span>
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-lg font-semibold mb-4">Tasks</h3>
//               <p className="text-gray-600">
//                 Pending tasks: <span className="font-bold">8</span>
//               </p>
//               <p className="text-gray-600">
//                 Completed tasks: <span className="font-bold">15</span>
//               </p>
//             </div>
//           </div>

//           <section className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
//             <ul className="divide-y divide-gray-200">
//               <li className="py-3 flex justify-between items-center">
//                 <span className="text-gray-700">User Jane registered.</span>
//                 <time className="text-xs text-gray-400">2 hours ago</time>
//               </li>
//               <li className="py-3 flex justify-between items-center">
//                 <span className="text-gray-700">Server restarted.</span>
//                 <time className="text-xs text-gray-400">5 hours ago</time>
//               </li>
//               <li className="py-3 flex justify-between items-center">
//                 <span className="text-gray-700">New comment posted.</span>
//                 <time className="text-xs text-gray-400">1 day ago</time>
//               </li>
//             </ul>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }
