import BoxContent from "./BoxContent";
import { Button, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeIcon from "@mui/icons-material/Home";

function PageWIP({ name }: { name: string }) {
  return (
    <BoxContent
      variant="primary"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography textAlign="center">
        <Typography
          fontSize={48}
          textAlign="center"
          variant="h1"
          color="classicText"
        >
          {name}
        </Typography>
      </Typography>
      <Typography
        fontSize={14}
        textAlign="center"
        variant="subtitle1"
        color="grey"
      >
        You are lost, this page is non-existent or under construction.
      </Typography>
      <ConstructionIcon sx={{ width: "250px", height: "250px", m: "50px" }} />
      <Button
        // color="classicButton"
        variant="contained"
        size="large"
        endIcon={<HomeIcon />}
        href="/"
        sx={{ px: "25px" }}
      >
        Home
      </Button>
    </BoxContent>
  );
}

export default PageWIP;
