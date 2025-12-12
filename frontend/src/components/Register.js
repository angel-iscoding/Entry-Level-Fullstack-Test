import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { ROUTES } from "../routes";

function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [alertMessage, setAlertMessage] = useState("");
  const { register } = useAuth();

  const onSubmit = async (data) => {
    try {
      await register(
        data.name, 
        data.lastName,
        data.email,
        data.phone,
        data.password
      );
      setAlertMessage("Usuario registrado con exito!")
    } catch (error) {
      console.log(error);

      setError("password", {
        type: "manual",
        message: "Credenciales inválidas",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p><Link to={ROUTES.HOME}>Volver</Link></p>
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Registrarse
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "El nombre es requerido",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Nombre"
                  type="text"
                  autoComplete="text"
                  autoFocus
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{
                required: "Es requerido almenos un apellido",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Apellidos"
                  type="text"
                  autoComplete="text"
                  autoFocus
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "El correo electrónico es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Dirección de correo electrónico inválida",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Correo electrónico"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: "Se requiere un numero de telefono valido",
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: "Numero de telefono no valido",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Numero de telefono"
                  type="tel"
                  autoComplete="tel"
                  autoFocus
                  error={!!errors.tel}
                  helperText={errors.tel?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "La contraseña es requerida",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Contraseña"
                  type="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrate
            </Button>
          </Box>
        </Paper>
      </Box>
      {alertMessage && <Alert severity="success">{alertMessage} <Link to={ROUTES.HOME}>Volver a la pagina de registro.</Link></Alert>}
    </Container>
  );
}

export default Register;
