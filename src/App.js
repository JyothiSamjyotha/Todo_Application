import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo,settodo] = useState("")
  const [todos,settodos] = useState([])
  const [showfinished,setshowfinished] = useState(true)

  useEffect(()=>{
    let localstring = localStorage.getItem("todos")
    if(localstring){
      let todos = JSON.parse(localstring)
      settodos(todos)
    }},[])

  const savtoLs = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (e) =>{
    setshowfinished(!showfinished)
  }

  

  const handleedit = (e,id) =>{
    let todo = todos.filter(item=>{
      return item.id===id
    }
      
    )
    settodo(todo[0].todo)
    let newtodo = todos.filter(item=>{
      return item.id!==id
    })
    settodos(newtodo)
    savtoLs()

  }

  const handledelete = (e,id) =>{
    
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos);
    savtoLs()
    
    

  }

  const handlechange = (e) => {
    settodo(e.target.value)

  }

  const handleadd = () => {
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    settodo("")
    savtoLs()
  }

  

  const handlecheckbox = (e) =>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id
    }
    )
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    savtoLs()
   }

  return (
    <>
    <Navbar/>
    <div className='mx-3 md:container md:mx-auto my-5 rounded-xl  md:w-1/2 p-5 min-h-[80vh] bg-slate-400'>
    <h1 className='font-bold text-center text-xl'>iTask-Manage your todos at one place</h1>
      <div className='AddTodo my-5 flex flex-col gap-4'>
        <h2 className=' text-lg font-bold'>Add a a Todo</h2>
        <input onChange={handlechange} value={todo} type="text" className='w-full focus:outline-none rounded-lg px-5 py-1' />
        <button onClick={handleadd} disabled={todo.length<3} className='bg-black text-white hover:bg-slate-800 p-2 py-1 text-sm font-bold rounded-md '>Save</button>
      </div>
      <input onChange={toggleFinished} type="checkbox" checked={showfinished} className='my-4'/> showFinished
      <h2 className=' text-lg font-bold'>Your Todos</h2>
      <div className='Todos'>
        {todos.length===0 && <div className=' text-red-500 font-bold'>No Todos to display</div>}
        {todos.map(item=>{
          return (showfinished || !item.isCompleted) && <div key={item.id} className='Todos flex justify-between my-2'>
          <div className='flex gap-5'>
            <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} />
            <div className={item.isCompleted?"line-through":""}>
              {item.todo}
            </div>
          </div>
          
          <div className='buttons flex h-full'>
            <button onClick={(e)=>{handleedit(e,item.id)}} className='bg-black text-white hover:bg-slate-800 p-2 py-1 text-sm font-bold rounded-md mx-1 items-center'><FaRegEdit /></button>
            <button onClick={(e)=>{handledelete(e,item.id)}} className='bg-black text-white hover:bg-slate-800 p-2 py-1 text-sm font-bold rounded-md mx-1'><MdDelete /></button>
          </div>

        </div>
          
        })}
        

      </div>
    </div>
    </>
  );
}

export default App;
