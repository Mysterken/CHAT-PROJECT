import {Box, Typography} from "@mui/material";
import {getUserId} from "../../API/security.js";

export default function MessageBubble({message}) {

  const isMe = message.author === getUserId();

  const bgColor = isMe ? "#1a65da" : "#7f9393";
  const borderRadius = isMe ? "15px 0 15px 15px" : "0 15px 15px 15px";
  const margin = isMe ? "10px 0 0 auto" : "10px auto 0 0";

  return (
    <Box sx={{
      backgroundColor: bgColor,
      padding: "15px",
      borderRadius: borderRadius,
      width: "65%",
      margin: margin
    }}>
      <Typography>
        {message.content}
      </Typography>

      <Typography variant="caption" sx={{color: "#fff", textAlign: "right"}}>
        {/* formatted date*/}
        {new Date(message.date).toLocaleString()}
      </Typography>
    </Box>
  )
}
