import {Card, Col, Row, Skeleton} from 'antd';

const Loading = () => {
  const rows = Array.from({length: 6}); // 6 rows table placeholder
  return (
    <div className="min-h-screen bg-primary-light p-6">
      {/* Title + Action Button Skeleton */}
      <div className="rounded-2xl bg-gradient-to-r from-green-200 via-blue-200 to-indigo-200 p-[1px] shadow-lg mb-6">
        <div className="bg-primary-light rounded-2xl p-5">
          <Row align="middle" justify="space-between" gutter={[16, 16]}>
            <Col>
              <div>
                <Skeleton.Input style={{width: 300, height: 32}} active />
              </div>
            </Col>
            <Col>
              <Skeleton.Button
                active
                size="large"
                style={{width: 120, height: 40}}
              />
            </Col>
          </Row>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 p-4 bg-white rounded-lg shadow-lg">
        <Skeleton.Input style={{width: 200, height: 32}} active />
        <Skeleton.Input style={{width: 200, height: 32}} active />
      </div>

      {/* Table Skeleton */}
      <Card className="rounded-2xl shadow-lg">
        <div className="space-y-4">
          {rows.map((_, idx) => (
            <Row gutter={[16, 16]} key={idx} className="items-center">
              <Col span={6}>
                <Skeleton.Avatar active size={40} shape="circle" />
                <Skeleton.Input style={{width: '80%', marginLeft: 8}} active />
              </Col>
              <Col span={4}>
                <Skeleton.Input style={{width: '90%'}} active />
              </Col>
              <Col span={4}>
                <Skeleton.Input style={{width: '90%'}} active />
              </Col>
              <Col span={4}>
                <Skeleton.Input style={{width: '90%'}} active />
              </Col>
              <Col span={3}>
                <Skeleton.Input style={{width: '80%'}} active />
              </Col>
              <Col span={3}>
                <Skeleton.Button active style={{width: '80%'}} />
              </Col>
            </Row>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-5 flex justify-end">
          <Skeleton.Button active style={{width: 120, height: 32}} />
        </div>
      </Card>
    </div>
  );
};

export default Loading;
