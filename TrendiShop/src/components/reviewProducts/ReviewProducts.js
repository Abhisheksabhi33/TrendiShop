import React, { useEffect, useState } from "react";
import styles from "./ReviewProducts.module.scss";
import { useSelector } from "react-redux";
import { selectUserId, selectUserName } from "../../redux/slice/authSlice";
import { useParams } from "react-router-dom";
import Card from "../card/Card";
import StarsRating from "react-star-rate";
import spinnerImg from "../../assets/spinner.jpg";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);

  const { document } = useFetchDocument("products", id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userId,
      userName,
      productId: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review Submitted Successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      {product === undefined ? (
        <img
          src={spinnerImg}
          alt="Loading..."
          style={{
            width: "4em",
            display: "block",
            marginLeft: "8em",
            marginRight: "auto",
          }}
        ></img>
      ) : (
        <div className={`container ${styles.review}`}>
          <h2>Review Products</h2>
          <p>
            <b> Product Name : </b> {product?.name}
          </p>

          <img src={product?.imageURL} alt={product?.name} />

          <Card cardClass={styles.card}>
            <form onSubmit={(e) => submitReview(e)}>
              <label>Rating:</label>

              <StarsRating
                value={rate}
                required
                onChange={(rate) => {
                  setRate(rate);
                }}
              />
              <label> Review </label>
              <textarea
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here"
                cols="30"
                rows="10"
              ></textarea>
              <button className="--btn --btn-primary" type="submit">
                Submit Review
              </button>
            </form>
          </Card>
        </div>
      )}
    </section>
  );
};

export default ReviewProducts;
