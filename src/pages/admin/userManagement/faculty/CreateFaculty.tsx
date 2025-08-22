import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
  Card,
  Breadcrumb,
  Typography,
  type FormProps,
  type UploadFile,
  DatePicker,
} from 'antd';
import {HomeOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import {
  BloodGroup,
  DesignationOptions,
  Gender,
} from '../../../../constant/global';
import type {TDepartment, TFacultyRoot, TResponse} from '../../../../types';
import {useState} from 'react';
import {toast} from 'sonner';
import {useGetAllDepartmentQuery} from '../../../../redux/api/departmentApi';
import {handleUploadToCloudinary} from '../../../../utils/handleUploadToCloudinary';
import {useAddFacultyMutation} from '../../../../redux/api/userApi';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import {useNavigate} from 'react-router-dom';

const {Title, Text} = Typography;

const CreateFaculty = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addFaculty, {isLoading}] = useAddFacultyMutation();
  const {data: departmentData} = useGetAllDepartmentQuery(undefined);
  const navigate = useNavigate();

  const onFinish: FormProps<TFacultyRoot>['onFinish'] = async (values) => {
    // upload image to cloudinary
    let imageUrl = null;
    if (fileList[0]?.originFileObj) {
      imageUrl = await handleUploadToCloudinary(fileList[0].originFileObj);
    }

    // faculty data
    const facultyData = {
      password: values.password,
      faculty: {
        ...values.faculty,
        profileImage: imageUrl,
      },
    };

    // console.log(facultyData);

    try {
      const res = (await addFaculty(facultyData)) as TResponse;
      console.log(res);
      if (res?.data) {
        toast.success('Faculty created successfully!');
        form.resetFields();
        setFileList([]);
        navigate('/admin/faculties');
      }

      if (res?.error) {
        const errorMessage = `${res.error?.data?.errorSources?.[0]?.path}: ${res.error?.data?.errorSources?.[0]?.message}`;
        toast.error(errorMessage);
      }
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
    }
  };

  return (
    <div className="bg-primary-light p-4 md:p-6 min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb
        separator=">"
        items={[
          {
            href: '/admin/faculties',
            title: (
              <>
                <HomeOutlined />
                <span>User Management</span>
              </>
            ),
          },
          {
            title: (
              <>
                <UserOutlined />
                <span>Create Faculty</span>
              </>
            ),
          },
        ]}
      />

      {/* Page Title */}
      <Title level={2}>Create Faculty</Title>
      <Text type="secondary">Add a new faculty member to the University</Text>

      <Row justify="center" style={{marginTop: 24}}>
        <Col xs={24} md={22} lg={20} xl={18}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-6">
            {/* Personal Info */}
            <Card title="🧍 Personal Info" style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Profile Image"
                    name={['faculty', 'profileImage']}>
                    <Upload
                      accept="image/*"
                      beforeUpload={() => false}
                      fileList={fileList}
                      onChange={({fileList}) => setFileList(fileList)}
                      maxCount={1}
                      listType="picture">
                      <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item label="Password" name="password">
                    <Input placeholder="Enter password" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Email"
                    name={['faculty', 'email']}
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Enter valid email',
                      },
                    ]}>
                    <Input placeholder="Enter email" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="First Name"
                    name={['faculty', 'name', 'firstName']}
                    rules={[{required: true, message: 'Enter first name'}]}>
                    <Input placeholder="Enter first name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Middle Name"
                    name={['faculty', 'name', 'middleName']}>
                    <Input placeholder="Enter middle name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Last Name"
                    name={['faculty', 'name', 'lastName']}
                    rules={[{required: true, message: 'Enter last name'}]}>
                    <Input placeholder="Enter last name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Date of Birth"
                    name={['faculty', 'dateOfBirth']}
                    rules={[{required: true, message: 'Enter date of birth'}]}>
                    <DatePicker style={{width: '100%'}} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Gender"
                    name={['faculty', 'gender']}
                    rules={[{required: true, message: 'Select gender'}]}>
                    <Select placeholder="Select gender">
                      {Gender.map((item) => (
                        <Select.Option key={item} value={item}>
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item label="Blood Group" name={['faculty', 'blood']}>
                    <Select placeholder="Select blood group">
                      {BloodGroup.map((blood) => (
                        <Select.Option key={blood} value={blood}>
                          {blood.toUpperCase()}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Contact"
                    name={['faculty', 'contact']}
                    rules={[{required: true, message: 'Enter contact number'}]}>
                    <Input placeholder="+8801712345678" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Emergency Contact"
                    name={['faculty', 'emergencyContact']}
                    rules={[
                      {required: true, message: 'Enter emergency contact'},
                    ]}>
                    <Input placeholder="+8801812345678" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Academic Info */}
            <Card title="🏫 Academic Details" style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Department"
                    name={['faculty', 'department']}
                    rules={[{required: true, message: 'Select department'}]}>
                    <Select placeholder="Select department">
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
                    label="Designation"
                    name={['faculty', 'designation']}
                    rules={[{required: true, message: 'Select designation'}]}>
                    <Select placeholder="Select designation">
                      {DesignationOptions.map((item) => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Addresses */}
            <Card
              title="🏠 Local & Permanent Address"
              style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={12}>
                  <Form.Item
                    label="Local Address"
                    name={['faculty', 'localAddress']}>
                    <Input placeholder="123 Campus Road, Dhaka" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={12}>
                  <Form.Item
                    label="Permanent Address"
                    name={['faculty', 'permanentAddress']}>
                    <Input placeholder="456 University Avenue, Chittagong" />
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
                  disabled={isLoading}
                  loading={isLoading}
                  className="rounded-lg shadow-md"
                  style={{backgroundColor: '#2563EB', borderColor: '#2563EB'}}>
                  Create Faculty
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CreateFaculty;
