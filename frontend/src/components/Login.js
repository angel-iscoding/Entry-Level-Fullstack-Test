import { useForm, Controller } from 'react-hook-form';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useAuth } from './context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../routes';

function Login() {
  const { control, handleSubmit, formState: { errors }, setError } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);

      navigate(ROUTES.PROFILE);
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
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Iniciar sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
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
              Iniciar sesión
            </Button>
          </Box>
        </Paper>
      </Box>
      <p>¿No tienes cuenta? <Link to={ROUTES.REGISTER}>Registrate aquí</Link></p>
    </Container>
  );
}

export default Login;
