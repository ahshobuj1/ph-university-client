import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
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

    const studentData = {
      password,
      student,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(studentData));

    if (fileList[0]?.originFileObj) {
      formData.append('file', fileList[0].originFileObj);
    }

    try {
      const res = (await addStudent(formData)) as TResponse;

      if (res?.data) {
        toast.success('Student is created successfully!');
        form.resetFields();
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('something went wrong');
    }

    //! This is for development
    //! Just for checking
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={23} lg={24} xl={22}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{span: 24}}
          wrapperCol={{span: 24}}>
          {/* Section: Personal Info */}
          <Divider orientation="left">🧍 Personal Info</Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Form.Item label="Image">
                <Upload
                  accept="image/*"
                  beforeUpload={() => false} // prevent auto upload
                  fileList={fileList}
                  onChange={({fileList}) => setFileList(fileList)}
                  maxCount={1}
                  listType="picture">
                  <Button icon={<UploadOutlined />} size="large">
                    Upload Image
                  </Button>
                </Upload>
                {/* <Input
                  type="file"
                  onChange={(e) => console.log(e.target.files?.[0])}
                /> */}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item label="Password" name="password">
                <Input size="large" placeholder="Enter password (optional)" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {required: true, type: 'email', message: 'Enter valid email'},
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
                  placeholder="Enter age"
                  className="w-full"
                  style={{width: '100%'}}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                label="Contact"
                name="contact"
                rules={[
                  {
                    required: true,
                    type: 'string',
                    message: 'Enter valid contact',
                  },
                ]}>
                <Input size="large" placeholder="Enter contact" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{required: true, message: 'Enter gender'}]}>
                <Select placeholder="Select gender" size="large">
                  {Gender?.map((item) => (
                    <Select.Option key={item} value={item}>
                      <span className="capitalize"> {item}</span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item label="Blood group" name="blood">
                <Select placeholder="Select blood group" size="large">
                  {BloodGroup?.map((blood) => (
                    <Select.Option key={blood} value={blood}>
                      <span className="capitalize"> {blood}</span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Academic Info */}
          <Divider orientation="left">🏫 Academic Details</Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                label="Department"
                name="department"
                rules={[{required: true, message: 'Enter department name'}]}>
                <Select placeholder="Select blood group" size="large">
                  {departmentData?.data?.map((item: TDepartment) => (
                    <Select.Option key={item._id} value={item._id}>
                      <span className="capitalize"> {item.name}</span>
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
                <Select placeholder="Select blood group" size="large">
                  {semesterData?.data?.map((item: TSemester) => (
                    <Select.Option key={item._id} value={item._id}>
                      <span className="capitalize">
                        {item.name} - {item.year}
                      </span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Guardian Info */}
          <Divider orientation="left">👨‍👩‍👧 Guardian Information</Divider>
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
                rules={[{required: true, message: "Enter father's contact"}]}>
                <Input size="large" placeholder="+8801812345678" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                label="Mother's Contact"
                name="matherContact"
                rules={[{required: true, message: "Enter mother's contact"}]}>
                <Input size="large" placeholder="+8801912345678" />
              </Form.Item>
            </Col>
          </Row>

          {/* Section: Permanent Address */}
          <Divider orientation="left">🏠 Permanent Address</Divider>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="Village" name={['permanentAddress', 'village']}>
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

          {/* Section: Local Address */}
          <Divider orientation="left">📍 Local Address</Divider>
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

          {/* Submit Button */}
          <Row justify="end">
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}>
                Create Student
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateStudent;
