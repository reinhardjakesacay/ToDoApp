import { useState, useEffect } from "react"
import ToDoInput from "./components/ToDoInput"
import ToDoList from "./components/ToDoList"


function App() {

  const [todos, setTodos] = useState([ ])
  const [todoValue, setTodoValue] = useState('')


  function persistData (newList) {
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }


  function handleAddTodos (newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }


  function handleDeleteTodos(index) {
    const newTodoList = todos.filter((todos, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }


  function handleEditTodos(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodos(index)
  }


  useEffect(() => {
    if(!localStorage) {
      return
    }
    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, [])


  return (
    <>
      <ToDoInput todoValue={todoValue}  setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <ToDoList handleEditTodos={handleEditTodos} handleDeleteTodos={handleDeleteTodos} todos = {todos}/>
    </>
  )

}


export default App
