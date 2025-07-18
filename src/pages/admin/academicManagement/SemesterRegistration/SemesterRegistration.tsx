import {Button, Col, Flex, Row, Select} from 'antd';
import {sortOptionsSemester} from '../../../../types';
import PHForm from '../../../../components/form/PHForm';
import type {FieldValues} from 'react-hook-form';
import PHInput from '../../../../components/form/PHInput';
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {UserOutlined} from '@ant-design/icons';

const semesterRegistrationSchema = z.object({
  name: z.string().min(5, 'name must be 5 characters'),
  email: z.string().email('Please enter a valid email address!'),
});

const SemesterRegistration = () => {
  const handleSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div>
      <Flex vertical gap="middle">
        <Row gutter={[16, 16]} justify="space-between" className="my-5 ">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Button type="primary" size="large">
              Register Semester
            </Button>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              size="large"
              placeholder="Sort by"
              className="w-full"
              options={sortOptionsSemester}
              onChange={(value) => {
                // setParams([{name: 'sort', value}]);
                console.log(value);
              }}
            />
          </Col>
        </Row>
      </Flex>

      <Row></Row>

      <PHForm
        onSubmit={handleSubmit}
        resolver={zodResolver(semesterRegistrationSchema)}>
        <Row justify={'center'} gutter={[10, 10]}>
          <Col xs={22} md={12} lg={8}>
            <PHInput
              name="name"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
          <Col xs={22} md={12} lg={8}>
            <PHInput
              name="email"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
          <Col xs={22} md={12} lg={8}>
            <PHInput
              name="email"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
        </Row>
        <Row justify={'space-between'} gutter={[10, 10]}>
          <Col lg={8}>
            <PHInput
              name="name"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
          <Col lg={8}>
            <PHInput
              name="email"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
          <Col lg={8}>
            <PHInput
              name="email"
              label="Name"
              placeholder="Name type here"
              icon={<UserOutlined />}
            />
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit" size="large">
              Submit here
            </Button>
          </Col>
        </Row>
      </PHForm>
    </div>
  );
};

export default SemesterRegistration;
