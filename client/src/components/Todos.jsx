// import React, { useState, useEffect } from 'react';
// import axios from 'axios';



// function getCookie(name) {
//     const cookieArr = document.cookie.split(';');
//     for (let cookie of cookieArr) {
//         let [key, value] = cookie.trim().split('=');
//         if (key === name) {
//             return value;
//         }
//     }
//     return null;
// }

// const username = getCookie('userid');
// const Todos = () => {
//     const [todos, setTodos] = useState([]);
//     const [newTodo, setNewTodo] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:8080/api/todos', {
//             headers: {
//                 userid: username
//             }
//         })
//         .then(response => {
//             setTodos(response.data.todos);
//         })
//         .catch(error => {
//             console.error('Error fetching todos:', error);
//         });
//     }, []);

//     function addTodo() {
//         const isDone = document.getElementById('checkbox');
//         axios.post('http://localhost:8080/api/todos', {
//             todo: newTodo,
//             isCompleted: isDone.checked
//         }, {
//             headers: {
//                 userid: username
//             }
//         })
//         .then(response => {
//             setTodos([...todos, response.data.todo]);
//             setNewTodo('');
//         })
//         .catch(error => {
//             console.error('Error adding todo:', error);
//         });
//     }

//     return (
//         <div>
//             <div className='bg-gray-900 text-gray-200 flex justify-center px-2 py-2'>
//                 <input 
//                     type="text" 
//                     id='todo' 
//                     value={newTodo} 
//                     onChange={(e) => setNewTodo(e.target.value)} 
//                     className='p-2 rounded' 
//                     placeholder='Enter Todo'
//                 />
//                 <input type="checkbox" id="checkbox" className='ml-2'/>
//                 <button className='bg-green-600 p-2 ml-2 rounded' onClick={addTodo}>Add</button>
//             </div>
//             <div>
//                 <ul>
//                     {todos.map(todo => (
//                         <li key={todo._id}>{todo.todo} - {todo.isCompleted ? 'Done' : 'Not Done'}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Todos;


import React from 'react'

function Todos() {
  return (
    <div>Todos</div>
  )
}

export default Todos