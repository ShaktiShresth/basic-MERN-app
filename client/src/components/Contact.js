import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

const Contact = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loggedInState, setLoggedInState] = useState(false);

  // handle/render user data
  const renderUserData = async () => {
    try {
      const response = await fetch(
        "https://basic-mern-app-server.vercel.app/getdata",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      // we don't need all details that we get from the response
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      setLoggedInState(true);
      if (!response.status === 200) {
        const error = new Error(response.err);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook
  useEffect(() => {
    renderUserData();
    // eslint-disable-next-line
  }, []);

  // handle input fields function
  const handleContactInputs = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // send data to backend
  const contactForm = async (ev) => {
    // prevent default browser reloading
    ev.preventDefault();

    const { name, email, phone, message } = userData;

    // check if any fields is empty
    if (!name || !email || !phone || !message) {
      enqueueSnackbar("Please fill in all the fields..", {
        variant: "warning",
      });
      return;
    }

    // fetch - post contact data(name, email, phone, message) to server side
    const response = await fetch(
      "https://basic-mern-app-server.vercel.app/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      }
    );
    // json data
    const data = await response.json();
    // console.log(data);

    if (!data) {
      enqueueSnackbar("Message not sent!", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Message sent successfully.", { variant: "success" });
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div className="contact-info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              {/* phone */}
              <div className="contact-info-item shadow p-3 mb-5 bg-body rounded">
                <div className="contact-info-content">
                  <div className="contact-info-title">
                    <i className="zmdi zmdi-phone"></i> &nbsp; Phone
                  </div>
                  <div className="contact-info-title">
                    +977 {loggedInState ? userData.phone : "0123456789"}
                  </div>
                </div>
              </div>
              {/* Email */}
              <div className="contact-info-item shadow p-3 mb-5 bg-body rounded">
                <div className="contact-info-content">
                  <div className="contact-info-title">
                    <i className="zmdi zmdi-email"></i> &nbsp; Email
                  </div>
                  <div className="contact-info-title">
                    {loggedInState ? userData.email : "example@gmail.com"}
                  </div>
                </div>
              </div>
              {/* Address */}
              <div className="contact-info-item shadow p-3 mb-5 bg-body rounded">
                <div className="contact-info-content">
                  <div className="contact-info-title">
                    <i className="zmdi zmdi-account-box"></i> &nbsp; Address
                  </div>
                  <div className="contact-info-title">
                    {" "}
                    {loggedInState
                      ? userData.address
                        ? userData.address
                        : "KTM"
                      : "eg: Kathmandu"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact us form */}
      <div className="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact-form-container py-5">
                <div className="contact-form-title">Get in Touch</div>
                <form id="contact-form" method="POST" onSubmit={contactForm}>
                  <div className="contact-form-name d-flex justify-content-between align-items-center">
                    <input
                      type="text"
                      id="contact-form-name"
                      className="contact-form-name input-field"
                      placeholder="Your name"
                      required={true}
                      name="name"
                      value={userData.name}
                      onChange={handleContactInputs}
                    />

                    <input
                      type="email"
                      id="contact-form-email"
                      className="contact-form-email input-field"
                      placeholder="Your email"
                      required={true}
                      name="email"
                      value={userData.email}
                      onChange={handleContactInputs}
                    />

                    <input
                      type="number"
                      id="contact-form-phone"
                      className="contact-form-phone input-field"
                      placeholder="Your phone no."
                      required={true}
                      name="phone"
                      value={userData.phone}
                      onChange={handleContactInputs}
                    />
                  </div>

                  <div className="contact-form-text mt-4">
                    <textarea
                      className="text-field contact-form-message"
                      placeholder="Message..."
                      cols="30"
                      rows="10"
                      name="message"
                      value={userData.message}
                      onChange={handleContactInputs}
                    ></textarea>
                  </div>

                  <div className="mt-2">
                    <button
                      type="submit"
                      className="button form-submit"
                      // onClick={contactForm}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
