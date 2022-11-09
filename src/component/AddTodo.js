import { React, useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import {postTodo}from "../database/Realm"
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
const AddTodo = () => {
    const nav =useNavigation()

    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [dateString,setDateString]=useState("")
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")

    const handleSelectDate = () => {
        setShowDatePicker(true)
    }
    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false)
        const offset = selectedDate.getTimezoneOffset()
        selectedDate = new Date(selectedDate.getTime() - (offset * 60 * 1000))
        const myDate=selectedDate.toISOString().split('T')[0]
        setDate(selectedDate)
        setDateString(myDate)

    }
    const onCancel=()=>{
        nav.navigate("Todos")
    }
    
    const onSave=()=>{
        postTodo(title,description,dateString)
      
        nav.navigate({
            name: 'Todos',
            params: { title: title, description:description,dueDate:dateString },
            merge: true,})
    }
    return (
        <View style={styles.mainContainer} >
            <View style={styles.addTodoCard}>
                <TextInput style={styles.inputField}
                    placeholder='Title'
                    onChangeText={newText=>setTitle(newText)}
                />
                <TextInput style={styles.inputField}
                    placeholder='Description'
                    onChangeText={newText=>setDescription(newText)}
                />
                <View style={styles.datePicker}>
                    <TextInput style={[styles.inputField, styles.dateInput]}
                        placeholder='YYYY/MM/DD'
                        value={dateString}
                        onChangeText={(newText)=>setDateString(newText)}
                    />
                    <TouchableOpacity onPress={handleSelectDate} style={styles.dateIcon}>
                        <Image source={require("../assets/date.png")} />
                    </TouchableOpacity>
                </View>
                {showDatePicker && <DateTimePicker
                    mode='date'
                    minimumDate={moment().toDate()}
                    onChange={onDateChange}
                    value={date}
                />}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onCancel}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onSave}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        backgroundColor: "#eeeef2",
        flex: 1,
        padding: 10,
        alignContent: "center",
        justifyContent: "center"
    },
    addTodoCard: {
        backgroundColor: "#FFFFFF",
        flex: 0.5,
        borderRadius: 10,
        padding: 10,
    },
    inputField: {
        //borderWidth:1,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
    },
    datePicker: {
        //flex:1,
        flexDirection: "row"
    },
    dateInput: {
        flex: 1,
    },
    dateIcon: {
        //flex:0.01,
        height: 20,
        width: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer:{
        //flex:1,
        flexDirection:"row",
        justifyContent:"space-around",

        alignItems:"center",
        borderRadius:20,
        marginTop:20
    },
    actionButton:{
        
        backgroundColor:"#4b1ea2",
        height:30,
        width:150,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10
       
    },
    actionButtonText:{
        color:"#FFFFFF",
        fontSize:19,
        fontWeight:"600"
    }
})
export default AddTodo