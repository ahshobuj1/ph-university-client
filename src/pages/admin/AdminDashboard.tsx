import {Card, Col, Row, Divider} from 'antd';
import {Pie, Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const stats = [
  {
    title: 'Total Students',
    value: 4500,
    icon: <UserOutlined style={{fontSize: 28, color: '#1890ff'}} />,
  },
  {
    title: 'Total Faculties',
    value: 120,
    icon: <TeamOutlined style={{fontSize: 28, color: '#52c41a'}} />,
  },
  {
    title: 'Offered Courses',
    value: 85,
    icon: <BookOutlined style={{fontSize: 28, color: '#faad14'}} />,
  },
  {
    title: 'Total Semesters',
    value: 12,
    icon: <AppstoreAddOutlined style={{fontSize: 28, color: '#ff4d4f'}} />,
  },
];

const pieData = {
  labels: ['Computer Science', 'Economics', 'Physics', 'Mathematics'],
  datasets: [
    {
      label: 'Students per Department',
      data: [1200, 900, 800, 600],
      backgroundColor: ['#1890ff', '#52c41a', '#faad14', '#ff4d4f'],
    },
  ],
};

const barData = {
  labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
  datasets: [
    {
      label: 'Ongoing Students',
      data: [300, 450, 200, 500],
      backgroundColor: '#1890ff',
    },
    {
      label: 'Completed Students',
      data: [150, 200, 300, 100],
      backgroundColor: '#52c41a',
    },
  ],
};

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-primary-light min-h-screen">
      {/* Quick Stats */}
      <Row gutter={[24, 24]} className="mb-6">
        {stats.map((stat, idx) => (
          <Col xs={24} sm={12} md={6} key={idx}>
            <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-white">{stat.icon}</div>
                <div>
                  <div className="text-gray-500">{stat.title}</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    {stat.value}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            title="Students per Department"
            className="rounded-lg shadow-lg">
            <Pie data={pieData} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Semester Progress" className="rounded-lg shadow-lg">
            <Bar
              data={barData}
              options={{responsive: true, plugins: {legend: {position: 'top'}}}}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Divider className="my-6 text-gray-400">Recent Activities</Divider>
      <Card className="rounded-lg shadow-lg">
        <ul className="space-y-1">
          <li className="flex items-center space-x-3">
            <span className="text-blue-500 mt-1">●</span>
            <span>
              <strong>John Doe</strong> enrolled in{' '}
              <strong>Computer Science</strong>.
            </span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-green-500 mt-1">●</span>
            <span>
              <strong>Dr. Smith</strong> added a new course:{' '}
              <strong>Economics 101</strong>.
            </span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-orange-500 mt-1">●</span>
            <span>
              Semester 3 has started for <strong>Mathematics</strong> students.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default AdminDashboard;
