import React from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setLoading(false);
        toast.success("Login successful...");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoading(false);
        toast.error(errorMessage);
      });
  };

  // login with google
  
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
    .then((result) => {
      // const user = result.user;
      toast.success("Login successful...");
      navigate("/");
      setLoading(false);

    }).catch((error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setLoading(false);
        
    });
  };

  return (
    <>
    {loading && <Loader />}
    <section className={` container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Login</h2>

          <form onSubmit={loginUser}>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>

            <div className={styles.links}>
              <Link to="/register">Register</Link>
              <Link to="/reset">Forgot Password</Link>
            </div>

            <p>-- or --</p>
          </form>

          <button onClick={signInWithGoogle} className="--btn --btn-danger --btn-block">
            {" "}
            <FaGoogle color="#fff" /> Login with Google
          </button>
          <span className={styles.register}>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </span>
        </div>
      </Card>
    </section>
    </>
  );
};

export default Login;
