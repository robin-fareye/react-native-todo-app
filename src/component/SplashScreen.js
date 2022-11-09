import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    const initialRoute = async () => {
        try {
            const userId = await AsyncStorage.getItem('loginUser')

            if (userId !== null) {
                console.log("returning: Todo");
                setTimeout(() => {
                    navigation.navigate("Todos")
                }, 1000)

            }
            else {
                console.log("returning: Login");
                console.log("returning: Login");
                setTimeout(() => {
                    navigation.navigate("Login")
                }, 1000)

            }
        } catch (e) {
            // error reading value
        }
    }
    useEffect(() => {
        initialRoute()
    },[])

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.welcomeText}>Todo App</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#4b1ea2",
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    welcomeText:{
        fontSize:40,
        color:"#FFFFFF",
        fontFamily: 'monospace'
    }
})
export default SplashScreen