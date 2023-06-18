import ResetImg from "../../assets/forgot.png";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        toast.success("Password reset link sent to your email");
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <>
    {loading && <Loader />}
      <section className={` container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={ResetImg} alt="Reset Password" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>

            <form onSubmit={resetPassword}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Reset Password
              </button>

              <div className={styles.links}>
                <p>
                  <Link to="/login">Login</Link>
                </p>
                <p>
                  <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
