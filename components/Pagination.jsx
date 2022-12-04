import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage, PrevPage } from './icons';
import { useMediaQuery } from '../hook';

const Pagination = ({ current, total, site }) => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const router = useRouter();
  const key = router.query.slug;
  const imageData = router.query.image_url;
  const sort = router.query.sort_status;
  const direction = router.query.direction;
  const discountStatus = router.query.discount_status;
  const maxPrice = router.query.max_price;
  const minPrice = router.query.min_price;
  let search;
  let searchItem;
  if (key) {
    if (!imageData) {
      search = `/${key}?`;
      if (maxPrice || minPrice) {
        searchItem = `min_price=${minPrice}&max_price=${maxPrice}&`;
      } else if (sort || direction || discountStatus) {
        if (discountStatus) {
          searchItem = `discount_status=${discountStatus}&`;
        } else if (sort && !direction) {
          searchItem = `sort_status=${sort}&`;
        } else {
          searchItem = `sort_status=${sort}&direction=${direction}&`;
        }
      }
    } else {
      search = `/imageSearch?image_url=${imageData}&`;
    }
  } else {
    search = `?`;
  }
  return (
    <ul className="pagination">
      {isMobile ? (
        <>
          {total < 5 ? (
            <>
              {Array.apply(0, Array(total)).map((arr, i) => (
                <li
                  key={i}
                  className={`pagination__page-item ${
                    current === i + 1 ? 'pagination__page-active' : ''
                  }`}
                >
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${i + 1}`}
                    className="pagination__page-link"
                  >
                    {i + 1}
                  </Link>
                </li>
              ))}
            </>
          ) : current % 3 >= 0 && current > 2 && current + 2 < total ? (
            <>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    current - 1
                  }`}
                  className="pagination__page-link"
                >
                  {current - 1}
                </Link>
              </li>
              <li className="pagination__page-item pagination__page-active">
                <Link
                  href={`${site}${search}${
                    searchItem ? searchItem : ''
                  }page=${current}`}
                  className="pagination__page-link"
                >
                  {current}
                </Link>
              </li>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    current + 1
                  }`}
                  className="pagination__page-link"
                >
                  {current + 1}
                </Link>
              </li>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    current + 1
                  }`}
                  className="pagination__page-link"
                >
                  ...
                </Link>
              </li>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${
                    searchItem ? searchItem : ''
                  }page=${total}`}
                  className="pagination__page-link"
                >
                  {total}
                </Link>
              </li>
            </>
          ) : current % 3 >= 0 && current > 2 && current + 2 >= total ? (
            <>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=1`}
                  className="pagination__page-link"
                >
                  {' '}
                  1
                </Link>
              </li>
              <li className="pagination__page-item">
                {current > 1 ? (
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${current - 1}`}
                    className="pagination__page-link"
                  >
                    ...
                  </Link>
                ) : (
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${current}`}
                    className="pagination__page-link"
                  >
                    ...
                  </Link>
                )}
              </li>
              <li
                className={`pagination__page-item ${
                  current === total - 2 ? 'pagination__page-active' : ''
                }`}
              >
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    total - 2
                  }`}
                  className="pagination__page-link"
                >
                  {total - 2}
                </Link>
              </li>
              <li
                className={`pagination__page-item ${
                  current === total - 1 ? 'pagination__page-active' : ''
                }`}
              >
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    total - 1
                  }`}
                  className="pagination__page-link"
                >
                  {total - 1}
                </Link>
              </li>
              <li
                className={`pagination__page-item ${
                  current === total ? 'pagination__page-active' : ''
                }`}
              >
                <Link
                  href={`${site}${search}${
                    searchItem ? searchItem : ''
                  }page=${total}`}
                  className="pagination__page-link"
                >
                  {total}
                </Link>
              </li>
            </>
          ) : (
            <>
              {Array.apply(0, Array(3)).map((arr, i) => (
                <li
                  className={`pagination__page-item ${
                    current === i + 1 ? 'pagination__page-active' : ''
                  }`}
                  key={i}
                >
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${i + 1}`}
                    className="pagination__page-link"
                  >
                    {i + 1}
                  </Link>
                </li>
              ))}
              <li className="pagination__page-item">
                {current > 1 ? (
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${current + 1}`}
                    className="pagination__page-link"
                  >
                    ...
                  </Link>
                ) : (
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${current}`}
                    className="pagination__page-link"
                  >
                    ...
                  </Link>
                )}
              </li>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${
                    searchItem ? searchItem : ''
                  }page=${total}`}
                  className="pagination__page-link"
                >
                  {total}
                </Link>
              </li>
            </>
          )}
        </>
      ) : (
        <>
          {current === 0 || current === 1 || !current ? (
            <li className="pagination__page-prev-item">
              <PrevPage className="pagination__page-prev pagination__page-disabled-icon" />
            </li>
          ) : (
            <li className="pagination__page-prev-item">
              <Link
                href={`${site}${search}${searchItem ? searchItem : ''}page=${
                  current - 1
                }`}
                className="pagination__page-link"
              >
                <PrevPage className="pagination__page-prev" />
              </Link>
            </li>
          )}

          {total < 7 ? (
            <>
              {Array.apply(0, Array(total)).map((arr, i) => (
                <li
                  key={i}
                  className={`pagination__page-item ${
                    current === i + 1 ? 'pagination__page-active' : ''
                  }`}
                >
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${i + 1}`}
                    className="pagination__page-link"
                  >
                    {i + 1}
                  </Link>
                </li>
              ))}
            </>
          ) : current % 4 >= 0 && current > 3 && current + 2 < total ? (
            <>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=1`}
                  className="pagination__page-link"
                >
                  1
                </Link>
              </li>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    current - 1
                  }`}
                  className="pagination__page-link"
                >
                  ...
                </Link>
              </li>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    current - 1
                  }`}
                  className="pagination__page-link"
                >
                  {current - 1}
                </Link>
              </li>
              <li className="pagination__page-item pagination__page-active">
                <p className="pagination__page-link">{current}</p>
              </li>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    current + 1
                  }`}
                  className="pagination__page-link"
                >
                  {current + 1}
                </Link>
              </li>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    current + 1
                  }`}
                  className="pagination__page-link"
                >
                  ...
                </Link>
              </li>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${
                    searchItem ? searchItem : ''
                  }page=${total}`}
                  className="pagination__page-link"
                >
                  {total}
                </Link>
              </li>
            </>
          ) : current % 4 >= 0 && current > 3 && current + 2 >= total ? (
            <>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=1`}
                  className="pagination__page-link"
                >
                  1
                </Link>
              </li>
              <li className="pagination__page-item">
                {current > 1 ? (
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${current - 1}`}
                    className="pagination__page-link"
                  >
                    ...
                  </Link>
                ) : (
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${current}`}
                    className="pagination__page-link"
                  >
                    ...
                  </Link>
                )}
              </li>
              <li
                className={`pagination__page-item ${
                  current === total - 2 ? 'pagination__page-active' : ''
                }`}
              >
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    total - 2
                  }`}
                  className="pagination__page-link"
                >
                  {total - 2}
                </Link>
              </li>
              <li
                className={`pagination__page-item ${
                  current === total - 1 ? 'pagination__page-active' : ''
                }`}
              >
                <Link
                  href={`${site}${search}${searchItem ? searchItem : ''}page=${
                    total - 1
                  }`}
                  className="pagination__page-link"
                >
                  {total - 1}
                </Link>
              </li>
              <li
                className={`pagination__page-item ${
                  current === total ? 'pagination__page-active' : ''
                }`}
              >
                <Link
                  href={`${site}${search}${
                    searchItem ? searchItem : ''
                  }page=${total}`}
                  className="pagination__page-link"
                >
                  {total}
                </Link>
              </li>
            </>
          ) : (
            <>
              {Array.apply(0, Array(4)).map((arr, i) => (
                <li
                  className={`pagination__page-item ${
                    current === i + 1 ? 'pagination__page-active' : ''
                  }`}
                  key={i}
                >
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${i + 1}`}
                    className="pagination__page-link"
                  >
                    {i + 1}
                  </Link>
                </li>
              ))}
              <li className="pagination__page-item">
                {current > 1 ? (
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${current + 1}`}
                    className="pagination__page-link"
                  >
                    ...
                  </Link>
                ) : (
                  <Link
                    href={`${site}${search}${
                      searchItem ? searchItem : ''
                    }page=${current}`}
                    className="pagination__page-link"
                  >
                    ...
                  </Link>
                )}
              </li>
              <li className="pagination__page-item">
                <Link
                  href={`${site}${search}${
                    searchItem ? searchItem : ''
                  }page=${total}`}
                  className="pagination__page-link"
                >
                  {total}
                </Link>
              </li>
            </>
          )}

          {current === total || !current ? (
            <li className="pagination__page-next-item">
              <NextPage className="pagination__page-next pagination__page-disabled-icon" />
            </li>
          ) : (
            <li className="pagination__page-next-item">
              <Link
                href={`${site}${search}${searchItem ? searchItem : ''}page=${
                  current + 1
                }`}
                className="pagination__page-link"
              >
                <NextPage className="pagination__page-next" />
              </Link>
            </li>
          )}
        </>
      )}
    </ul>
  );
};

export default React.memo(Pagination);
