import axios from 'axios';

const apiUrl = 'http://localhost:3030/api/todos';

export const saveTodo = todo => axios.post(apiUrl, todo)

export const loadTodos = () => axios.get(apiUrl)

export const destroyTodo = id => axios.delete(`${apiUrl}/${id}`)

export const updateTodo = todo => axios.put(`${apiUrl}/${todo.id}`, todo)
