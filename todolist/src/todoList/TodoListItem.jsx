import React, {useState} from 'react';
import todoApi from "../api/todoApi";


/* <li className="todo-list-item todo-list-item--selected">
      <span className="todo-list-item__checkbox"></span>
      <div className="todo-list-item__info">
        <h3>Todo (selected)</h3>
        <p>Ham, sandwich, cheese</p>
      </div>
    </li>
*/ 
/*Får in todos genom att ta emot det som ett object, plockar
ut todo egenskapen från props. 
På onClick så hanteras todon och blir vald. När den blir vald så tar onClick emot todon */
     const TodoListItem = (props) => {
    const {isSelected, onClick, todo} = props;  
  
    const[todos, setTodos] = useState([])
    
  const [isComplete, setIsComplete] = useState(todo.completed);
  const isValid = isComplete !== "";

       const handleToggle = () => {
        setIsComplete(!isComplete)          
     }
  
   const handleTodoClick = () => {
    if(onClick){
        onClick(todo);
    }
  }


     const handleSave = async () => {  
       setIsComplete(!isComplete);
        const updatedTodoInfo = {
          ...todo,
          completed: !isComplete
    };
     const updatedTodo = await todoApi.updateTodo(todo.id, updatedTodoInfo); 
      
    
  }


      let className ="todo-list-item";
    if (isSelected){
        className += " todo-list-item--selected";
    }

 

  //När checkbox blir clickad så blir den bockad, klickar man igen så blir den avbockad och händelsen sparas.    
    return (
      <li className={className} onClick={handleTodoClick}>
        <span className={isComplete ? "todo-list-item__checkbox" : "todo-list-item__checkbox--completed"} onClick={handleSave}> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
        </span>
      <div className="todo-list-item__info">
 
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
    </li>  
    );
     };

export default TodoListItem;