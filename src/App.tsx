import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { AddTodo } from './components/AddTodo'
import { Todo } from './components/Todo'
import { Menu } from './components/Menu'
import { useTypedSelector } from './hooks/useTypedSelector'
import { postUpdateTodo, updateTodo, removeTodo, selectedTodoFilter, removeTodos, updateTodosIsCompleted, closeErrorModal } from './store/action-creators/todo'
import { useDispatch } from 'react-redux'
import { TodoFilter, TodoModel } from './types/todo'
import { ErrorModal } from './components/ErrorModal'

const App: React.FC = () => {
  const {todos, loading, error, menu} = useTypedSelector(state => state.todo)
  const dispatch = useDispatch()

  const onTodoCheckedChange = (id: string) => (isChecked: boolean) => {
    dispatch(updateTodo(id, null, isChecked))
    dispatch(postUpdateTodo(id))
  }

  const onTodoTextChange = (id: string) => (text: string) => {
    dispatch(updateTodo(id, text, null))
  }

  const onTodoFinishedTextChange = (id: string) => () => {
    dispatch(postUpdateTodo(id))
  }

  const onTodoRemoveClicked = (id: string) => () => {
    dispatch(removeTodo(id))
  }


  const onMenuFilterSelected = (filter: TodoFilter) => {
    dispatch(selectedTodoFilter(filter))
  }

  const onMenuClearClicked = () => {
    var filterByIsCompleted: boolean | null
    switch (menu.filterBy) {
      case TodoFilter.ALL: filterByIsCompleted = null; break
      case TodoFilter.COMPLETE: filterByIsCompleted = true; break
      case TodoFilter.INCOMPLETE: filterByIsCompleted = false; break
    }
    
    dispatch(removeTodos(filterByIsCompleted))
  }

  const onMenuCompleteAllClicked = () => {
    switch (menu.filterBy) {
      case TodoFilter.ALL: { 
        if (todos.items.every((item) => item.isCompleted)) {
          dispatch(updateTodosIsCompleted(null, false))
        } else {
          dispatch(updateTodosIsCompleted(null, true))
        }
        break 
      }
      case TodoFilter.COMPLETE: dispatch(updateTodosIsCompleted(true, false)); break
      case TodoFilter.INCOMPLETE: dispatch(updateTodosIsCompleted(false, true)); break
    }
  }

  var selectedFilterText = ''
  switch (menu.filterBy) {
    case TodoFilter.ALL: selectedFilterText = 'All'; break
    case TodoFilter.COMPLETE: selectedFilterText = 'Complete'; break
    case TodoFilter.INCOMPLETE: selectedFilterText = 'Incomplete'; break
  }

  var completeButtonText = ''
  switch (menu.filterBy) {
    case TodoFilter.ALL: { 
      if (todos.items.every((item) => item.isCompleted)) {
        completeButtonText = 'Incomplete all'
      } else {
        completeButtonText = 'Complete all'
      }
      break 
    }
    case TodoFilter.COMPLETE: completeButtonText = 'Incomplete all'; break
    case TodoFilter.INCOMPLETE: completeButtonText = 'Complete all'; break
  }


  var displayedTodosFilter: (item: TodoModel) => boolean
  switch (menu.filterBy) {
    case TodoFilter.ALL: displayedTodosFilter = (item) => true; break
    case TodoFilter.COMPLETE: displayedTodosFilter = (item) => item.isCompleted; break
    case TodoFilter.INCOMPLETE: displayedTodosFilter = (item) => !item.isCompleted; break
  }

  const displayedTodos = todos.items.filter(displayedTodosFilter)

  return (
    <>
      <Container fluid="md">
        <Menu
          todosCount={displayedTodos.length}
          selectedFilterText={selectedFilterText} 
          completeButtonText={completeButtonText}
          onFilterSelected={onMenuFilterSelected}
          onClearClicked={onMenuClearClicked}
          onCompleteAllClicked={onMenuCompleteAllClicked}
        />
        <Row>
          <AddTodo/>
        </Row>
        <Row>
          {displayedTodos.map((todo) => {
            return <Todo 
              key={todo.id} 
              isCompleted={todo.isCompleted} 
              text={todo.text} 
              onCheckedChange={onTodoCheckedChange(todo.id)} 
              onTextChange={onTodoTextChange(todo.id)}
              onFinishedTextChange={onTodoFinishedTextChange(todo.id)}
              onRemoveClicked={onTodoRemoveClicked(todo.id)}
            />
          })}
        </Row>
      </Container>
      <ErrorModal 
        error={error.text ?? ''}
        showModal={error.text != null} 
        hideCloseButton={error.hideCloseButton}
        handleClose={() => dispatch(closeErrorModal())}
        onCloseClicked={error.closeAction} 
        showRetryButton={error.retryAction != undefined} 
        onRetryClicked={error.retryAction}
      />
    </>
  )
}

export default App
