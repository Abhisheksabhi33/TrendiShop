import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";
import { FaUserCircle } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();

  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const filteredReviews = data.filter((review) => review.productId === id);

  const cartItems = useSelector(selectCartItems);

  const cart = cartItems.find((cart) => cart.id === id);

  const isAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>

              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}> &#8377; {`${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <div className={styles.count}>
                  {isAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart?.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>

                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  Add to Card
                </button>
              </div>
            </div>
          </>
        )}

        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>No reviews yet</p>
            ) : (
              <>
                {filteredReviews.map((r, index) => {
                  const { rate, review, reviewDate, userName } = r;

                  return (
                    <div
                      style={{ margin: "1.5rem" }}
                      key={index}
                      className={styles.review}
                    >
                      <div
                        style={{
                          display: "flex",
                          marginLeft: "-12px",
                          marginBottom: "-20px",
                        }}
                      >
                        <FaUserCircle
                          size={34}
                          style={{ margin: "12px", color: "orangered" }}
                        />
                        <h4 style={{ margin: "20px", marginLeft: "-7px" }}>
                          {userName}
                        </h4>
                      </div>
                      <div style={{ display: "block", marginLeft: "2.4rem" }}>
                        <StarsRating value={rate} />
                        <p>{review}</p>
                        <span>
                          <b>{reviewDate}</b>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
