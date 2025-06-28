import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Flex} from 'antd';
import {useLoginMutation} from '../redux/features/auth/authApi';
import {useAppDispatch} from '../redux/hooks';
import {setUser, type TUser} from '../redux/features/auth/authSlice';
import {verifyToken} from '../utils/verifyToken';
import {useNavigate} from 'react-router-dom';
import {toast} from 'sonner';

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // console.log('Received from useLoginMutation : ', data, 'Error => ', error);

  const onFinish = async (data: any) => {
    const toastId = toast.loading('waiting for login...', {
      position: 'top-center',
    });

    const userInfo = {
      id: data.id,
      password: data.password,
    };

    try {
      const result = await login(userInfo).unwrap();
      const user = verifyToken(result.data.accessToken) as TUser;
      dispatch(setUser({user, token: result.data.accessToken}));

      toast.success('login successfully', {
        position: 'top-center',
        id: toastId,
      });
      navigate(`/${user.role}/dashboard`);
    } catch (err: any) {
      toast.error('Failed to login!', {
        position: 'top-center',
        id: toastId,
        description: `${err?.data?.message}`,
      });

      console.log(err);
    }

    // toast.error('Failed to login!');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form
        name="login"
        initialValues={{remember: true}}
        style={{maxWidth: 360}}
        onFinish={onFinish}>
        <Form.Item
          name="id"
          rules={[{required: true, message: 'Please input your User Id!'}]}>
          <Input prefix={<UserOutlined />} placeholder="User Id" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{required: true, message: 'Please input your Password!'}]}>
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="">Register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
