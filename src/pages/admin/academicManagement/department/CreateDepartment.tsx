import type {FormProps} from 'antd';
import {Button, Col, Flex, Form, Input, Select} from 'antd';
import type {TAcademicFaculty, TResponse} from '../../../../types';
import {toast} from 'sonner';
import {useAddDepartmentMutation} from '../../../../redux/api/departmentApi';
import {useGetAllAcademicFacultyQuery} from '../../../../redux/api/academicFacultyApi';

type FieldType = {
  name: string;
  academicFaculty: string;
};

const CreateDepartment = () => {
  const [form] = Form.useForm();
  const [addDepartment] = useAddDepartmentMutation();
  const {data: academicFaculty, isLoading: isAcademicFacultyLoading} =
    useGetAllAcademicFacultyQuery(undefined);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = (await addDepartment(values)) as TResponse;

      if (res.data) {
        toast.success('Department is created successfully!');
        form.resetFields();
      }
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('something went wrong');
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
            label="Department Name"
            name="name"
            rules={[{required: true, message: 'Input department name!'}]}>
            <Input placeholder="Input department name" size="large" />
          </Form.Item>

          <Form.Item
            label="Select Academic Faculty"
            name="academicFaculty"
            rules={[
              {required: true, message: 'Please select academic faculty!'},
            ]}>
            <Select
              placeholder="Select academic faculty"
              size="large"
              disabled={isAcademicFacultyLoading}>
              {academicFaculty?.data?.map((item: TAcademicFaculty) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Button
            htmlType="submit"
            color="default"
            variant="solid"
            size="large"
            // loading={isLoading}
          >
            Submit
          </Button>
        </Form>
      </Col>
    </Flex>
  );
};

export default CreateDepartment;
