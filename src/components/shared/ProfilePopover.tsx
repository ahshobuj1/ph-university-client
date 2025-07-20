import {Avatar, Button, Popconfirm, Popover} from 'antd';
import {useAppDispatch} from '../../redux/hooks';
import {logout} from '../../redux/features/auth/authSlice';
import {QuestionCircleOutlined} from '@ant-design/icons';

const ProfilePopover = () => {
  const dispatch = useAppDispatch();

  const profileDropdown = (
    <div>
      <p>Edit Profile</p>
      <p>Setting</p>

      <Popconfirm
        title="Delete The Semester Registration"
        description="Are you sure to delete this semester registration?"
        onConfirm={() => dispatch(logout())}
        okText="Delete"
        cancelText="Cancel"
        // okButtonProps={{loading: deleteLoading}}
        icon={<QuestionCircleOutlined style={{color: 'red'}} />}
        placement="topLeft">
        <Button>Logout</Button>
      </Popconfirm>
    </div>
  );

  return (
    <div>
      <Popover content={profileDropdown} placement="topRight" title="Profile">
        {/* <Button type="primary">Hover me</Button> */}
        <Avatar
          // size="large"
          size={50}
          shape="square"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />

        {/* <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> */}
      </Popover>
    </div>
  );
};

export default ProfilePopover;

// const menu = (
//   <Menu style={{width: '170px'}}>
//     <Menu.Item
//       disabled={true}
//       // icon={<UserOutlined />}
//       // onClick={() => navigate('/profile')}
//     >
//       My Account
//     </Menu.Item>

//     <Menu.Item
//       key="dashboard"
//       // icon={<UserOutlined />}
//       // onClick={() => navigate('/profile')}
//     >
//       Dashboard
//     </Menu.Item>
//     <Menu.Item
//       key="profile"
//       // icon={<UserOutlined />}
//       // onClick={() => navigate('/profile')}
//     >
//       Edit Profile
//     </Menu.Item>
//     <Menu.Item
//       key="settings"
//       // icon={<SettingOutlined />}
//       // onClick={() => navigate('/settings')}
//     >
//       Settings
//     </Menu.Item>
//     <Menu.Divider />
//     <Menu.Item
//       key="logout"
//       // icon={<LogoutOutlined />}

//       onClick={handleLogout}>
//       Logout
//     </Menu.Item>
//   </Menu>
// );

{
  /* <Dropdown overlay={menu}>
                <Avatar
                  size={40}
                  style={{cursor: 'pointer'}}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </Dropdown> */
}

// const handleLogout = () => {
//   Modal.confirm({
//     title: 'Are you sure you want to logout?',
//     content: 'You will need to login again to access your account.',
//     okText: 'Logout',
//     okType: 'danger',
//     cancelText: 'Cancel',
//     onOk() {
//       // actually logout
//       // dispatch(logout()) or your logout logic
//       toast.success('Logged out successfully!');
//       // navigate('/login'); // redirect to login page
//     },
//   });
// };
