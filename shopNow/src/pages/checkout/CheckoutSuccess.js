import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Payment Successfull !</h2>
        <p>Thank You For your Purchase.</p>

        <br />

        <p> Keep Shopping &#128516; </p>

        <br />
        <button className="--btn --btn-primary">
          <Link to="/order-history">View Order History</Link>
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
