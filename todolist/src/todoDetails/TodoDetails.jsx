import React from "react";
import todoApi from "../api/todoApi";

const TodoDetails = (props) => {
    const {todo, onEdit, onDelete} = props;
/*När delete knappen blir clicked så sker en event, en ruta är skapad som ska ställa en fråga om valda
todon. Om man bekräftar i pop up rutan så raderas todon i api med valda todons id*/

    const handleDelete = async () => {
     const confirmationResult = window.confirm(`Are you sure you want to delete ${todo.title}?`);
      if(confirmationResult){
        const deletedTodo = await todoApi.deleteTodo(todo.id);
        onDelete(deletedTodo);
      }
    }

  
    
//När en todo skapas så kommer datum och tid på när todon skapades stå.
//Blir todon uppdaterad, så kommer datum och tid stå och om inte så är det tomt.
    return (
       <div className="todo-details">
    <h2>{todo.title}</h2>
    <p>{todo.description}</p>
    <p className="todo-details__date">Created: {todo.created}</p>
    <p className="todo-details__date">Updated: {todo.updated}</p>
    <button type="button" className="link-button danger" onClick={handleDelete}>Delete</button>
    <button type="button" className="link-button" onClick={onEdit}>Edit</button>
  </div>
  );
};

export default TodoDetails;