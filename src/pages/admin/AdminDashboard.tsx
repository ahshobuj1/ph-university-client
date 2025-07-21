import {Card, Col, Row} from 'antd';
import {
  SyncOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';

const AdminDashboard = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div className="flex items-center space-x-4">
              <AppstoreAddOutlined
                style={{fontSize: '32px', color: '#1890ff'}}
              />
              <div>
                <div className="text-gray-500">Total Semesters</div>
                <div className="text-2xl font-semibold">12</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div className="flex items-center space-x-4">
              <SyncOutlined spin style={{fontSize: '32px', color: '#52c41a'}} />
              <div>
                <div className="text-gray-500">Ongoing</div>
                <div className="text-2xl font-semibold">2</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div className="flex items-center space-x-4">
              <ClockCircleOutlined
                style={{fontSize: '32px', color: '#faad14'}}
              />
              <div>
                <div className="text-gray-500">Upcoming</div>
                <div className="text-2xl font-semibold">3</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <div className="flex items-center space-x-4">
              <MinusCircleOutlined
                style={{fontSize: '32px', color: '#ff4d4f'}}
              />
              <div>
                <div className="text-gray-500">Ended</div>
                <div className="text-2xl font-semibold">7</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
