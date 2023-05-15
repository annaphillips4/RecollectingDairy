import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import './LoginForm.css';

const demo_email = "demo@aa.io";
const demo_password = "password";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/app" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const logInDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(demo_email, demo_password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <main className="main-login-container">
        <section className="row">

          <div className="login-container-left">
            <div className="left-offset">
              <Link className="logo" to="/"></Link>

              <blockquote className="quote">
                <p>“Sometimes I’ll start a task, and I don’t even know when it'll be done. I just hope I finish it along the way.”</p>
                <footer>- Michael Scott</footer>
              </blockquote>

              <div className="login-steve">
              </div>
            </div>
          </div>

          <div className="login-container-right">
            <div className="right-offset">
              <Link id="signup-button" to="/signup">Sign up for free</Link>

              <div className="login-box">
                <h3>Been here before? Welcome back!</h3>

                <form onSubmit={handleSubmit}>
                  <ul>
                    {errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>

                  <div className="form-group">
                    <input className="form-control"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input className="form-control"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                  </div>

                  <button type="submit" className="login-button">Log In</button>

                  <button className="login-button"
                    onClick={logInDemo}
                    >Demo User
                  </button>
                </form>
              </div>

            </div>
          </div>

        </section>
      </main>
    </>
  );
}

export default LoginFormPage;
