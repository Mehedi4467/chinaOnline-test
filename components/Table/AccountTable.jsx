import React from 'react';
import { CrossIcons } from '../icons';
import { ImageRenderer } from '../';
import { useMediaQuery } from '../../hook';

const AccountTable = ({ data, cancelOrder, buyNow }) => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  return (
    <>
      {isMobile ? (
        <table className="table">
          {data?.map(
            ({
              order_id,
              paid,
              product_image,
              product_name,
              total,
              payment_status,
              total_product_price,
            }) => (
              <tbody className="account__table" key={order_id}>
                <tr>
                  <th>Order Id</th>
                  <td>{order_id}</td>
                </tr>
                <tr>
                  <th>Image</th>
                  <td>
                    <ImageRenderer
                      alt={product_name}
                      url={product_image}
                      imgClass="account__table-image"
                      divClass="account__table-image-wrapper"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Product Name</th>
                  <td className="account__table-heading-wrapper">
                    <p className="account__table-heading">{product_name}</p>
                  </td>
                </tr>
                <tr>
                  <th>payment status</th>
                  <td>
                    {payment_status ? payment_status : 'watting for payment'}
                  </td>
                </tr>
                <tr>
                  <th>Total Product Price</th>
                  <td className="account__table-total-price">
                    ৳ {total_product_price}
                  </td>
                </tr>
                <tr>
                  <th>Paid (40%)</th>
                  <td>৳ {paid ? paid : 0}</td>
                </tr>
                <tr>
                  <th>Total Price</th>
                  <td>৳ {total}</td>
                </tr>
                <tr>
                  <th>Actions</th>
                  <td>
                    {payment_status != 'Purchased' && (
                      <div className="account__table-actions">
                        <div
                          className="account__table-action-wrappper"
                          onClick={() => buyNow(order_id)}
                        >
                          <p className="account__table-text">Buy Now</p>
                        </div>
                        <div
                          className="account__table-action-wrappper"
                          onClick={() => cancelOrder(order_id)}
                        >
                          <CrossIcons className="account__table-icon" />
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            ),
          )}
        </table>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>payment status</th>
              <th>Total Product Price</th>
              <th>Paid (40%)</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(
              ({
                order_id,
                paid,
                product_image,
                product_name,
                total,
                payment_status,
                total_product_price,
              }) => (
                <tr key={order_id}>
                  <td className="account__table-id">{order_id}</td>
                  <td className="account__table-image-main">
                    <ImageRenderer
                      alt={product_name}
                      url={product_image}
                      imgClass="account__table-image"
                      divClass="account__table-image-wrapper"
                    />
                  </td>
                  <td className="account__table-heading-wrapper">
                    <p className="account__table-heading">{product_name}</p>
                  </td>
                  <td className="account__table-status">
                    {payment_status ? payment_status : 'Watting for payment'}
                  </td>
                  <td className="account__table-total-price">
                    ৳ {total_product_price}
                  </td>
                  <td>৳ {paid ? paid : 0}</td>
                  <td>৳ {total}</td>
                  <td>
                    {payment_status != 'Purchased' && (
                      <div className="account__table-actions">
                        <div
                          className="account__table-action-wrappper"
                          onClick={() => buyNow(order_id)}
                        >
                          <p className="account__table-text">Buy Now</p>
                        </div>
                        <div
                          className="account__table-action-wrappper"
                          onClick={() => cancelOrder(order_id)}
                        >
                          <CrossIcons className="account__table-icon" />
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
    </>
  );
};
export default AccountTable;
