import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  console.log(order);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2> Order Details </h2>

        <div>
          <Link to="/order-history">&larr; Go Back </Link>
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
              <b> Order Amount :</b>  &#8377; {order.orderAmount}
            </p>

            <p>
              <b> Order Status </b> {order.orderStatus}
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
                  <th>Action</th>
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
                      <td className={styles.icons}>
                        <button style={{padding: ".35rem"}} className="--btn --btn-primary">
                          <Link to={`/review-product/${id}`}>
                            Review Product
                          </Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
