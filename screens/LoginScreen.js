import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View,Alert } from 'react-native'
import {React,useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigation=useNavigation();

  // useEffect(()=>{
  //       checkLoginStatus=async() =>{

  //         try{

  //           const token=await AsyncStorage.getItem("authToken");
  
  //           if(token){
  //             navigation.navigate("Home");
  //           }else{
              
  //           }
  //         }catch(error){
  //           console.log("error",error)
  //         }
  //       }
  // },[])
  const handleLogin=()=>{
    const user={
      email:email,
      password:password
    };

    axios.post("https://messenger-project-q3g0.onrender.com/login", user).then((response)=>{
     
       console.log(response);
       const token = response.data.token;

       AsyncStorage.setItem("authToken",token);

       navigation.navigate("Home");
    }).catch((error)=>{
      Alert.alert("Loginn error","Invalid email or password");
      console.log("Login Error",error);
    })
  }

  
  return (
    <View style={{flex:1,backgroundColor:"white",padding:10,alignItems:"center"}}>
      <KeyboardAvoidingView>

        <View style={{marginTop:170,alignItems:"center",justifyContent:"center"}}>
          <Text style={{color:"#4A55A2",fontSize:17,fontWeight:"700"}}>Sign In </Text>

          <Text style={{fontSize:17,fontWeight:"700",marginTop:15}}>Sign In to your Account</Text>
        </View>

        <View style={{marginTop:60}}>
          <View>
            <Text style={{fontSize:18,fontWeight:400}}>Email</Text>
            <TextInput 
            value={email}
            onChangeText={(text)=>setEmail(text)}
            style={{fontSize:email ? 16 :16,borderBottomColor:"black",borderBottomWidth:1,marginVertical:10,width:300}}
            placeholderTextColor={"grey"} placeholder='Enter Your Email'/>
          </View>
        </View>

        <View style={{marginTop:20}}>
          <View>
            <Text style={{fontSize:18,fontWeight:400}}>Password</Text>
            <TextInput 
            value={password}
            onChangeText={(text)=>setPassword(text)}
            secureTextEntry={true}
            style={{fontSize:password ? 16 :16,borderBottomColor:"black",borderBottomWidth:1,
              marginVertical:10}}
            placeholderTextColor={"grey"} placeholder='Enter Your Password'/>
          </View>
        </View>

        <Pressable onPress={handleLogin}  style={{width:200,backgroundColor:"#4A55A2",padding:15,marginTop:50,marginRight:"auto",marginLeft:"auto",borderRadius:10}}>
          <Text style={{textAlign:"center",fontSize:17,fontweight:"bold",color:"white"}}>Login</Text>
        </Pressable>


        <Pressable onPress={()=>navigation.navigate("Register")} style={{marginTop:20}}>
          <Text style={{textAlign:"center",color:"grey",fontSize:16}}>Don't Have an Account? Sign Up</Text>
        </Pressable>

        
      </KeyboardAvoidingView>

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})