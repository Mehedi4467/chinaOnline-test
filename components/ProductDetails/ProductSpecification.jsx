import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SpecificationTable } from './';
import useDebounce from '../../hook/useDebounce';

const ProductSpecification = ({ productId }) => {
  const [details, setDetails] = useState({
    description: '',
    table: '',
  });

  const [selected, setSelected] = useState('specification');
  const specification = async (type) => {
    setSelected(type);
  };

  const debouncedValue = useDebounce(productId, 300);
  const getData = async () => {
    try {
      const { data, status } = await axios.get(
        `/api/product/description?productId=${productId}`,
        {
          headers: {
            token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        },
      );
      if (status === 200) {
        setDetails({
          ...details,
          description: data?.description,
          table: data?.product_specification,
        });
      }
    } catch (error) {
      if (error.status != 200) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getData(productId);
  }, [debouncedValue]);
  return (
    <div className="specification">
      <div className="specification__button-wrapper">
        <div
          className={`specification__button${
            selected === 'specification' ? ' specification__button--active' : ''
          }`}
          onClick={() => specification('specification')}
        >
          Specification
        </div>
        <div
          className={`specification__button${
            selected === 'description' ? ' specification__button--active' : ''
          }`}
          onClick={() => specification('description')}
        >
          Description
        </div>
      </div>
      <div className="specification__wrapper">
        {selected === 'specification' ? (
          <div className="specification__table-wrapper">
            {details?.table && <SpecificationTable table={details?.table} />}
          </div>
        ) : (
          <div
            className="specification__details"
            dangerouslySetInnerHTML={{ __html: details?.description }}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductSpecification);
