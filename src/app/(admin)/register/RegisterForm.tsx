import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "./RegisterForm.types";
import { useState } from "react";
import { registerUser } from "@/lib/services/admin/register";

const RegisterForm = () => {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    address: "",
    postalCode: "",
    country: "",
  });
  const [error, setError] = useState<string>();

  if (error !== undefined) {
    console.log("ERROR:", error);
  }

  const handleRedirect = () => {
    router.push("/login");
  };

  const handleChange = (key: string, value: string) => {
    setRegisterForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const response = await registerUser(registerForm);
      setError(undefined);
      localStorage.setItem("access_token", response.access_token);
      router.push("/home");
      console.log("Inscription réussie:", response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
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
          paddingBottom: 6,
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
          <Stack spacing={1}>
            <TextField
              label="Nom d'utilisateur"
              name="username"
              variant="standard"
              type="search"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
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
            <TextField
              label="Adresse"
              name="address"
              variant="standard"
              type="search"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <TextField
              label="Code postal"
              name="postalCode"
              variant="standard"
              type="search"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <TextField
              label="Pays"
              name="country"
              variant="standard"
              type="search"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </Stack>
          <Stack>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "black",
                textTransform: "none",
                borderRadius: "10px",
              }}
              onClick={handleSubmit}
            >
              Créer un compte
            </Button>
            {error && (
              <Alert variant="filled" severity="error" sx={{ marginTop: 1 }}>
                {error}
              </Alert>
            )}
          </Stack>
          <Stack
            spacing={0.5}
            direction="row"
            sx={{ justifyContent: "center" }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {"Vous avez déjà un compte\u00A0? "}
              <Box
                component="span"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={handleRedirect}
              >
                {"Se\u00A0connecter"}
              </Box>
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default RegisterForm;
