import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Flex, Form, Input, Select} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'sonner';
import {useLoginMutation} from '../../redux/features/auth/authApi';
import {useAppDispatch} from '../../redux/hooks';
import {verifyToken} from '../../utils/verifyToken';
import {setUser, type TUser} from '../../redux/features/auth/authSlice';
import type {TError} from '../../types';
import loginImage from '../../assets/images/login.png';
import {FaUniversity} from 'react-icons/fa';

type TLogin = {id: string; password: string};

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // !TODO- only for dev and test purpose
  const roleCredentials: Record<string, {id: string; password: string}> = {
    admin: {id: 'A-0001', password: 'admin123'},
    superAdmin: {id: 'SA-0001', password: 'admin123'},
    faculty: {id: 'F-0001', password: 'faculty123'},
    student: {id: 'S-202502001', password: 'student123'},
  };

  // !TODO- only for dev and test purpose
  const handleRoleChange = (role: string) => {
    const selectedRole = roleCredentials[role];
    if (selectedRole) form.setFieldsValue(selectedRole);
    else form.resetFields();
  };

  const onFinish = async (data: TLogin) => {
    const toastId = toast.loading('Logging in...');
    try {
      const result = await login(data).unwrap();
      const user = verifyToken(result.data.accessToken) as TUser;

      dispatch(setUser({user, token: result.data.accessToken}));
      toast.success('Login successful', {id: toastId});

      if (result.data.needsPasswordChange) {
        navigate(`/${user.role}/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error: unknown) {
      const err = error as TError;
      toast.error('Login failed', {
        id: toastId,
        description: err?.data?.message || 'Something went wrong!',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
        <div className="flex items-center gap-4 mb-6 justify-center">
          {/* Logo */}
          <div className="p-3 bg-blue-100 rounded-2xl shadow-sm">
            <FaUniversity className="w-10 h-10 text-blue-600" />
          </div>

          {/* Text */}
          <div className="text-left">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Meridian
            </h2>
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              University
            </p>
          </div>
        </div>

        {/* Welcome Title */}
        {/* <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1> */}

        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src={loginImage}
            alt="Login illustration"
            className="w-44 h-44 object-contain drop-shadow-lg"
          />
        </div>

        {/* Login Form */}
        <Form
          form={form} // !TODO- only for dev and test purpose
          name="login"
          initialValues={{remember: true}}
          onFinish={onFinish}
          layout="vertical">
          {/*// !TODO- only for dev and test purpose */}
          <Form.Item>
            <Select
              placeholder="Select a role"
              onChange={handleRoleChange}
              options={[
                {label: 'Super Admin', value: 'superAdmin', disabled: true},
                {label: 'Admin', value: 'admin'},
                {label: 'Faculty', value: 'faculty', disabled: true},
                {label: 'Student', value: 'student', disabled: true},
              ]}
              className="mb-4"
            />
          </Form.Item>

          <Form.Item
            name="id"
            rules={[{required: true, message: 'Please enter User ID'}]}>
            <Input
              prefix={<UserOutlined />}
              placeholder="User ID"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{required: true, message: 'Please enter Password'}]}>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="rounded-lg"
            />
          </Form.Item>

          <Flex className="flex justify-between items-center mb-4">
            <Form.Item noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="/login" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </Link>
          </Flex>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-3">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
