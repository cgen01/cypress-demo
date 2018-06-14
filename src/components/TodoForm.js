import React from 'react'

export default props =>
  <form onSubmit={ props.onTodoSubmit }>
    <input
      type='text'
      autoFocus
      value={ props.currentTodo }
      onChange={ props.onNewTodoChange }
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>
