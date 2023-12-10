import { Box, SxProps } from "@mui/material";

function BoxContent({
  variant,
  flex = true,
  children,
  props,
  sx,
}: {
  variant: "primary" | "secondary" | "other";
  flex?: boolean;
  children?: JSX.Element | JSX.Element[];
  props?: object;
  sx?: SxProps;
}): JSX.Element {
  const bgColor =
    variant === "primary"
      ? "#1E1E1E"
      : variant === "secondary"
      ? "#282828"
      : "";
  const displayType: SxProps = flex
    ? { display: "flex", flexDirection: "column" }
    : {};

  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        padding: {
          mobile: "20px",
          tablet: "20px 30px",
          desktop: "20px 50px",
        },
        ...displayType,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default BoxContent;
