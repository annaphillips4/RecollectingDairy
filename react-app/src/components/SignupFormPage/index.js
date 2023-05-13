import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, firstName, lastName, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <main className="main-login-container">
        <section className="row">

          <div className="login-container-left">
            <div className="left-offset">
              <Link className="logo" to="/"></Link>

              <div className="people-row">
                <div className="people-portrait">
                  <div className="portrait-1"></div>
                  <div className="portrait-2"></div>
                  <div className="portrait-3"></div>
                </div>
              </div>

              <h2>Join millions of people getting more organized and productive!</h2>

              <div className="signup-steve">
              </div>
            </div>
          </div>

          <div className="login-container-right">
            <div className="right-offset">
              <Link id="signup-button" to="/login">Log in</Link>

              <div className="signup-box">
                <h3>Sign up for free.</h3>

                <form onSubmit={handleSubmit}>
                  <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul>

                  <div className="form-group">
                    <input className="form-control"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input className="form-control"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      required
                    />
                  </div>

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
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
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

                  <div className="form-group">
                    <input className="form-control"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      required
                    />
                  </div>

                  <button type="submit" className="signup-page-button">Sign Up!</button>
                </form>
              </div>

            </div>
          </div>

        </section>

      </main>
    </>
  );
}

export default SignupFormPage;
