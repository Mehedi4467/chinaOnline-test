import React from 'react';
import { specification } from '../../data/demo';

const support = () => {
  // if (specification) {
  //   const uniqueIds = [
  //     ...new Set(specification?.map((item) => item.PropertyName)),
  //   ];

  //   let array = Object.entries(uniqueIds);
  //   specification.forEach((el) => {
  //     array = array.filter((elm) => elm[1] === el.PropertyName);
  //   });
  //   console.log(array);
  // }
  //   const myArray = [{ userid: "100", projectid: "10", rowid: "0" }, { userid: "101", projectid: "11", rowid: "1"}, { userid: "102", projectid: "12", rowid: "2" }, { userid: "103", projectid: "13", rowid: "3" }, { userid: "101", projectid: "10", rowid: "4" }];
  // const myFilter = [{ userid: "101", projectid: "11" }, { userid: "102", projectid: "12" }, { userid: "103",  projectid: "11"}];

  // const myArrayFiltered = myArray.filter((el) => {
  //   return myFilter.some((f) => {
  //     return f.userid === el.userid && f.projectid === el.projectid;
  //   });
  // });

  // console.log(myArrayFiltered);

  const handle = (e, name) => {
    e.preventDefault();
    // const vel = data.findIndex((item) => {
    //   return item.search === name ? true : false;
    // });
    // console.log(vel);
    console.log(name);
  };
  return (
    <div>
      <button onClick={(e) => handle(e, 'shirt')}>name</button>
    </div>
  );
};

export default support;
