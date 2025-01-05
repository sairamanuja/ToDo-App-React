import React,{useEffect, useRef, useState} from 'react'
import todo_icon from "../assets/todo_icon.png"
import TodoItems from './TodoItems'
const todo = () => {
 
    const inputRef = useRef();
    const [todoList, setTodoList] = useState(
      localStorage.getItem("todos") 
        ? JSON.parse(localStorage.getItem("todos")) 
        : []
    );
    

    const add = ()=>{
        const inputText = inputRef.current.value;
        console.log(inputText);
          
        if(inputText===""){
            return alert("enter text")
           }
      


        const newTodo = {
            id : Date.now(),
            text: inputText,
            isComplete:false,
        }

        setTodoList((prev)=>{
           const ul = [...prev,newTodo];
            console.log(ul)
            return ul
        })
        inputRef.current.value ="";
        
    }
  

    const deleteTodo = (id)=>{
        setTodoList((prev)=>{
          return  prev.filter((todo)=>todo.id !== id)
        })
    }

    const toggle = (id) =>{
      setTodoList((prevTodos)=>{
        return prevTodos.map((todo)=>{
          if(todo.id===id){
            return{...todo,isComplete:!todo.isComplete}
          }
          return todo;
        })
      })
    }

    useEffect(() => {
      // Save updated todos to localStorage
      localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

  return (
    <div className='bg-white place-self-center w-11/12 max max-w-md flex flex-col p-7 min-h-[550px] rounded-xl' >
   
   <div className="flex items-center gap-2 mt-7 ">
    <img className='w-8' src={todo_icon} alt="" />
    <h1 className='text-2xl font-semibold'>To-Do List</h1>
   </div>
     
   <div className="flex items-center my-7 bg-gray-200 rounded-full">
    <input ref={inputRef}  type="text" className='bg-transparent border-0  outline-none placeholder:text-slate-600 flex-1 h-14 pl-6 pr-2 ' placeholder='Add your task' />
    <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-lg font-medium  text-white  '>ADD +</button>  
    </div> 

    <div className="">
   
   

    {todoList.map((item,index)=>{
        return   <TodoItems text={item.text} key={index} id = {item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
    })}

    </div>
    



    </div>
  )
}

export default todo
