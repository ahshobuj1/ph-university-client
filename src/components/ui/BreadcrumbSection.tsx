import {Breadcrumb} from 'antd';
import {HomeOutlined, BookOutlined} from '@ant-design/icons';

interface IBreadcrumbProps {
  home: string;
  sub: string;
}

const BreadcrumbSection = ({home, sub}: IBreadcrumbProps) => {
  return (
    <div className="mb-6">
      <Breadcrumb
        separator=">"
        items={[
          {
            href: '',
            title: (
              <>
                <HomeOutlined />
                <span className="capitalize">{home}</span>
              </>
            ),
          },
          {
            title: (
              <>
                <BookOutlined />
                <span className="capitalize">{sub}</span>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default BreadcrumbSection;
