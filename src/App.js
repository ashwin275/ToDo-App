import React from 'react';
import './App.css';
import { useState ,useRef,useEffect} from 'react';

function App() {
  const [todo,settodo] = useState('')
  const [todos,setdodos] = useState([])
  const[editId,seteditId] =  useState(0)
  const [currentDay] = useState(
    new Date().toLocaleString("en-US", { weekday: "long" })
  );


  const addTodo =()=>{
    if (todo.trim() !== ''){
    const isDuplicate = todos.some((to)=>to.list === todo.trim());
   if(!isDuplicate){
    if (editId){
      const editTodo = todos.find((to)=>to.id === editId)
      const updateTodo = todos.map((to)=> to.id === editTodo.id ? (to = {id:to.id,list:todo}):(to = {id:to.id,list:to.list}))
      
        
      setdodos(updateTodo)
      settodo('')
      seteditId(0)
     }else{
      setdodos([...todos,{list:todo,id:Date.now(),status:false}])
      settodo('')
     }
     
   
   }else{
    alert('Task already exist')
   }


   }

   
  }

  const onDelete =(id)=>{
     setdodos(  todos.filter((todo)=>todo.id !== id))

  }

  const OnEdit =(id)=>{
   const editTodo =  todos.find((to)=>to.id === id)
   settodo(editTodo.list)
   seteditId(editTodo.id)
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


  


  // const getDayOfWeek = () => {
  //   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   const currentDate = new Date();
  //   console.log(currentDate)
  //   const dayIndex = currentDate.getDay();
  //   console.log(dayIndex)
  //   return days[dayIndex];
  // };


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
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={todo}  onChange={(event)=>settodo(event.target.value)}  ref={inputref} type="text" placeholder="🖊️ Add item..." />
        <p onClick={addTodo}>{editId? <i className="fa-solid fa-pen-to-square" style={{color:'green'}}></i>  :<i className="fas fa-plus fa-lg" ></i>}</p>
      </div>
      <div className="todos">
       {
       
       todos.map((todo)=>(

        <div className="todo" key={todo.id} id={todo.status?'listItem':null}>
        <div className="left">
          <input type="checkbox" name="" id=""   onChange={() => Completed(todo.id)}  checked={todo.status}/>
          <p>{todo.list}</p>
        </div>
        <div className="right">
       {todo.status?null: <i className="fa-solid fa-pen-to-square" style={{color:'green'}} onClick={()=>OnEdit(todo.id)}></i> }
          <i className="fas fa-times" style={{color:'red',marginLeft:'5px'}} onClick={()=>onDelete(todo.id)}></i>
        </div>
      </div>
       ))

       }

<h2 style={{marginTop:"2rem", borderBottom: "2px solid white", marginBottom: '10px' ,color:'gold'}}>Completed Task</h2>

   {
    todos.map((obj) =>{
      if (obj.status){
        return (
          <div key={obj.id} className='completed'>
            <h4>{obj.list}---({new Date().toLocaleDateString()})</h4>
          </div>
        );
      }
      return null;
    })
   }
      </div>
      
    </div>
  );
}

export default App;