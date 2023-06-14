import React from "react";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";
import { Link } from "react-router-dom";

const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {

  const shortenText = (text, n) => {
    
    if(text.length > n){
      const shorten = text.substring(0, n) + "...";
      return shorten;
    }

    return text;
  }


  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to = {`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
       
       <div className={styles.content}>
       
       <div className= {styles.details}>
        
        <p>{`$${price}`}</p>
        <h4>{shortenText(name, 18)}</h4>

       </div>

       {!grid && <p className={styles.desc}>{shortenText(desc, 100)}</p>}
       
        <button className="--btn --btn-danger">Add to Card</button>

       </div>

    </Card>
  );
};

export default ProductItem;
