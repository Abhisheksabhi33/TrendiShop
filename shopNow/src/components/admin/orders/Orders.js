import React from 'react'
import styles from './Orders.module.scss'
import  useFetchCollection  from '../../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_ORDERS } from '../../../redux/slice/orderSlice'
import { selectOrderHistory } from '../../../redux/slice/orderSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../loader/Loader'

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  const filteredOrders = orders;
  

  return (
    <section>
      <div className={styles.order}>
        <h2> All Orders </h2>

        <p>
          {" "}
          Open an Order to Change  <b> Order Status </b>{" "}
        </p>

        <br />

        <>
          {isLoading && <Loader />}

          <div className={styles.table}>
            {filteredOrders.length === 0 ? (
              <p> There is no orders </p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Date</th>
                    <th>Order Id</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;

                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>&#8377; {orderAmount}</td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
}

export default Orders