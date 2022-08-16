
import React, {useState} from 'react';
import EditTodoForm from '../todoDetails/EditTodoForm';
import TodoListItem from "./TodoListItem";
import todoApi from "../api/todoApi";


/*<!-- {Skapar en komponent, returnerar todoListItem och för varje 
todo som läggs in, sätts in i listan och ger varje todo en unik nyckel-->*/
const TodoList = (props) => {
  const {todos, selectedTodo, completed, toggleComplete} = props;
  const handleTodoClicked = (todo) => {
    if(props.onTodoSelected){
      props.onTodoSelected(todo);
    }
  };

   const handleClicked = (todo) => {
    if(props.onCompleted){
      props.onCompleted(todo);
    }
  }




/*<!--loopar över todos, todon som blir klickad blir hanterad och vald(blir en reaction på en händelse) och får ett id-->*/  
return (

    <ul className="todo-list">
      {todos.map((todo) => ( <TodoListItem onClick={handleTodoClicked} key={todo.id} todo={todo} isSelected={todo === selectedTodo}
       />       
     ))}         
</ul>  
         );   
    }
      
     export default TodoList;