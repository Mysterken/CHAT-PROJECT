import SignUp from "../components/Register/SignUp.jsx";
import {useEffect} from "react";
import {getUserId} from "../API/security.js";
import BoxContent from "../components/Layout/BoxContent.tsx";
import Typography from "@mui/material/Typography";

function Register() {
  useEffect(() => {
    if (getUserId()) {
      window.location.href = "/chat";
      return (<BoxContent variant={"primary"}><Typography>Redirecting...</Typography></BoxContent>)
    }
  },[]);
    return (
        <SignUp />
    )
}

export default Register
