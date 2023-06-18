import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import spinnerImg from "../../../assets/spinner.jpg";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={styles.table}>
        <h2> Order Details </h2>

        <div>
          <Link to="/admin/orders">&larr; Go Back </Link>
        </div>

        <br />

        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b> Order ID: </b> {order.id}
            </p>

            <p>
              <b> Order Amount :</b> &#8377; {order.orderAmount}
            </p>

            <p>
              <b> Order Status </b> {order.orderStatus}
            </p>

            <p>
              <b> Shipping Address </b>
              <br />
              <b>Address :</b> {order.shippingAddress.line1},{" "}
              {order.shippingAddress.line2}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}, {order.shippingAddress.country},{" "}
              {order.shippingAddress.postal_code}
            </p>

            <br />

            <table>
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
               
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;

                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1} ) </b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "70px" }}
                        />
                      </td>
                      <td>&#8377; {price}</td>
                      <td>{cartQuantity}</td>
                      <td>&#8377; {(price * cartQuantity).toFixed(2)}</td>
                     
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        

        <ChangeOrderStatus order={order}  id={id} />


      </div>
    </>
  );
};

export default OrderDetails;
