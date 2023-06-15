import React from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import styles from "./CheckoutSummary.module.scss";
import Card from "../card/Card";

function CheckoutSummary() {
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);

  return (
    <div>
      <h3 >Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No Items</p>
            <button className="--btn">
              <Link to="/#products">Back To Shopping</Link>
            </button>
          </>
        ) : (
          <>
            <div>
              <p>
                <b> {`Cart Item(s) :  ${totalQuantity}`} </b>
              </p>

              <div className={styles.text}>
                <h4> Subtotal : </h4>
               <h3>{`$${totalAmount.toFixed(2)}`}</h3>
              </div>

              {cartItems.map((item, index) => {
                const { id, name, price, cartQuantity } = item;

                return (
                  <Card key={id} cardClass={styles.card}>
                   <div style={{display: "flex"}}>
                   <h4>Product :</h4><h4 style={{color: "orangered",  marginLeft: "10px"}} >{name}</h4>
                   </div>

                    <p>Quantity : {cartQuantity} </p>

                    <p>Unit Price : {price} </p>

                    <p>Set Price : {price * cartQuantity} </p>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutSummary;
