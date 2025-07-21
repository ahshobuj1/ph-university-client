import {Input} from 'antd';
import type {TQueryParams} from '../../types';

interface IPHSearchProps {
  setParams: React.Dispatch<React.SetStateAction<TQueryParams[]>>;
}

export const PHSearch = ({setParams}: IPHSearchProps) => {
  return (
    <>
      <Input.Search
        size="large"
        placeholder="Search Here"
        allowClear
        enterButton
        onSearch={(value) => {
          setParams([{name: 'searchTerm', value}]);
        }}
      />
    </>
  );
};
