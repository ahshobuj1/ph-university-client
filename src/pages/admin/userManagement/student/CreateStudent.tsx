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
import {handleUploadToCloudinary} from '../../../../utils/handleUploadToCloudinary';
import {useNavigate} from 'react-router-dom';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import BreadcrumbSection from '../../../../components/ui/BreadcrumbSection';

const {Title, Text} = Typography;

const CreateStudent = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addStudent, {isLoading}] = useAddStudentMutation();
  const {data: departmentData} = useGetAllDepartmentQuery(undefined);
  const {data: semesterData} = useGetAllSemesterQuery([
    {name: 'sort', value: 'year'},
  ]);

  const onFinish: FormProps<TStudentRoot>['onFinish'] = async (values) => {
    // upload image to cloudinary
    let imageUrl = null;
    if (fileList[0]?.originFileObj) {
      imageUrl = await handleUploadToCloudinary(fileList[0].originFileObj);
    }

    // student data
    const studentData = {
      password: values.password,
      faculty: {
        ...values.student,
        profileImage: imageUrl,
      },
    };

    // const studentData = {password, student};
    // const formData = new FormData();
    // formData.append('data', JSON.stringify(studentData));
    // if (fileList[0]?.originFileObj)
    //   formData.append('file', fileList[0].originFileObj);

    try {
      const res = (await addStudent(studentData)) as TResponse;
      if (res?.data) {
        toast.success('Student is created successfully!');
        form.resetFields();
        setFileList([]);
        navigate('/admin/students');
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

      <BreadcrumbSection home="User Management" sub="Create Student" />

      {/* Page Title */}
      <Title level={2}>Create Student</Title>
      <Text type="secondary">Add a new student to the University</Text>

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
                  <Form.Item label="Image">
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
                    <Input placeholder="Enter password (optional)" />
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
                    <Input placeholder="Enter email" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="First Name"
                    name={['name', 'firstName']}
                    rules={[{required: true, message: 'Enter first name'}]}>
                    <Input placeholder="Enter first name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item label="Middle Name" name={['name', 'middleName']}>
                    <Input placeholder="Enter middle name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Last Name"
                    name={['name', 'lastName']}
                    rules={[{required: true, message: 'Enter last name'}]}>
                    <Input placeholder="Enter last name" />
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
                      className="w-full"
                      style={{width: '100%'}}
                      placeholder="Enter last age"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Contact"
                    name="contact"
                    rules={[{required: true, message: 'Enter valid contact'}]}>
                    <Input placeholder="Enter contact" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{required: true, message: 'Select gender'}]}>
                    <Select placeholder="Select gender">
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
                    <Select placeholder="Select blood group">
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
            <Card title="🏫 Academic Details" style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Department"
                    name="department"
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
                    label="Semester"
                    name="semester"
                    rules={[{required: true, message: 'Select semester'}]}>
                    <Select placeholder="Select semester">
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
            <Card title="👨‍👩‍👧 Guardian Information" style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Father's Name"
                    name="fatherName"
                    rules={[{required: true, message: "Enter father's name"}]}>
                    <Input placeholder="e.g. Ahmed Khan" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Mother's Name"
                    name="motherName"
                    rules={[{required: true, message: "Enter mother's name"}]}>
                    <Input placeholder="e.g. Fatema Begum" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Father's Contact"
                    name="fatherContact"
                    rules={[
                      {required: true, message: "Enter father's contact"},
                    ]}>
                    <Input placeholder="+8801812345678" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Form.Item
                    label="Mother's Contact"
                    name="matherContact"
                    rules={[
                      {required: true, message: "Enter mother's contact"},
                    ]}>
                    <Input placeholder="+8801912345678" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Permanent Address */}
            <Card title="🏠 Permanent Address" style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Village"
                    name={['permanentAddress', 'village']}>
                    <Input placeholder="Chandpur" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Post Office"
                    name={['permanentAddress', 'postOffice']}
                    rules={[{required: true, message: 'Enter post office'}]}>
                    <Input placeholder="Chandpur Sadar" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Police Station"
                    name={['permanentAddress', 'policeStation']}
                    rules={[{required: true, message: 'Enter police station'}]}>
                    <Input placeholder="Chandpur" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Town/City"
                    name={['permanentAddress', 'town']}
                    rules={[{required: true, message: 'Enter town or city'}]}>
                    <Input placeholder="Chandpur" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Local Address */}
            <Card title="📍 Local Address" style={{marginBottom: 24}}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item label="Village" name={['localAddress', 'village']}>
                    <Input placeholder="Mohammadpur" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Post Office"
                    name={['localAddress', 'postOffice']}
                    rules={[{required: true, message: 'Enter post office'}]}>
                    <Input placeholder="Dhanmondi" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Police Station"
                    name={['localAddress', 'policeStation']}
                    rules={[{required: true, message: 'Enter police station'}]}>
                    <Input placeholder="Mohammadpur" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <Form.Item
                    label="Town/City"
                    name={['localAddress', 'town']}
                    rules={[{required: true, message: 'Enter town or city'}]}>
                    <Input placeholder="Dhaka" />
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
