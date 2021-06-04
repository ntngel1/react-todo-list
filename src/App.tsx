import React from 'react'
import { Container, Row } from 'react-bootstrap'
import {AddTodo} from './components/AddTodo'
import {Todo} from './components/Todo'
import {Menu} from './components/Menu'

const App: React.FC = () => {
  return (
    <Container fluid="md">
      <Menu/>
      <Row>
        <AddTodo/>
      </Row>
      <Row>
        <Todo/>
      </Row>
    </Container>
  )
}

export default App
