"use client";

import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";

const HomeLogo = () => {
  const router = useRouter();
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        cursor: "pointer",
        display: {
          xs: "none",
          sm: "block",
        },
      }}
      onClick={() => router.push("/home")}
    >
      {"booqloop"}
    </Stack>
  );
};

export default HomeLogo;
