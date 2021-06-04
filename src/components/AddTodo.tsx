import React from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { inputTodoText } from '../store/action-creators/todo';

export const AddTodo: React.FC = () => {
  const {addTodo} = useTypedSelector(state => state.todo)
  const dispatch = useDispatch()
  
  const OnTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.currentTarget.value
    dispatch(inputTodoText(newText))
  }

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="What to do?"
        aria-label="What to do?"
        aria-describedby="basic-addon1"
        value={addTodo.text}
        onChange={OnTextChange}
      />
      <InputGroup.Append>
        <Button variant="outline-primary">Add</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}