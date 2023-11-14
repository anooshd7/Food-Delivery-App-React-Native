/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  // State to hold user input
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Update state on user input change
  const handleInputChange = (field, value) => {
    setLoginData({ ...loginData, [field]: value });
  };

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.105:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      console.log('Request data:', JSON.stringify(loginData));

      if (response.ok) {
        console.log('Login successful');
        navigation.navigate('Home');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: '#1f41bb', marginVertical: 30, fontWeight: 'bold' }}>
            Login Here
          </Text>
          <Text style={{ fontSize: 24, maxWidth: '60%', textAlign: 'center', fontWeight: '600' }}>
            Welcome back, you've been missed!
          </Text>
        </View>
        <View style={{ marginVertical: 30 }}>
          {/* Use AppTextInput and connect to state */}
          <AppTextInput
            placeholder="Email"
            value={loginData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <AppTextInput
            placeholder="Password"
            secureTextEntry
            value={loginData.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
          style={{
            padding: 20,
            marginVertical: 30,
            backgroundColor: '#1F41BB',
            borderRadius: 10,
            shadowColor: '#1f41bb',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Text style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 20,
          }}>
            Sign in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log('login');
            navigation.navigate('Register');
          }}
          style={{
            padding: 10,
          }}
        >
          <Text style={{
            color: '#000',
            textAlign: 'center',
            fontSize: 14,
          }}>
            Create new account
          </Text>
        </TouchableOpacity>

        <View style={{ marginVertical: 30 }}>
          <Text style={{ color: '#1f41bb', textAlign: 'center', fontSize: 14 }}>
            or continue with
          </Text>
          <View style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#ddd', borderRadius: 5, marginHorizontal: 10 }}>
              <Ionicons name="logo-google" color="#000" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#ddd', borderRadius: 5, marginHorizontal: 10 }}>
              <Ionicons name="logo-apple" color="#000" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#ddd', borderRadius: 5, marginHorizontal: 10 }}>
              <Ionicons name="logo-twitter" color="#000" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#ddd', borderRadius: 5, marginHorizontal: 10 }}>
              <Ionicons name="logo-facebook" color="#000" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
