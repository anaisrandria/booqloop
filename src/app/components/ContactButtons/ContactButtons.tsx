import { Button, Stack } from "@mui/material";
import { ContactButtonsProps } from "./ContactButtons.types";

const ContactButtons = ({ isMobile }: ContactButtonsProps) => {
  return (
    <Stack
      direction={isMobile ? "row" : "column"}
      gap={2}
      paddingX={isMobile ? 3 : 0}
      sx={{
        position: isMobile ? "fixed" : "relative",
        bottom: isMobile ? 0 : "auto",
        left: isMobile ? 0 : "auto",
        height: isMobile ? "8vh" : "auto",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#f7f2ec",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "black",
          textTransform: "none",
          borderRadius: "10px",
          width: "100%",
          flex: 1,
        }}
      >
        Message
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "black",
          textTransform: "none",
          borderRadius: "10px",
          width: "100%",
          flex: 1,
        }}
      >
        Réserver
      </Button>
    </Stack>
  );
};

export default ContactButtons;
