import SignInSide from "../components/Login/SignInSide.tsx";
import {useEffect} from "react";
import {getUserId} from "../API/security.js";
import BoxContent from "../components/Layout/BoxContent.tsx";
import Typography from "@mui/material/Typography";

function Login() {
  useEffect(() => {
    if (getUserId()) {
      window.location.href = "/chat";
      return (<BoxContent variant={"primary"}><Typography>Redirecting...</Typography></BoxContent>)
    }
  },[]);
    return (
        <SignInSide />
    )
}

export default Login
