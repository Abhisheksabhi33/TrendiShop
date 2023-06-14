import styles from "./Loader.module.scss";
import loaderIMG from "../../assets/loader.gif";
import ReactDOM from "react-dom";
import React from "react";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderIMG} alt="loader..." />
      </div>
    </div>,
    document.getElementById("loader")
  )
};

export default Loader;
