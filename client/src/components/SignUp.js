import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { useSnackbar } from "notistack";

const SignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  // handle input fields function
  const handleInputs = (ev) => {
    setUser({ ...user, [ev.target.name]: ev.target.value });
  };

  // handle register function
  const PostUserData = async (ev) => {
    ev.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    // check if any field is empty
    if (!name || !email || !phone || !work || !password || !cpassword) {
      enqueueSnackbar(" Please fill in all the fields", {
        variant: "warning",
      });
      return;
    }

    // fetch - post (name,email,phone,work,password,cpassword) to server side
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    // json data
    const data = await response.json();

    if (response.status === 422 || !data) {
      enqueueSnackbar(" Invalid registration. Try again!", {
        variant: "error",
      });
      // console.log("invalid registration");
    } else {
      enqueueSnackbar("Registration successful!", {
        variant: "success",
      });
      // console.log("valid registration");
      navigate("/login");
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>

              <form
                method="POST"
                className="register-form col-12 col-lg-6"
                id="register-form"
              >
                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      autoComplete="off"
                      placeholder="example: John Doe"
                      value={user.name}
                      onChange={handleInputs}
                    />
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account"></i> &nbsp; Name
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      autoComplete="off"
                      placeholder="example@gmail.com"
                      value={user.email}
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
                      type="number"
                      className="form-control"
                      name="phone"
                      id="phone"
                      autoComplete="off"
                      placeholder="example: 0123456789"
                      value={user.phone}
                      onChange={handleInputs}
                    />
                    <label htmlFor="phone">
                      <i className="zmdi zmdi-phone"></i> &nbsp; Phone No.
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="work"
                      id="work"
                      autoComplete="off"
                      placeholder="example: Web dev"
                      value={user.work}
                      onChange={handleInputs}
                    />
                    <label htmlFor="work">
                      <i className="zmdi zmdi-phone"></i> &nbsp; Profession
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
                      value={user.password}
                      onChange={handleInputs}
                    />
                    <label htmlFor="password">
                      <i className="zmdi zmdi-lock"></i> &nbsp; Password
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="cpassword"
                      id="cpassword"
                      autoComplete="off"
                      placeholder="Confirm password"
                      value={user.cpassword}
                      onChange={handleInputs}
                    />
                    <label htmlFor="cpassword">
                      <i className="zmdi zmdi-lock"></i> &nbsp; Confirm Password
                    </label>
                  </div>
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                    onClick={PostUserData}
                  />
                </div>
              </form>

              <div className="col-12 col-lg-6 text-center">
                <NavLink to="/login" className="signedup-link">
                  I am already registered.
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
