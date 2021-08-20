import React from 'react';
import Todo from './Todo';




const TodoList = ({todos, todoDelete, todoToogleComplete, setTodoEdit}) => {   

    return ( 
        <div>
            <h1>Soy Todo List</h1>
            {
                todos.length === 0 
                 ? (<div className="alert alert-primary mt-2"> 
                 Please add a New Task.
                 </div> )
                 
                 : (todos.map(todo => (
                    <Todo 
                         todo={todo} 
                         key={todo.id}
                         todoDelete={todoDelete}
                         todoToogleComplete={todoToogleComplete}
                         setTodoEdit={setTodoEdit}
                     />
                 )))
            }
                     
        </div>        
     );
}
 
export default TodoList;