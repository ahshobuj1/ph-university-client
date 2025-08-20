import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  Card,
  Breadcrumb,
  Typography,
  type FormProps,
  type UploadFile,
} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {BloodGroup, Gender} from '../../../../constant/global';
import type {
  TDepartment,
  TResponse,
  TSemester,
  TStudentRoot,
} from '../../../../types';
import {useState} from 'react';
import {toast} from 'sonner';

import {useGetAllDepartmentQuery} from '../../../../redux/api/departmentApi';
import {useGetAllSemesterQuery} from '../../../../redux/api/semesterApi';
import {useAddStudentMutation} from '../../../../redux/api/userApi';

const {Title, Text} = Typography;

const CreateStudent = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addStudent, {isLoading}] = useAddStudentMutation();
  const {data: departmentData} = useGetAllDepartmentQuery(undefined);
  const {data: semesterData} = useGetAllSemesterQuery([
    {name: 'sort', value: 'year'},
  ]);

  const onFinish: FormProps<TStudentRoot>['onFinish'] = async (values) => {
    const {password, ...student} = values;

    const studentData = {password, student};
    const formData = new FormData();
    formData.append('data', JSON.stringify(studentData));
    if (fileList[0]?.originFileObj)
      formData.append('file', fileList[0].originFileObj);

    try {
      const res = (await addStudent(formData)) as TResponse;
      if (res?.data) {
        toast.success('Student is created successfully!');
        form.resetFields();
        setFileList([]);
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div style={{background: '#f3f4f6', minHeight: '100vh', padding: '24px'}}>
      {/* Breadcrumb */}
      <Breadcrumb style={{marginBottom: 16}}>
        <Breadcrumb.Item>User Management</Breadcrumb.Item>
        <Breadcrumb.Item>Create Student</Breadcrumb.Item>
      </Breadcrumb>

      {/* Page Title */}
      <Title level={2}>Create Student</Title>
      <Text type="secondary">Add a new student to the system</Text>

      <Row justify="center" style={{marginTop: 24}}>
        <Col xs={24} md={22} lg={20} xl={18}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-6">
            {/* Personal Info */}
            <Card
              title="🧍 Personal Info"
              bordered={false}
              style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item label="Image">
                    <Upload
                      accept="image/*"
                      beforeUpload={() => false}
                      fileList={fileList}
                      onChange={({fileList}) => setFileList(fileList)}
                      maxCount={1}
                      listType="picture">
                      <Button icon={<UploadOutlined />} size="large">
                        Upload Image
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item label="Password" name="password">
                    <Input
                      size="large"
                      placeholder="Enter password (optional)"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Enter valid email',
                      },
                    ]}>
                    <Input size="large" placeholder="Enter email" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="First Name"
                    name={['name', 'firstName']}
                    rules={[{required: true, message: 'Enter first name'}]}>
                    <Input size="large" placeholder="Enter first name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item label="Middle Name" name={['name', 'middleName']}>
                    <Input size="large" placeholder="Enter middle name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Last Name"
                    name={['name', 'lastName']}
                    rules={[{required: true, message: 'Enter last name'}]}>
                    <Input size="large" placeholder="Enter last name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                      {required: true, type: 'number', message: 'Enter age'},
                    ]}>
                    <InputNumber
                      size="large"
                      className="w-full"
                      style={{width: '100%'}}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Contact"
                    name="contact"
                    rules={[{required: true, message: 'Enter valid contact'}]}>
                    <Input size="large" placeholder="Enter contact" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{required: true, message: 'Select gender'}]}>
                    <Select placeholder="Select gender" size="large">
                      {Gender?.map((item) => (
                        <Select.Option key={item} value={item}>
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item label="Blood Group" name="blood">
                    <Select placeholder="Select blood group" size="large">
                      {BloodGroup?.map((blood) => (
                        <Select.Option key={blood} value={blood}>
                          {blood.toUpperCase()}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Academic Info */}
            <Card
              title="🏫 Academic Details"
              bordered={false}
              style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Department"
                    name="department"
                    rules={[{required: true, message: 'Select department'}]}>
                    <Select placeholder="Select department" size="large">
                      {departmentData?.data?.map((item: TDepartment) => (
                        <Select.Option key={item._id} value={item._id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Semester"
                    name="semester"
                    rules={[{required: true, message: 'Select semester'}]}>
                    <Select placeholder="Select semester" size="large">
                      {semesterData?.data?.map((item: TSemester) => (
                        <Select.Option key={item._id} value={item._id}>
                          {item.name} - {item.year}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Guardian Info */}
            <Card
              title="👨‍👩‍👧 Guardian Information"
              bordered={false}
              style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Father's Name"
                    name="fatherName"
                    rules={[{required: true, message: "Enter father's name"}]}>
                    <Input size="large" placeholder="e.g. Abdul Karim Khan" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Mother's Name"
                    name="motherName"
                    rules={[{required: true, message: "Enter mother's name"}]}>
                    <Input size="large" placeholder="e.g. Fatema Begum" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Father's Contact"
                    name="fatherContact"
                    rules={[
                      {required: true, message: "Enter father's contact"},
                    ]}>
                    <Input size="large" placeholder="+8801812345678" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Mother's Contact"
                    name="matherContact"
                    rules={[
                      {required: true, message: "Enter mother's contact"},
                    ]}>
                    <Input size="large" placeholder="+8801912345678" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Permanent Address */}
            <Card
              title="🏠 Permanent Address"
              bordered={false}
              style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Village"
                    name={['permanentAddress', 'village']}>
                    <Input size="large" placeholder="Chandpur" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Post Office"
                    name={['permanentAddress', 'postOffice']}
                    rules={[{required: true, message: 'Enter post office'}]}>
                    <Input size="large" placeholder="Chandpur Sadar" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Police Station"
                    name={['permanentAddress', 'policeStation']}
                    rules={[{required: true, message: 'Enter police station'}]}>
                    <Input size="large" placeholder="Chandpur" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Town/City"
                    name={['permanentAddress', 'town']}
                    rules={[{required: true, message: 'Enter town or city'}]}>
                    <Input size="large" placeholder="Chandpur" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Local Address */}
            <Card
              title="📍 Local Address"
              bordered={false}
              style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="Village" name={['localAddress', 'village']}>
                    <Input size="large" placeholder="Mohammadpur" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Post Office"
                    name={['localAddress', 'postOffice']}
                    rules={[{required: true, message: 'Enter post office'}]}>
                    <Input size="large" placeholder="Dhanmondi" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Police Station"
                    name={['localAddress', 'policeStation']}
                    rules={[{required: true, message: 'Enter police station'}]}>
                    <Input size="large" placeholder="Mohammadpur" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Town/City"
                    name={['localAddress', 'town']}
                    rules={[{required: true, message: 'Enter town or city'}]}>
                    <Input size="large" placeholder="Dhaka" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Submit Button */}
            <Row justify="end" style={{marginTop: 16}}>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isLoading}
                  className="rounded-lg shadow-md"
                  style={{backgroundColor: '#2563EB', borderColor: '#2563EB'}}>
                  Create Student
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CreateStudent;
