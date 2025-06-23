import { useEffect, useState } from "react"
import { CirclePlus, Check, Trash2, Pencil } from "lucide-react"
import axios from "axios"

const api = process.env.REACT_APP_API_URL

export default function Todo(){
     
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    const fetchTodos  = async ()=>{
        const res = await axios.get(api)
        setTodos(res.data)
    }

    const addTodo = async ()=>{

        if(input.trim()){
            await axios.post(api, {
                description: input.trim()
            })
            setInput('')
            fetchTodos()
        }
    }

    const toggleTodo = async (id)=>{
        await axios.patch(`${api}/${id}/toggle`)
        fetchTodos()
    }

    const deleteTodo = async (id)=>{
        await axios.delete(`${api}/${id}`)
        fetchTodos()
    }

    const [editIndex, setEditIndex] = useState(null)
    const [editText, setEditText] = useState("")

    const saveEdit = async ()=>{
        if(!editText.trim()) return

        await axios.patch(`${api}/${editIndex}`,{
            description : editText.trim()
           }
        )

        setEditIndex(null)
        setEditText("")
        fetchTodos()
    }

    const sortedTodo = [...todos].sort((a,b)=> a.completed - b.completed)

    useEffect(()=>{
        fetchTodos()
    },[])

    return(<div className="flex flex-col items-center min-h-screen gap-2 py-10">
        <h2 className="text-3xl text-fuchsia-300">Your todos for today:</h2>
        <div className="bg-white rounded-lg shadow-lg p-4 m-6 flex gap-x-2"> 
        <input value={input} 
        onChange={e=> setInput(e.target.value)}
        onKeyPress={e=> e.key === 'Enter' && addTodo()}
        className="flex-1 px-4 py-2 border border-gray-400 rounded-lg" />
        <button onClick={addTodo} 
        className="bg-fuchsia-400 text-white hover:bg-fuchsia-600 p-2 rounded-lg">
            <CirclePlus size={20}/>
        </button>
        
        </div>

        <div className="bg-white shadow-lg rounded-lg">
            {todos.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                    No todos yet!
                </div> 
            ) : (
        <div className="p-6 text-center w-72 ">
            <ul className="space-y-2">
            {sortedTodo.map(todo=>(
                <div key={todo.id} className="flex flex-row gap-2 items-center">
                     <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {todo.completed && <Check size={16} />}
                  </button>
                <li 
                 onClick={() => {return toggleTodo(todo.id);}
                        
                 }
                 className={`flex-1 text-left cursor-pointer break-words whitespace-normal ${
                          todo.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-800'
                        }`}
                >{  todo.id === editIndex ? <input type="text" value={editText} onChange={(e)=> setEditText(e.target.value)}
                className="border border-fuchsia-400 bg-fuchsia-50 rounded p-1" onClick={e=> e.stopPropagation()}
                onKeyDown={e=>{if(e.key === "Enter") saveEdit()}} /> :
                    todo.description}</li>
                <button onClick={()=>deleteTodo(todo.id)}>
                    <Trash2 size={20} />
                </button>
                <button onClick={(e)=>{
                    e.stopPropagation()
                    setEditIndex(todo.id)
                    setEditText(todo.description)
                }}>
                    <Pencil size={20} />
                </button>
                </div>   
            ))}
            </ul>
        </div>
            )}
        </div>
    </div>)
}