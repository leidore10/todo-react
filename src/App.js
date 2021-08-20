import React, {useState, useEffect} from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Quote from './components/quote';

const initialTodos = [
    {
        id: 1,
        title: 'Todo #1',
        description: 'Desc del todo # 111',
        completed: false
    },
    {
        id:2,
        title: 'Todo #2',
        description: 'Desc del todo # 22299',
        completed: false
    }

]

const initialQuote = {
    quote: '',
    author: ''
}

const localTodos = JSON.parse(localStorage.getItem('todos'));

const App = () => {

    const [todos, setTodos] = useState(localTodos || initialTodos);
    const [todoEdit, setTodoEdit] = useState(null);

    const [quote, setQuote] = useState(initialQuote)

    const updateQuote = async () => {
        const url = "https://www.breakingbadapi.com/api/quote/random";
        const res = await fetch(url);
        const [newQuote] = await res.json();

        console.log(newQuote);

        //setQuote(newQuote);
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
        updateQuote()
    }, [todos]);

    const todoAdd = (todo) => {

        const newTodo = {
            id: Date.now(),
            ...todo,
            completed: false
        }

        const changedTodo = [
            newTodo,
            ...todos            
        ]

        setTodos(changedTodo);
    }

    const todoUpdate = (todoEdit) => {

        const changeTodos = todos.map(todo => (
          todo.id === todoEdit.id
          ? todoEdit
          : todo  
        ))

        setTodos(changeTodos);
    }

    const todoDelete = (todoId) => {

        if (todoEdit && todoId === todoEdit.id) {
            setTodoEdit(null);
        }

        const changeTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(changeTodos);
    }

    const todoToogleComplete = (todoId) => {        

        const changeTodos = todos.map( todo => (
            todo.id === todoId
            ? {...todo, completed : !todo.completed}
            : todo
        ));

        setTodos(changeTodos);
    }

    return ( 
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <TodoList 
                    todos={todos}
                    todoDelete={todoDelete}
                    todoToogleComplete={todoToogleComplete}
                    setTodoEdit={setTodoEdit}
                    />
                </div>

                <div className="col">
                    <TodoForm
                      todoAdd={todoAdd}  
                      todoUpdate={todoUpdate}  
                      todoEdit={todoEdit}
                      setTodoEdit={setTodoEdit}
                    />

                    <Quote
                        quote={quote}
                    />                  
                </div>
            </div>            
        </div>        
     );
}
 
export default App;