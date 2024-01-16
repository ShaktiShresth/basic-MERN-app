import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  // we only need dispatch to update value of state using reducer
  // when user gets logged in
  const { dispatch } = useContext(UserContext);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // handle input fields
  const handleInputs = (ev) => {
    setLoginData({ ...loginData, [ev.target.name]: ev.target.value });
  };

  // handle login function
  const loginUser = async (ev) => {
    ev.preventDefault();

    const { email, password } = loginData;

    // check if any fields is empty
    if (!email || !password) {
      enqueueSnackbar(" Please fill in all required fields.", {
        variant: "warning",
      });
      return;
    }

    // fetch - post email & password to the server
    const response = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include", // Include credentials (cookies)
    });
    // json data
    const data = await response.json();

    if (response.status !== 200 || !data) {
      enqueueSnackbar("Invalid credentials!", {
        variant: "error",
      });
    } else {
      // dispatch
      dispatch({ type: "USER", payload: true });
      enqueueSnackbar("Login successful!", {
        variant: "success",
      });
      navigate("/");
    }
  };

  return (
    <>
      <section className="login">
        <div className="container mt-5">
          <div className="login-content">
            <div className="login-form">
              <h2 className="form-title">Login</h2>

              <form
                method="POST"
                className="login-form col-12 col-lg-6"
                id="login-form"
              >
                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      autoComplete="off"
                      placeholder="example@gmail.com"
                      value={loginData.email}
                      onChange={handleInputs}
                    />
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email"></i> &nbsp; Email address
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      autoComplete="off"
                      placeholder="Your password"
                      value={loginData.password}
                      onChange={handleInputs}
                    />
                    <label htmlFor="password">
                      <i className="zmdi zmdi-lock"></i> &nbsp; Password
                    </label>
                  </div>
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                    onClick={loginUser}
                  />
                </div>
              </form>

              <div className="col-12 col-lg-6 text-center">
                <NavLink to="/signup" className="signedup-link">
                  I don't have an account.
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
