import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SideBarBack, SideBarIcon } from '../icons';

const Category = ({ category, mainSubCategory }) => {
  const [subCategory, setSubCategory] = useState();
  const getSubCategory = (category_id) => {
    setSubCategory(
      mainSubCategory.filter((item) => item.category_id === category_id)
    );
  };
  return (
    <div className="side-bar__wrapper scrollbar-hidden">
      {subCategory ? (
        <>
          <div
            className="side-bar__back-wrapper"
            onClick={() => setSubCategory()}
          >
            <SideBarBack />
            <p className="side-bar__back">back</p>
          </div>
          {subCategory?.map(({ sub_category_name }, id) => (
            <Link
              href={`/shop/${sub_category_name}`}
              key={id}
              className="side-bar__item-wrapper"
            >
              <p className="side-bar__item-name">{sub_category_name}</p>
              <SideBarIcon className="side-bar__item-icon" />
            </Link>
          ))}
        </>
      ) : (
        <>
          {category?.map(({ category_name, icon, category_id }) => (
            <div
              className="side-bar__item-wrapper"
              key={category_id}
              onClick={() => getSubCategory(category_id)}
            >
              <Image
                className="side-bar__item-image"
                src={icon}
                alt={category_name}
                height={182 / 7}
                width={182 / 7}
              />
              <p className="side-bar__item-name">{category_name}</p>
              <SideBarIcon className="side-bar__item-icon" />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Category;
