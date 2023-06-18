import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
     console.log(user);
      setLoading(false);
      toast.success("Registration successful. Please login");
      navigate("/login");
  })
  .catch((error) => {
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
    
  });

  };

  return (
    <>
      {loading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>

            <form onSubmit={registerUser}>
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
              <input
                type="password"
                placeholder="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="register" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
