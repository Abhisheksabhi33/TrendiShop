import React, { useEffect } from "react";
import styles from "./OrderHistory.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";
import { selectUserId } from "../../redux/slice/authSlice";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userID === userId);

  console.log(filteredOrders.length);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2> Your Order History </h2>

        <p>
          {" "}
          Open an Order to Leave a <b> Product Review </b>{" "}
        </p>

        <br />

        <>
          {isLoading && <Loader />}

          <div className={styles.table}>
            {filteredOrders.length === 0 ? (
              <p> You have no orders </p>
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
};

export default OrderHistory;
