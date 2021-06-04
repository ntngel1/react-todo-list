import React from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap'

export const AddTodo: React.FC = () => {
  return (
    <InputGroup className="mb-3">
      <FormControl 
        placeholder="What to do?"
        aria-label="What to do?"
        aria-describedby="basic-addon1"
      />
      <InputGroup.Append>
        <Button variant="outline-primary">Add</Button>
      </InputGroup.Append>
    </InputGroup>
  )
}