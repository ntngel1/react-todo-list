import React from 'react'
import {InputGroup, FormControl, Button} from 'react-bootstrap'

export interface TodoProps {
  text: string
  isCompleted: boolean
  onCheckedChange: (isChecked: boolean) => void
  onTextChange: (text: string) => void
  onFinishedTextChange: () => void,
  onRemoveClicked: () => void
}

export const Todo = (props: TodoProps) => {
  const onCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onCheckedChange(event.currentTarget.checked)
  }

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onTextChange(event.currentTarget.value)
  }

  const onFinishedTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onFinishedTextChange()
  }

  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Checkbox
          onChange={onCheckedChange}
          checked={props.isCompleted} 
          aria-label="Checkbox to complete todo"
        />
      </InputGroup.Prepend>
      
      <FormControl 
        aria-label="Todo text" 
        value={props.text} 
        onChange={onTextChange}
        onBlur={onFinishedTextChange}
      />
      
      <InputGroup.Append>
        <Button variant="outline-primary" onClick={props.onRemoveClicked}>Remove</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}