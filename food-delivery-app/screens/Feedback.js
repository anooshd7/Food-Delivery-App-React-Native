import React, {useState} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../components/AppTextInput';

const Feedback = () => {
    const navigation = useNavigation();

  // State to hold user input
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    location: '',
    feedback: '',
  });

  // Update state on user input change
  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  // Function to handle sign-up
  const handleFeedback = async () => {
    try {
      const response = await fetch('http://192.168.0.105:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Request data:', JSON.stringify(userData));

      if (response.ok) {
        console.log('User feedback received');
        navigation.navigate('Home');
      } else {
        console.error('User feedback not received');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return(
    <ScrollView>
      <View style={{padding:20}}>
        <View style={{alignItems:'center'}}>
             
                <Text style={{fontSize:30, color:'#1f41bb', marginVertical:30, fontWeight:'bold'}}>
                     Feedback
                </Text>
                <Text style={{fontSize:20, maxWidth:'80%', textAlign:'center', fontWeight:'600'}}>
                 Give us your valuable feedback to help better our app!
                </Text>
          </View>
          <View style={{marginVertical:30}}>
              <AppTextInput 
              placeholder='Name' 
              value={userData.name}
              onChangeText={(text) => handleInputChange('name', text)}/>
              <AppTextInput 
              placeholder='Email' 
              value={userData.email}
              onChangeText={(text) => handleInputChange('email', text)}/>
              <AppTextInput 
              placeholder='Age' 
              value={userData.age}
              onChangeText={(text) => handleInputChange('age', text)}/>
              <AppTextInput 
              placeholder='Location' 
              value={userData.location}
              onChangeText={(text) => handleInputChange('location', text)}/>
              <AppTextInput 
              placeholder='Feedback' 
              value={userData.feedback}
              onChangeText={(text) => handleInputChange('feedback', text)}/>
          </View>
          <TouchableOpacity onPress={() => {
                handleFeedback();
              }}
          style={{
              padding:20,
              marginVertical:10,
              backgroundColor: '#1F41BB',
              borderRadius: 10,
              shadowColor: '#1f41bb',
              shadowOffset: {width: 0, height: 10},
              shadowOpacity: 0.3,
              shadowRadius: 10}}>

                  <Text style={{
                    color:'#fff',
                    textAlign:'center',
                    fontSize:20
                  }}>
                    Submit
                  </Text>

          </TouchableOpacity>
          </View>
          </ScrollView>
    );
}

export default Feedback;