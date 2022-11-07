import Realm from "realm";
import TodoSchema from '../database/TodoSchema';


const realm = new Realm({
    path: "myrealm",
    schema: [TodoSchema],
});

function postTodo(title,description,dueDate){
    let task1
        realm.write(() => {
            task1 = realm.create("Todos", {
              title: title,
              description: description,
              dueDate:dueDate
            });
    
            console.log(`created task: ${title}`);
        });
}
function getAllTodo(){
    return realm.objects("Todos")
}


export {postTodo,getAllTodo}
