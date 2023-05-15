import React from 'react';
import './App.css';
import { useState ,useRef,useEffect} from 'react';

function App() {
  const [todo,settodo] = useState('')
  const [todos,setdodos] = useState([])
  const addTodo =()=>{
    setdodos([...todos,{list:todo,id:Date.now(),status:false}])
    settodo('')
  }

  const onDelete =(id)=>{
     setdodos(  todos.filter((todo)=>todo.id !== id))

  }
  const Completed = (id)=>{
        let complete = todos.map((list)=>{
          if(list.id === id){
            return({...list,status:!list.status})
          }
          return list
  })
        setdodos(complete)
  }

  const inputref = useRef('null')
  useEffect(()=>{
    inputref.current.focus();
},[])
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={todo}  onChange={(event)=>settodo(event.target.value)}  ref={inputref} type="text" placeholder="🖊️ Add item..." />
        <i className="fas fa-plus" onClick={addTodo}></i>
      </div>
      <div className="todos">
       {
       
       todos.map((todo)=>(

        <div className="todo" id={todo.status?'listItem':null}>
        <div className="left">
          <input type="checkbox" name="" id="" onClick={()=>Completed(todo.id)}/>
          <p>{todo.list}</p>
        </div>
        <div className="right">
          <i className="fas fa-times" style={{color:'red'}} onClick={()=>onDelete(todo.id)}></i>
        </div>
      </div>
       ))

       }
      </div>
    </div>
  );
}

export default App;