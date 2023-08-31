import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const backImage = 'path/to/backImage.png'; // Replace with the actual path to your image

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch((err) => Alert.alert('Login error', err.message));
    }
  };

  return (
    <div style={styles.container}>
      <img src={backImage} alt="Background" style={styles.backImage} />
      <div style={styles.whiteSheet} />
      <div style={styles.form}>
        <h1 style={styles.title}>Sign Up</h1>
        <input
          style={styles.input}
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={onHandleSignup}>
          <span style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
            Sign Up
          </span>
        </button>
        <div
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <span
            style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            Don't have an account?{' '}
          </span>
          <button
            onClick={() => navigation.navigate('Login')}
            style={{
              color: '#f57c00',
              fontWeight: '600',
              fontSize: 14,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Log In
          </button>
        </div>
      </div>
      <StatusBar barStyle="light-content" />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'orange',
    alignSelf: 'center',
    paddingBottom: 24,
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    objectFit: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    margin: 'auto',
    width: '60%',
    padding: '20px',
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    border: 'none',
    cursor: 'pointer',
  },
};

