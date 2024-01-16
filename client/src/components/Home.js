import { UserContext } from "../App";
import "../App.css";
import { useContext, useEffect, useState } from "react";

const Home = () => {
  // we only need state value here
  const { state } = useContext(UserContext);
  const [userName, setUserName] = useState("");

  // handle/render user data function
  const renderUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // json data
      const data = await response.json();
      // console.log(data);
      setUserName(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook
  useEffect(() => {
    renderUserData();
  }, []);

  return (
    <div
      className="position-relative d-flex flex-column justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div className="z-1 d-flex flex-column justify-content-center align-items-center">
        <p className={`${state === false && "fst-italic"}`}>WELCOME !</p>
        <h1 className={`home-username-font ${!state && "hidden"}`}>
          {userName}
        </h1>
        <h3 className={`p-3 ${state && "fst-italic"}`}>
          {state ? "Happy to see you back." : "We Are The MERN Developers"}
        </h3>
      </div>

      <div className="home-background-div col-6"></div>
    </div>
  );
};

export default Home;
