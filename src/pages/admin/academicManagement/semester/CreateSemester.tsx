import type {FormProps} from 'antd';
import {Button, Col, Flex, Form, Select} from 'antd';
import {months} from '../../../../constant/global';
import {
  semesterName,
  semesterNameCode,
  yearOptions,
} from '../../../../constant/semester';

import {toast} from 'sonner';
import type {TResponse} from '../../../../types';
import {useAddSemesterMutation} from '../../../../redux/api/semesterApi';

type FieldType = {
  name: string;
  year: string;
  startMonth: string;
  endMonth: string;
};

const CreateSemester = () => {
  const [addSemester, {isLoading}] = useAddSemesterMutation();
  const [form] = Form.useForm(); // to reset form

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const code = semesterNameCode[values.name];

    const semesterData = {
      name: values.name,
      code,
      year: values.year,
      startMonth: values.startMonth,
      endMonth: values.endMonth,
    };

    try {
      const res = (await addSemester(semesterData)) as TResponse;
      console.log(res);

      if (res?.data) {
        toast.success('Semester created successfully!');
        form.resetFields();
      }

      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Something went wrong!');
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
            label="Year"
            name="year"
            rules={[{required: true, message: 'Please input year!'}]}>
            <Select placeholder="Select semester name" size="large">
              {yearOptions.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Start Month"
            name="startMonth"
            rules={[{required: true, message: 'Select start month!'}]}>
            <Select placeholder="Select start month" size="large">
              {months.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="End Month"
            name="endMonth"
            rules={[{required: true, message: 'Select end month!'}]}>
            <Select placeholder="Select end month" size="large">
              {months.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
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

export default CreateSemester;
