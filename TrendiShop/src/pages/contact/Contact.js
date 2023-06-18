import React, { useRef } from 'react';
import styles from "./Contact.module.scss";
import Card from "../../components/card/Card";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Contact = () => {
  const form = useRef();

 const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs.sendForm('service_05aki1a', 'template_q3d8qpp', form.current, 'tVG8h6CFfwUj1UgH5')
      .then((result) => {
          toast.success("Message Sent Successfully");
      }
      , (error) => {
          toast.error(error.text);
      }
      );

    e.target.reset();

  };
  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>

        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="use_name"
                placeholder="Enter your name"
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />

              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />

              <label>Message</label>
              <textarea
                name="message"
                placeholder="Your message"
                cols="30"
                rows="10"
                required
              ></textarea>

              <input
                type="submit"
                value="Send Message"
                className="--btn --btn-primary"
              />
            </Card>
          </form>

          <div className={styles.details}></div>

          <Card cardClass={styles.card2}>
            <h3>Our Contact Information</h3>

            <p>Fill the form or contact us via other channels listed below</p>

            <div className={styles.icons}>
              <span>
                <FaPhoneAlt />
                <p>+91 94XXXXXX26</p>
              </span>

              <span>
                <FaEnvelope />
                <p>Support@shopNow.com</p>
              </span>

              <span>
                <GoLocation color="white" />
                <p>Ayodhya , Uttar Pradesh, IN</p>
              </span>

              <Link to="https://twitter.com/rawat_abhi33" target="_blank">
                <span>
                  <FaTwitter color="white" />
                  <p>@rawat_abhi33</p>
                </span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
