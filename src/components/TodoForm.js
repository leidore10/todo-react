import React, { useState, useEffect } from 'react';

const initialFormValues = {
    title: '',
    description: ''
}

const TodoForm = ({todoAdd, todoUpdate, todoEdit, setTodoEdit}) => {

    const [formValues, setFormValues] = useState(initialFormValues)
    const {title, description} = formValues
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {

        if (todoEdit) {
          setFormValues(todoEdit)  
        } else {
            setFormValues(initialFormValues);
        }    

    }, [todoEdit])


    const handleInputChange = (e) => {

        const changendFormValues = {
            ...formValues,
            [e.target.name]: e.target.value
        }
        
        setFormValues(changendFormValues)
    }

    const handleRollback = () => {
        setTodoEdit(null);
        setFormValues(initialFormValues);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(title.trim() === '' || description.trim() == '') {
            setError('Tienes campos vacios.')
            setSuccess(null)
            return;
        }

        if(todoEdit){
            todoUpdate(formValues);
            setSuccess('The task was edited.');
        }else{
           todoAdd(formValues); 
           setSuccess('The task was saved.');
           setFormValues(initialFormValues);
        }  
       
       setError(null)

       setTimeout(() => {
           setSuccess(null);
       }, 3000);
      
    }
    
    return ( 
        <div>
            <h1>{ todoEdit ? 'Edit Task' : 'New Task'}</h1>
            {
                todoEdit && (
                <btn 
                    onClick={handleRollback}
                    className="btn btn-warning btn-sm mb-3"> Rollback 
                </btn>)
            }
            
            <form onSubmit={ handleSubmit }>
                <input 
                    type="text" 
                    placeholder="Title" 
                    className="form-control"
                    value={title}
                    name="title"
                    onChange={handleInputChange}
                />

                <textarea 
                    placeholder="Description" 
                    className="form-control mt-4"
                    value={description}
                    name="description"
                    onChange={handleInputChange}
                />

                <button 
                    className="btn btn-primary btn-block mt-4 form-control">
                    { todoEdit ? 'Edit Task' : 'Add Task'}
                </button>
            </form>

            {
                error && (<div className="alert alert-danger danger mt-2"> { error } </div> )             
            }

            
            {  
                success && (<div className="alert alert-info info mt-2"> { success } </div> )             
            }            
        </div>
        
     );
}
 
export default TodoForm;