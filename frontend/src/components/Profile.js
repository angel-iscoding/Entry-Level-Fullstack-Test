import { Container, Box, Button, Typography } from '@mui/material';
import { useAuth } from './context/AuthContext';


function Profile()  {

  const { user, logout } = useAuth();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h3" gutterBottom>
          Hola {user.email}
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
        >
          Actualizar perfil
        </Button>
        <Button
          onClick={logout}
          variant="outlined"
          size="large"
          sx={{ mt: 2 }}
        >
          Cerrar sesión
        </Button>
      </Box>
    </Container>
  );
}

export default Profile;
