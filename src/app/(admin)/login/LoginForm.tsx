import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginFormData } from "./LoginForm.types";

const LoginForm = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleRedirect = () => {
    router.push("/register");
  };

  const handleChange = (key: string, value: string) => {
    setLoginForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          paddingBottom: 15,
        }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
          }}
        >
          booqloop
        </Stack>
        <Stack
          spacing={5}
          sx={{
            width: {
              xs: "75%",
              sm: "60%",
            },
          }}
        >
          <Stack spacing={0.5}>
            <TextField
              label="Email"
              name="email"
              variant="standard"
              type="search"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <TextField
              label="Mot de passe"
              name="password"
              variant="standard"
              type="search"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "black",
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            Se connecter
          </Button>
          <Stack direction="row" sx={{ justifyContent: "center" }}>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {"Vous n'avez pas encore de compte\u00A0? "}
              <Box
                component="span"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={handleRedirect}
              >
                {"S'inscrire"}
              </Box>
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginForm;
