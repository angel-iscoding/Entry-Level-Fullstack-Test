import { Container, Box, Button, Typography } from '@mui/material';
import { useAuth } from './context/AuthContext';
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Profile()  {

  const { user, logout } = useAuth();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
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
        <Typography component="h1" variant="h3" gutterBottom>
          Hola {user.name} {user.lastName}
        </Typography>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
        >
          Actualizar perfil
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                placeholder={user.email}
              />
            </form>
            <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Nombre"
                type="text"
                fullWidth
                variant="standard"
                placeholder={user.name}
              />
            </form>
            <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
                autoFocus
                required
                margin="dense"
                id="phone"
                name="phone"
                label="Numero"
                type="number"
                fullWidth
                variant="standard"
                placeholder={user.phone}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" form="subscription-form">
              Actualizar
            </Button>
          </DialogActions>
        </Dialog>
        <Button onClick={logout} variant="outlined" size="large" sx={{ mt: 2 }}>
          Cerrar sesión
        </Button>
      </Box>
    </Container>
  );
}

export default Profile;
