import React from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { createTodo, inputTodoText } from '../store/action-creators/todo';

export const AddTodo: React.FC = () => {
  const {addTodo} = useTypedSelector(state => state.todo)
  const dispatch = useDispatch()
  
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.currentTarget.value
    dispatch(inputTodoText(newText))
  }

  const onAddClick = () => dispatch(createTodo(addTodo.text))

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(createTodo(addTodo.text))
    }
  }

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="What to do?"
        aria-label="What to do?"
        aria-describedby="basic-addon1"
        value={addTodo.text}
        onChange={onTextChange}
        onKeyPress={onKeyPress}
      />
      <InputGroup.Append>
        <Button 
          variant="outline-primary"
          onClick={onAddClick}
        >Add</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}