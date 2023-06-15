import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import AdminOnlyRoute, { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../../redux/slice/cartSlice";


const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        shop<span>Now</span>.
      </h2>
    </Link>
  </div>
);



const activelink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);

  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  useEffect(() =>{
      dispatch(CALCULATE_TOTAL_QUANTITY())
  }, [])

  const dispatch = useDispatch();

  const fixNavbar = () => {
     if(window.scrollY > 180){
        setScrollPage(true);
     }

     else {
      setScrollPage(false);
     }
  }
  
  window.addEventListener("scroll" , fixNavbar);



  const navigate = useNavigate();

  // monitor current signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.split("@");
          u1[0] = u1[0].charAt(0).toUpperCase() + u1[0].slice(1);

          setDisplayName(u1[0]);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userId: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <header className= {scrollPage ? `${styles.fixed}` : null} >
        <div className={styles.header}>
          {logo}

          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              
              <AdminOnlyLink >
                <Link to= "/admin/home">
              <li>
                <button className="--btn --btn-primary">Admin</button>
              </li>
              </Link>
              </AdminOnlyLink>

              <li>
                <NavLink to="/" className={activelink}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className={activelink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogout>
                <NavLink to="/login" className={activelink}>
                  Login
                </NavLink>
                </ShowOnLogout>
                

                <ShowOnLogin>
                <a href="#Home" style={{color: "#ff7722"}}>
                  <FaUserCircle size={16} />
                  Hi, {displayName}
                </a>
                </ShowOnLogin>
                <ShowOnLogin>
                <NavLink to="/order-history" className={activelink}>
                  My Orders
                </NavLink>
                </ShowOnLogin>

                <ShowOnLogin >
                <NavLink to="/" onClick={logoutUser}>
                  Logout
                </NavLink>
                </ShowOnLogin>
              </span>

              {cart}
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
