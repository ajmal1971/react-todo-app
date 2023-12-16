import { useEffect, useState } from 'react';
import './App.css';
import { TodoProvider } from './contexts/TodoContext';
import { TodoForm, TodoItem } from './components';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function createTodo(todo) {
    setTodos((prev) => [...prev, {id: Date.now(), ...todo}]);
  }

  function updateTodo(id, todo) {
    setTodos((prev) => prev.map((curr) => (curr.id === id ? todo : curr)));
  }

  function deletedTodo(id) {
    setTodos((prev) => prev.filter(item => item.id !== id));
  }

  function completeTodo (id) {
    setTodos((prev) => prev.map((curr) => curr.id === id ? {...curr, isCompleted: !curr.isCompleted} : curr));
  }

  return (
    <TodoProvider value={{todos, createTodo, updateTodo, deletedTodo, completeTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  <TodoForm/> 
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {
                    todos.map((todo) => (
                      <div key={todo.id} className='w-full'>
                        <TodoItem todo={todo}/>
                      </div>
                    ))
                  }
              </div>
          </div>
      </div>
    </TodoProvider>
  )
}

export default App
