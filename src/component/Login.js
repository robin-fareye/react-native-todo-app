import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'

const Login = ({ navigation }) => {

    const [signInMode, setSignInMode] = useState(true)
    const [showPassword, setShowPassword] = useState(true)
    const cred = {
        email: "sample@email.com",
        password: "Sample@123"
    }

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSwitchMode = () => {
        setSignInMode((prevState) => {
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

    // const login = async() => {

    //     console.log("i am here");
    //     //const cred={username:email,password:password}
    //     const cred=`username=${email}&password=${password}`
    //     try{
    //         let res=await fetch("http://10.0.2.2:8080/login",{
    //          method: 'POST',
    //         headers: {
    //             "content-type": "application/x-www-form-urlencoded"
    //           },
    //         body:cred 
    //     })
    //     const json = await res.json()
    //     console.log(json?.id);
    //     if(json?.id!==null){
    //         console.log("logged in");
    //         navigation.navigate("Todos")
    //     }
    //     else{
    //         ToastAndroid.show("Login Failed", ToastAndroid.SHORT)
    //     }
    //     }
    //     catch{
    //         console.log("something went wrong");
    //         ToastAndroid.show("Login Failed", ToastAndroid.SHORT)
    //     }

        
    // }

    const validatePassword = () => {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);

    }
    const validate = () => {
        if (!validateEmail()) {
            ToastAndroid.show("Email format is not correct", ToastAndroid.SHORT)
            return false
        }
        if (!validatePassword()) {
            ToastAndroid.show("Password format is not correct", ToastAndroid.SHORT)
            return false
        }
        return true
    }
    const handleSignIn = () => {
        //login()
        navigation.navigate('Todos')
        // if (validate()) {
            
        //     if (email === cred.email && password === cred.password) {
        //         ToastAndroid.show("You are logged in", ToastAndroid.SHORT)
        //         navigation.navigate('Todos')
        //     }
        //     else {
        //         ToastAndroid.show("Invalid Credentials", ToastAndroid.SHORT)
        //     }
        // }
    }
    const handleShowPassword = () => {
        setShowPassword((prevState) => {
            return !prevState
        })
    }

    const handleSignUp = () => {
        console.log(name, " : ", email, " : ", password);
    }

    return (
        <>
            <View style={styles.maineContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Todo App</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.loginText}>{signInMode ? "Sign In" : "Sign Up"}</Text>
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
                    <View style={styles.passwordInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            name="password"
                            secureTextEntry={showPassword}
                            value={password}
                            onChangeText={newText => setPassword(newText)}
                        />
                        <TouchableOpacity
                            style={styles.wrapperIcon}
                            onPress={handleShowPassword}>
                            <Image
                                source={
                                    showPassword
                                        ? require('../assets/show.png')
                                        : require('../assets/hide.png')
                                }
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={signInMode ? handleSignIn : handleSignUp}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{signInMode ? "Log In" : "Sign Up"}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.signUpSection}>
                        <Text>
                            {signInMode ? "Don't have an Account?" : "Already have an Account?"}
                        </Text>
                        <TouchableOpacity onPress={handleSwitchMode} >
                            <Text style={styles.signUpText}>
                                {signInMode ? "Sign Up" : "Log In"}
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
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: "#000000",
    },
    button: {

        backgroundColor: "#8E0082",
        height: 40,
        borderRadius: 10,
        alignContent: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 10,
    },
    buttonText: {
        fontWeight: "500",
        fontSize: 18,
        color: "#FFFFFF",
        paddingLeft: 130,
        paddingRight: 130,

    },
    signUpSection: {
        flex: 1,
        flexDirection: "row",
    },
    signUpText: {
        color: "#8E0082",
        marginLeft: 5,
    },
    logo: {

    },
    wrapperIcon: {
        position: "absolute",
        right: 0,
        padding: 10,
    },

    icon: {
        width: 25,
        height: 20,
    },
    passwordInput: {
        width: "97%"
    }
});
export default Login