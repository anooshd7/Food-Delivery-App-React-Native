/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Register = ({}) => {
  const navigation = useNavigation();

  // State to hold user input
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Update state on user input change
  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  // Function to handle sign-up
  const handleSignUp = async () => {
    try {
      const response = await fetch('http://192.168.0.105:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Request data:', JSON.stringify(userData));

      if (response.ok) {
        console.log('User registered successfully');
        navigation.navigate('Home');
      } else {
        console.error('Registration failed');
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
            Create Account
          </Text>
          <Text style={{ fontSize: 20, maxWidth: '80%', textAlign: 'center', fontWeight: '600' }}>
            Create an account so you can explore all the Social platform
          </Text>
        </View>
        <View style={{ marginVertical: 30 }}>
          {/* Use AppTextInput and connect to state */}
          <AppTextInput
            placeholder="Name"
            value={userData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
          <AppTextInput
            placeholder="Email"
            value={userData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <AppTextInput
            placeholder="Password"
            secureTextEntry
            value={userData.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />
          {/* You can add a confirm password input field here if needed */}
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSignUp();
          }}
          style={{
            padding: 20,
            marginVertical: 10,
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
            Sign up
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

export default Register;
