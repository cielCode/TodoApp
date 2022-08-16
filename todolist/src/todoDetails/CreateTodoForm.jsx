import React, { useState } from "react";
import todoApi from "../api/todoApi";


const CreateTodoForm = (props) => {
  const { onCancel, onSave} = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [created, setCreated] = useState("");
  const[completed, setCompletedTodo] = useState("");

  const handleToggle = () => {
    setCompletedTodo(!completed);          
}
 
/*Kopierar todo, sparar värdena och Inväntar
 api med rätta värden, sedan sparar den nya skapade todon om man valt att spara
 och fylt i titel och beskrivning*/

  const handleSave = async () => {
    if(isValid && onSave){
      const newTodo = {
        title: title,
        description: description,
        created: Date(Date.toLocaleString())
      };
      const createdTodo = await todoApi.createTodo(newTodo);
      setTitle("");
      setDescription("");
      setCompletedTodo("")
      setCreated("")
      onSave(createdTodo);
    }
  };



    const isValid = title !== "" && description !== "";
    return (
        <form id="todo-form">
        <h2>Create todo</h2>
        <label>Title</label>
        <input name="title" required value={title} onChange={(event) => setTitle(event.target.value)}/>
        <label>Description</label>
        <textarea name="description" value={description} onChange={(event) => setDescription(event.target.value)}>Todo Description</textarea>
        <br />
        <button type="button" className="link-button" onClick={onCancel}>Cancel</button>
        <button type="button" className="primary" onClick={handleSave} disabled={!isValid}>Save</button>
      </form>
    );
};

export default CreateTodoForm;