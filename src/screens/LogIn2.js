import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Alert } from "react-native"; // Adjust imports for web
import { signInWithEmailAndPassword } from "firebase/auth"; // Check compatibility with web-based Firebase authentication
import { auth } from "../config/firebase"; // Check import compatibility
const backImage = require("../assets/backImage.png");

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <View style={styles.container}>
      <img src={backImage} style={styles.backImage} alt="Background" />
      <View style={styles.whiteSheet} />
      <div style={styles.form}>
        <Text style={styles.title}>Log In</Text>
        <input
          style={styles.input}
          placeholder="Enter email"
          type="email"
          autoCapitalize="none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Enter password"
          type="password"
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={onHandleLogin}>
          <span style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Log In</span>
        </button>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <span style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Don't have an account? </span>
          <button onClick={() => history.push("/signup")} style={{ color: '#f57c00', fontWeight: '600', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}>
            Sign Up
          </button>
        </div>
      </div>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    objectFit: 'cover', // Use objectFit for image resizing
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    margin: 'auto', // Center the form
    width: 300, // Set a reasonable width
    maxWidth: '100%',
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    border: 'none', // Remove border
    cursor: 'pointer', // Add pointer cursor
  },
});
