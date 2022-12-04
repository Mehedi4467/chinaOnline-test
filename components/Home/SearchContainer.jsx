import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SearchCard } from '../';
import { RecentSearchLoading } from '../Loader';

const SearchContainer = ({ name, title }) => {
  const [seachData, setSeachData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const { status, data } = await axios.get(
        `/api/product/search?name=${name}`,
        {
          headers: {
            token: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        },
      );
      if (status === 200) {
        setSeachData(data?.result);
        setLoading(false);
      } else {
        setSeachData('');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.status != 200) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getData();
  }, [name]);
  return (
    <>
      {loading ? (
        <RecentSearchLoading />
      ) : seachData && seachData.length != 0 ? (
        <SearchCard title={title ? title : ''} data={seachData} name={name} />
      ) : (
        ''
      )}
    </>
  );
};

export default SearchContainer;
