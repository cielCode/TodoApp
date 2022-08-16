import './App.css';
import TodoList from './todoList/TodoList';
import TodoDetails from './todoDetails/TodoDetails';
import CreateTodoForm from './todoDetails/CreateTodoForm';
import EditTodoForm from './todoDetails/EditTodoForm';
import { useEffect, useState } from "react";
import todoApi from './api/todoApi';
import TodoListItem from './todoList/TodoListItem';




/* Går nu att skriva med stor eller lite bokstav */
const viewModes = {
  view: "View",
  edit: "Edit",
  create: "Create",
  item: "Item",
};


/*<!--Skapar en state variabel för todo listan-->*/
function App() {
  const [todos, setTodos] = useState([]); 
 // const[completed, setCompletedTodo] = useState([])
  const [completed, setIsComplete] = useState();
   /* <!--när en todo blir selected så updaterar state med valda todon-->*/
    const [selectedTodo, setSelectedTodo] = useState();
    const [viewMode, setViewMode] = useState(viewModes.create);

/*Create form är i visningsläge om inte en todo är vald*/
    const showCreateForm = () => {
      setSelectedTodo(null);
      setViewMode(viewModes.create);
    };
  
 /*En todo blir vald och den todon syns i visningsfält*/   
  const selectTodo = (todo) => {
    setSelectedTodo(todo);
    setViewMode(viewModes.view);
  };

  const completeTodo = (todo) => {
    setIsComplete(todo);
    setViewMode(viewModes.view);
  }
  
/*En ny todo blir sparad och den nya todon blir vald*/
    const handleTodoSave = (newTodo) => {
      const newArray = [...todos, newTodo];
      setTodos(newArray);
      selectTodo(newTodo);
    };


/*Skapar en loop som går igenom todos om 0 är mindre än
todo innehållet. Kollar om gamla todo id matchar den nya och sedan 
uppdateras och markeras den matchade todon*/
    const handleTodoUpdate = (updatedTodo) => {
      const newArray = todos.slice();
      for(var i = 0; i < newArray.length; i++){
         if(newArray[i].id === updatedTodo.id){
           newArray[i] = updatedTodo;
           break;
         }
       }  
         setTodos(newArray)
         selectTodo(updatedTodo);
         
      } 
/*När en todo blir borttagen så hämtas todo listan på nytt */
    const handleTodoDeleted = (deletedTodo) => {
     // setTodos(todos.filter((todo) => todo.id !== deletedTodo.id));
     getTodos();
      showCreateForm();
    };

  
/*Väntar på svar från api adressen för att hämta todos till appen */
    const getTodos = async () => {
      const todos = await todoApi.getAll();
      setTodos(todos);
    }
/*Hämtar api automatiskt när appen startar*/
    useEffect(() => {
      getTodos();
    }, []); 
    
/*Om vald todo inte är i viewMode så är createForm i visningsläge istället */
    const renderMainSection = () => {
      if(!selectedTodo || viewMode === viewModes.create) {
      return ( <CreateTodoForm onCancel={() => setViewMode(viewModes.view)} onSave={handleTodoSave} />
      );
      }
      switch(viewMode){
        case viewModes.view:
          return ( <TodoDetails todo={selectedTodo} onDelete={handleTodoDeleted} onEdit={() => setViewMode(viewModes.edit)} />
          );
        case viewModes.edit:
          return ( <EditTodoForm todo={selectedTodo} onCancel={() => setViewMode(viewModes.view)} onSave={handleTodoUpdate}/>
        );  
       
        default:
          return null;  
      }
    };


/*<!--När man trycker på add knappen så kommer createform fram i visningsläge-->*/
  return (
    <main>
    <aside>
    <h1 className="list-title">
      My Todos <button id="button-add-todo" className="primary" onClick={showCreateForm}>
        Add</button>
    </h1>
    {/*<!-- skickar vald todo från state variabel till todolistan-->*/}
    <TodoList todos={todos} selectedTodo={selectedTodo} onTodoSelected={selectTodo} completed={completed} onCompleted={completeTodo}/>
   

  </aside>
  <section>
    
  {/*  <!--Vald todo finns med i todoDetails och edit nu-->*/}
  {/*  <!--Rendrerar ett av komponenterna beroende på vilket viewMode som är vald--> */}
  {renderMainSection()}
  </section>
  </main>
  ); 
  }

  

export default App;
