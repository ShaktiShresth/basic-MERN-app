import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
  // we only need dispatch to update value of state using reducer
  // when user gets logged out
  const { dispatch } = useContext(UserContext);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // handle logout function
  const logoutUser = async () => {
    //fetch - post for logout
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        // disptach
        // change payload value when logged out to false
        navigate("/login");
        dispatch({ type: "USER", payload: false });
        enqueueSnackbar("User logged out.", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error logging out!.", { variant: "error" });
      });
  };

  // useEffect hook
  useEffect(() => {
    logoutUser();
    // eslint-disable-next-line
  }, []);

  return <div>Logout</div>;
};

export default Logout;
