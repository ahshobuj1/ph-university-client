import {Card, Col, Row, Skeleton} from 'antd';

const Loading = () => {
  const rows = Array.from({length: 6}); // 6 rows table placeholder
  return (
    <div className="min-h-screen bg-primary-light p-6">
      {/* Title + Action Button Skeleton */}
      <div className="rounded-2xl bg-gradient-to-r from-green-200 via-blue-200 to-indigo-200 p-[1px] shadow-lg mb-6">
        <div className="bg-primary-light rounded-2xl p-5">
          <Row
            align="middle"
            justify="space-between"
            gutter={[16, 16]}
            className="flex-col sm:flex-row">
            <Col className="w-full sm:w-auto">
              <Skeleton.Input
                style={{width: '100%', maxWidth: 300, height: 32}}
                active
              />
            </Col>
            <Col className="w-full sm:w-auto mt-2 sm:mt-0">
              <Skeleton.Button
                active
                size="large"
                style={{width: '100%', maxWidth: 120, height: 40}}
              />
            </Col>
          </Row>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 p-4 bg-white rounded-lg shadow-lg">
        <Skeleton.Input
          style={{width: '100%', maxWidth: 200, height: 32}}
          active
        />
        <Skeleton.Input
          style={{width: '100%', maxWidth: 200, height: 32}}
          active
        />
      </div>

      {/* Table Skeleton */}
      <Card className="rounded-2xl shadow-lg overflow-x-auto">
        <div className="min-w-[800px] space-y-4">
          {rows.map((_, idx) => (
            <Row gutter={[16, 16]} key={idx} className="items-center flex-wrap">
              <Col xs={24} sm={12} md={6} className="flex items-center gap-2">
                <Skeleton.Avatar active size={40} shape="circle" />
                <Skeleton.Input style={{width: '70%'}} active />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Skeleton.Input style={{width: '100%'}} active />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Skeleton.Input style={{width: '100%'}} active />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Skeleton.Input style={{width: '100%'}} active />
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Skeleton.Input style={{width: '100%'}} active />
              </Col>
              <Col xs={12} sm={6} md={3}>
                <Skeleton.Button active style={{width: '100%'}} />
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
