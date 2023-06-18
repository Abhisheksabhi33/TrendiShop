import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import InfoBox from "../../infoBox/InfoBox";
import { FaCartArrowDown, FaRupeeSign } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../redux/slice/productSlice";
import {
  CALCULATE_TOTAL_ORDER_AMOUNT,
  STORE_ORDERS,
  selectOrderHistory,
  selectTotalOrderAmount,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Chart from "../../chart/Chart";

// Icons
const earningIcon = <FaRupeeSign size={30} color={"#b624ff"} />;
const productIcon = <BsCart4 size={30} color={"#1f93ff"} />;
const orderIcon = <FaCartArrowDown size={30} color={"orangered"} />;
const Home = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const dispatch = useDispatch();

  const { data: fbProducts } = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts,
      })
    );

    dispatch(STORE_ORDERS(data));

    dispatch(CALCULATE_TOTAL_ORDER_AMOUNT());
  }, [fbProducts, data, dispatch]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>

      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`${totalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={products?.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orders.length}
          icon={orderIcon}
        />
      </div>

      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
