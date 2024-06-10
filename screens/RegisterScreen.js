import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !image) {
      Alert.alert(
        "Registration Error",
        "All fields are required"
      );
      return; // Prevent further execution
    }

    const user = {
      name: name,
      email: email,
      password: password,
      image: image
    };

    console.log("Registering user:", user);

    axios.post("http://localhost:3000/register", user) // replace with your local IP address
      .then((response) => {
        console.log("Response:", response.data);
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
      });
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10, alignItems: "center" }}>
      <KeyboardAvoidingView>

        <View style={{ marginTop: 150, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#4A55A2", fontSize: 17, fontWeight: "700" }}>Register</Text>
          <Text style={{ fontSize: 17, fontWeight: "700", marginTop: 15 }}>Register to your Account</Text>
        </View>

        <View style={{ marginTop: 60 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Name</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{ fontSize: 16, borderBottomColor: "black", borderBottomWidth: 1, marginVertical: 10, width: 300 }}
              placeholderTextColor={"grey"} placeholder='Enter Your Name' />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ fontSize: 16, borderBottomColor: "black", borderBottomWidth: 1, marginVertical: 10, width: 300 }}
              placeholderTextColor={"grey"} placeholder='Enter Your Email' />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{ fontSize: 16, borderBottomColor: "black", borderBottomWidth: 1, marginVertical: 10, width: 300 }}
              placeholderTextColor={"grey"} placeholder='Enter Your Password' />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Image</Text>
            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}
              style={{ fontSize: 16, borderBottomColor: "black", borderBottomWidth: 1, marginVertical: 10, width: 300 }}
              placeholderTextColor={"grey"} placeholder='Enter Image URL'
              autoCapitalize='none'
              autoCorrect={false}
              autoCompleteType='off'
              keyboardType='url' />
          </View>
        </View>

        <Pressable onPress={handleRegister} style={{ width: 200, backgroundColor: "#4A55A2", padding: 15, marginTop: 50, marginRight: "auto", marginLeft: "auto", borderRadius: 10 }}>
          <Text style={{ textAlign: "center", fontSize: 17, fontWeight: "bold", color: "white" }}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>Already Have an Account? Sign In</Text>
        </Pressable>

      </KeyboardAvoidingView>
    </View>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({});
