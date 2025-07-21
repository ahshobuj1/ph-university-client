import {Select} from 'antd';
import type {TQueryParams} from '../../types';
import type {DefaultOptionType} from 'antd/es/select';

interface IPHSortProps {
  setParams: React.Dispatch<React.SetStateAction<TQueryParams[]>>;
  options: DefaultOptionType[];
}

const PHSort = ({setParams, options}: IPHSortProps) => {
  return (
    <>
      <Select
        size="large"
        placeholder="Sort by"
        variant="borderless"
        className="w-full"
        options={options}
        onChange={(value) => {
          setParams([{name: 'sort', value}]);
        }}
      />
    </>
  );
};

export default PHSort;
