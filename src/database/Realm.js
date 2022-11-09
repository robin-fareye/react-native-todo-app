import Realm from "realm";
import TodoSchema from '../database/TodoSchema';


const realm = new Realm({
    path: "myrealm",
    schema: [TodoSchema],
});

function postTodo(title, description, dueDate) {

   
    let task1
    realm.write(() => {
        task1 = realm.create("Todos", {
            title: title,
            description: "pending",
            dueDate: dueDate
        });


    });
}
function getAllTodo() {

    // realm.write(() => {
    //     // Delete all instances of Cat from the realm.
    //     realm.delete(realm.objects("Todos"));
    //   });
    return realm.objects("Todos")
}

function updateTask(todo) {
    let obj=realm.objects("Todos").filter((item)=>{
        return item.title===todo.title
    })
    realm.write(() => {
        
        realm.delete(obj);
    });
    let task
    let {title,description,dueDate}=todo
    realm.write(() => {
        task=realm.create("Todos", {
            title: title,
            description: "done",
            dueDate:dueDate
        });

    })

}




export { postTodo, getAllTodo, updateTask }
