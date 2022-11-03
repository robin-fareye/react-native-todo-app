import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput,TouchableOpacity, ToastAndroid } from 'react-native'

const Login = () => {

    const [signInMode,setSignInMode]=useState(true)

    const cred={
        email:"sample@email.com",
        password:"sample"
    }

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSwitchMode=()=>{
        setSignInMode((prevState)=>{
            setEmail("")
            setName("")
            setPassword("")
            return !prevState
        })
    }
    const validateEmail = () => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      }

    const validatePassword=()=>{
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
        
    }
    const validate=()=>{
        if(!validateEmail()){
            ToastAndroid.show("Email format is not correct",ToastAndroid.SHORT)
            return false
        }
        if(!validatePassword()){
            ToastAndroid.show("Password format is not correct",ToastAndroid.SHORT)
            return false
        }
        return true
    }
    const handleSignIn=()=>{
        if(validate()){
            if(email===cred.email && password===cred.password){
                ToastAndroid.show("You are logged in",ToastAndroid.SHORT)
            }
            else{
                ToastAndroid.show("Invalid Credentials",ToastAndroid.SHORT)
            }
        }
    }

    const handleSignUp=()=>{
        console.log(name," : ",email," : ",password);
    }

    return (
        <>
            <View style={styles.maineContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Todo App</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.loginText}>{signInMode?"Sign In":"Sign Up"}</Text>
                    {!signInMode && <TextInput
                        style={styles.input}
                        placeholder={"Enter Your Name"}
                        value={name}
                        onChangeText={newText => setName(newText)}

                    />}
                    <TextInput
                        style={styles.input}
                        placeholder="Your Email"
                        value={email}
                        onChangeText={newText => setEmail(newText)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        name="password"
                        secureTextEntry
                        value={password}
                        onChangeText={newText => setPassword(newText)}
                    >
                        
                            
                    </TextInput>
                    <Image
                            style={styles.logo}
                            source={require('/home/robin/Documents/training-projects/React Native/todoMobileApp/src/assets/hide.png')}
                        />
                    <TouchableOpacity onPress={signInMode?handleSignIn:handleSignUp}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{signInMode?"Log In":"Sign Up"}</Text>
                        </View>
                    </TouchableOpacity>
                   <View style={styles.signUpSection}>
                    <Text>
                            {signInMode?"Don't have an Account?":"Already have an Account?"}
                        </Text>
                        <TouchableOpacity onPress={handleSwitchMode} >
                            <Text style={styles.signUpText}>
                                {signInMode?"Sign Up":"Log In"}
                            </Text>
                        </TouchableOpacity>
                   </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    maineContainer: {
        // flex: 1,
    },
    headerContainer: {
        height: "20%",
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    headerText: {
        fontWeight: '900',
        fontSize: 30,
        lineHeight: 30,
    },
    bodyContainer: {
        //flex: 2,
        height: "80%",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        flexDirection: 'column',
        padding: 5,
    },
    loginText: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 20,

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '90%',
    },
    button:{
        
        backgroundColor:"#8E0082",
        height:40,
        borderRadius:10,
        alignContent:"center",
        justifyContent:"center",
        marginBottom:10,
        marginTop:10,
    },
    buttonText:{
        fontWeight:"500",
        fontSize:18,
        color:"#FFFFFF",
        paddingLeft:130,
        paddingRight:130,
        
    },
    signUpSection:{
        flex:1,
        flexDirection:"row",
    },
    signUpText:{
        color:"#8E0082",
        marginLeft:5,
    },
    logo:{

    }
});
export default Login