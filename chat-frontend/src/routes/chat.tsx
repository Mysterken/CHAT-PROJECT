import MiniDrawer from "../components/Layout/MiniDrawer.tsx";
import {getUserId} from "../API/security.js";
import {useEffect} from "react";
import {Typography} from "@mui/material";
import BoxContent from "../components/Layout/BoxContent.tsx";

function Chat() {

  useEffect(() => {
    const userId = getUserId();

    if (!userId) {
      window.location.href = "/login"
      return (<Typography>Redirecting...</Typography>)
    }
  }, []);

  return (
    <BoxContent variant={"primary"}>
      <MiniDrawer/>
    </BoxContent>
  )
}

export default Chat
