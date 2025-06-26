/* eslint-disable @typescript-eslint/no-explicit-any */

import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Flex} from 'antd';

const Login = () => {
  const onFinish = (data: any) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };

    console.log('Received values of form: ', userInfo);
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
