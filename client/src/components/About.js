import defaultImg from "../images/personDefaultImg.jpg";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  // handle or get about page data via server side
  const callAboutPage = async () => {
    try {
      const response = await fetch("http://localhost:5000/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // json data
      const data = await response.json();
      // console.log(data);
      setUserData(data);

      if (!response.status === 200) {
        const error = new Error(response.err);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  // useEffect hook
  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container">
        <form
          method="GET"
          className="p-5 d-flex flex-column justify-content-between shadow p-3 mb-5 bg-body rounded"
        >
          <div className="row">
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <img src={defaultImg} alt="pic" height="200px" />
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6 className="label-style">{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">
                  RANKINGS <span>1/10</span>
                </p>

                {/* Tab section */}
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2 d-flex justify-content-center align-items-start">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>

          <div className="row">
            {/* left side url */}
            <div className="col-md-4 d-flex flex-column align-items-center">
              <div className="profile-work">
                <p style={{ color: "gray" }}>WORK LINK</p>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <br />
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <br />
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
                <br />
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Figma
                </a>
                <br />
              </div>
            </div>

            {/* right side data toggle */}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>USER ID</label>
                    </div>
                    <div className="col-md-6 label-style">
                      <p>{userData._id}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6 label-style">
                      <p>{userData.name}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6 label-style">
                      <p>{userData.email}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6 label-style">
                      <p>{userData.phone}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6 label-style">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6 label-style">
                      <p>Expert</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6 label-style">
                      <p>15$/hr</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6 label-style">
                      <p>27</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6 label-style">
                      <p>Expert</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6 label-style">
                      <p>6 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
