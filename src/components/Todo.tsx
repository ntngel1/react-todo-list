import React from 'react'
import {InputGroup, FormControl, Button} from 'react-bootstrap'

export const Todo = () => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Checkbox aria-label="Checkbox to complete todo"/>
      </InputGroup.Prepend>
      
      <FormControl aria-label="Todo text"/>
      
      <InputGroup.Append>
        <Button variant="outline-primary">Remove</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}