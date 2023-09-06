import { useState } from "react";
import { Box, Typography, TextField, Button, Container, CssBaseline, Link } from "@mui/material"; 
import { signInWithEmailAndPassword } from "firebase/auth"; // Need to change to new auth when ready 
import { auth } from "../config/firebase"; // Need to change to new auth when ready
import backImage from "../assets/backImage.png"; // Need to update this to correct image

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => alert("Login error: " + err.message));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={backImage} alt="Background" style={{ width: "100%", height: 340, objectFit: "cover" }} />
        <div
          style={{
            width: "100%",
            height: "75%",
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
            borderTopLeftRadius: 60,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold", color: "orange", textAlign: "center" }}>
            Log In
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Enter email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Enter password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#f57c00", color: "#fff" }}
              onClick={onHandleLogin}
            >
              Log In
            </Button>
            <Link
              component="button"
              variant="body2"
              onClick={() => history.push("/signup")}
              sx={{ mt: 2, display: 'block', textAlign: 'center', color: '#f57c00', cursor: 'pointer' }}
            >
              Don't have an account? Sign Up
            </Link>
          </Box>
        </div>
      </Box>
    </Container>
  );
}
