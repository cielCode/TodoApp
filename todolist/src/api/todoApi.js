/*Hämtar(fetch) todos som har blivit inlagt i api adressen. Hämtar med getAll funktionen. Om responsen blir 200
så är det godkänt och då får jag ett resultat annars får jag ett error från felhanteringen*/
const apiAdress = "http://localhost:3001/todo";

const todoApi = {
    getAll: async () => {
        const response = await fetch(apiAdress);
        if(response.ok) {
        const result = await response.json();
        return result;
        }
        throw new Error({
            status: response.status,
            statusText: response.statusText
        });
    },
  /*En ny todo är skapad med post metoden och gör sen om objectet till en json sträng för att sedan
   kunna skicka över till api */ 
     createTodo: async (newTodo) => {
         const response = await fetch(apiAdress, {
             method:"POST",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify(newTodo)
         });
         if(response.ok) {
            const result = await response.json();
            return result;
            }
            throw new Error({
                status: response.status,
                statusText: response.statusText
            }); 
     },
     /*Todon som finns i api adressen med vald id blir raderad med metoden delete */
     deleteTodo: async (id) => {
         const response = await fetch(`${apiAdress}/${id}`, {method:"DELETE"});
         if (response.ok) {
             const result = await response.json();
             return result;
         }
            throw new Error({
                status: response.status,
                statusText: response.statusText
        });
     }, 
  
     /*todo objectet uppdateras genom id för todon som skickas in till url
     Uppdateringen görs genom put metoden och sedan skickas updaterade todon till body */
     updateTodo: async (id, updatedTodo) => {
         const response = await fetch(`${apiAdress}/${id}`, {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(updatedTodo)
         });
         if (response.ok) {
            const result = await response.json();
            return result;
        }
           throw new Error({
               status: response.status,
               statusText: response.statusText
       });
     },  


     checkTodo: async (id, checkedTodo) => {
        const response = await fetch(`${apiAdress}/${id}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id, checkedTodo)
        });
        if(response.ok) {
           const result = await response.json();
           return result;
           }
           throw new Error({
               status: response.status,
               statusText: response.statusText
           });
        },
     
};


export default todoApi; 

