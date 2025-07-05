import type {FormProps} from 'antd';
import {Button, Col, Flex, Form, Select} from 'antd';
import {semesterName, yearOptions} from '../../../../constant/semester';

type FieldType = {
  name: string;
  semester: string;
};

const CreateDepartment = () => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(values);
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
            rules={[{required: true, message: 'Please select semester name!'}]}>
            <Select placeholder="Select semester name" size="large">
              {semesterName.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Academic Faculty"
            name="academicFaculty"
            rules={[
              {required: true, message: 'Please select academic faculty!'},
            ]}>
            <Select placeholder="Select academic faculty" size="large">
              {yearOptions.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.value}
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
