import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { saveTodo, loadTodos, destroyTodo, updateTodo } from '../lib/service';
import { filterTodos } from '../lib/utils';


export default class TodoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTodo: '',
      todos: []
    }

    this.handleNewTodoChange = this.handleNewTodoChange.bind(this)
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {
    loadTodos()
      .then(({data}) => this.setState({ todos: data }))
      .catch(() => this.setState({ error: true }))
  }

  handleNewTodoChange (e) {
    this.setState({ currentTodo: e.target.value })
  }

  handleTodoSubmit (e) {
    e.preventDefault();
    const newTodo = {
      name: this.state.currentTodo,
      isComplete: false
    }

    saveTodo(newTodo)
      .then(({ data }) => this.setState({
        todos: this.state.todos.concat(data),
        currentTodo: ''
      }))
      .catch(() => this.setState({ error: true }))
  }

  handleDelete (id) {
    destroyTodo(id)
      .then(({ data }) => this.setState({
        todos: this.state.todos.filter(x => x.id !== id)
      }))
  }

  handleToggle (id) {
    const targetTodo = this.state.todos.find(x => x.id === id)
    const update = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete
    }
    updateTodo(update)
      .then(({data}) => {
        const todos = this.state.todos.map(x => x.id === data.id ? data : x)
        this.setState({todos})
      })
  }

  render () {
    const remaining = this.state.todos.filter(x => !x.isComplete).length
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            { this.state.error ? <span className="error">On no!</span> : '' }
            <TodoForm
              currentTodo={ this.state.currentTodo }
              onNewTodoChange={ this.handleNewTodoChange }
              onTodoSubmit={ this.handleTodoSubmit }
            />
          </header>
          <section className="main">
            <Route path="/:filter?" render={ ({ match }) =>
              <TodoList
                todos={ filterTodos(match.params.filter, this.state.todos) }
                onDelete={ this.handleDelete }
                onToggle={this.handleToggle}
              />
            } />
          </section>
          <Footer remaining={ remaining } />
        </div>
      </Router>
    )
  }
}
