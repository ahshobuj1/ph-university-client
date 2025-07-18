import type {FormProps} from 'antd';
import {Button, Col, Flex, Form, Input} from 'antd';

import {toast} from 'sonner';
import type {TResponse} from '../../../../types';
import {useAddAcademicFacultyMutation} from '../../../../redux/api/academicFacultyApi';

type FieldType = {
  name: string;
};

const CreateAcademicFaculty = () => {
  const [form] = Form.useForm();
  const [addAcademicFaculty, {isLoading}] = useAddAcademicFacultyMutation();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = (await addAcademicFaculty(values)) as TResponse;

      if (res?.data) {
        toast.success('Academic faculty is created successfully!');
        form.resetFields();
      }
      if (res?.error) {
        toast.error(res.error.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('something went wrong..!');
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <Form
          form={form}
          layout="vertical"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          initialValues={{remember: true}}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{required: true, message: 'Input academic faculty name!'}]}>
            <Input size="large" />
          </Form.Item>

          <Button
            htmlType="submit"
            color="default"
            variant="solid"
            size="large"
            loading={isLoading}>
            Submit
          </Button>
        </Form>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
