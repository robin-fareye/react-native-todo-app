import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Button, Pressable, Alert,FlatList, Image,ToastAndroid } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllTodo,updateTask } from '../database/Realm';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BackHandler } from 'react-native';
const Todos = ({ navigation, route }) => {

  //const nav=useNavigation()
  const [pendingTodos, setPendingTodos] = useState([])

  useEffect(() => {
    
    allTodos()
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  }, [])

  useEffect(() => {

    if (route.params?.title && route.params?.title !== "") {
      setPendingTodos((prevState) => {
        return ([...prevState, { title: route.params?.title ,description:route.params?.description,dueDate:route?.params?.dueDate}])
      })
    } 
  }, [route.params?.title])

  const handleBackButtonClick=()=>{
    //navigation.dispatch(StackActions.pop(1))
    BackHandler.exitApp()
  }
  const allTodos=()=>{
    let res=getAllTodo()
    let pendingList=res.filter((item)=>{
      return item.description==="pending"
    })
    let doneList=res.filter((item)=>{
      return item.description==="done"
    })
    setPendingTodos(pendingList)
    setCompletedTodos(doneList)
  }
 

  
  const [isTodoList, setIsTodoList] = useState(true)

 
  const [completedTodos, setCompletedTodos] = useState([])

  const onPressTodo = () => {
    setIsTodoList(true)
  }
  const onPressDone = () => {

    AsyncStorage.removeItem('loginUser');
    setIsTodoList(false)
  }
  const handleAddTodo = () => {
    navigation.navigate("AddTodo")
  }

  const handleTodoDone=(todo)=>{
    updateTask(todo)
    allTodos()
    ToastAndroid.show("Marked As Done", ToastAndroid.SHORT)
  }
  const renderListItem = (todo) => {
    return (
      <TouchableOpacity onLongPress={()=>handleTodoDone(todo)}>
        <View style={styles.listItemContainer}>
          <View style={[styles.listRibbon, { backgroundColor: isTodoList ? "#4b1ea2" : "#228B22" }]}></View>
          <View style={styles.listIcon}>
            <Image style={styles.icon} source={require("../assets/todo.png")} />
          </View>
          <View style={styles.todoTitle}>
            <Text style={styles.titleText}>{todo?.title}</Text>
          </View>
        </View>
      </TouchableOpacity>

    )
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.todoText}>To Do List</Text>
      <View style={styles.listContainer}>
        <View style={styles.navigationController}>
          <Pressable onPress={onPressTodo}>
            <Text style={[styles.actionButtonText, { color: isTodoList ? "#4b1ea2" : "#cdcbcd" }]}>To Do</Text>
          </Pressable>
          <Pressable onPress={onPressDone}>
            <Text style={[styles.actionButtonText, { color: !isTodoList ? "#4b1ea2" : "#cdcbcd" }]}>Done</Text>
          </Pressable>
        </View>

        <FlatList style={styles.list}
        ListEmptyComponent={<Text>No Pending Todos</Text>}
          data={isTodoList ? pendingTodos : completedTodos}
          renderItem={(item) => {
            return (renderListItem(item?.item))
          }}
        />

        <TouchableOpacity onPress={handleAddTodo}>
          <View style={styles.addButton}>
            <Text style={styles.addIcon}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#4c1aa5",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "center"
  },
  listContainer: {
    backgroundColor: "#eeeef2",
    flex: 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    position: "relative",
    padding: 10

  },
  navigationController: {
    backgroundColor: "#fffeff",
    height: 70,
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 20,
    width: "80%",
    top: -40,
    position: "absolute",
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 4,
    shadowRadius: 20,
    shadowOpacity: 1.0

  },
  actionButtonText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#cdcbcd"
  },
  listItemContainer: {
    height: 80,
    backgroundColor: "#fffeff",
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 5,


  },
  listRibbon: {
    width: "2%",
    backgroundColor: "#cdcbcd",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    //elevation:4,

  },
  listIcon: {
    width: "25%",
    backgroundColor: "#fcf5fd",
    alignItems: "center",
    justifyContent: "center"
    //elevation: 4,
  },
  todoTitle: {
    width: "73%",
    backgroundColor: "#fffeff",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    //elevation: 4,
  },
  icon: {
    height: 35,
    width: 35
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: "#000000"
  },
  addButton: {
    height: 60,
    width: 60,
    position: "absolute",
    left: 120,
    bottom: 10,
    backgroundColor: "#4b1ea2",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  addIcon: {
    fontSize: 32,
    color: "#FFFFFF"
  },
  todoListContainer: {
    position: "absolute",
    top: 60,

  },
  todoText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    position: "absolute",
    top: 49,
    left: "38%"
  },
  list: {
    marginTop: 50
  }
})
export default Todos