import React, { useState } from "react";
import todoApi from "../api/todoApi";


const EditTodoForm = (props) => {
    const { todo, onCancel, onSave, onClick, isSelected } = props;
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const[completed, setCompletedTodo] = useState([])
    const isValid = title !== "" && description;

 
/*Kopierar todo objectet, uppdaterar värdena och anropar uppdaterade todo objectet. Inväntar
uppdateringen i api med rätt id, sedan sparar nya uppdateringen om man valt att spara
och fyllt i titel och beskrivning*/
    const handleSave = async () => {
      if(isValid && onSave) {
        const updatedTodoInfo = {
          ...todo,
          title: title,
          description: description,
          updated: Date(Date.toLocaleString()),
          
        };
        const updatedTodo = await todoApi.updateTodo(todo.id, updatedTodoInfo);
        onSave(updatedTodo);
      }
    };

/*När en ny event sker, blir nya värdet uppdaterad */
    return (
         <form id="todo-form">
    <h2>Edit todo</h2>
    <label>Title</label>
    <input name="title" required value={title} onChange={(event) => setTitle(event.target.value)} />
    <label>Description</label>
    <input name="description" value={description} onChange={(event) => setDescription(event.target.value)} /> 
    <br />
    <button type="button" className="link-button" onClick={onCancel}>Cancel</button>
    <button disabled={!isValid} type="button" className="primary" onClick={handleSave}>Save</button>
  </form>
  );
};

export default EditTodoForm;