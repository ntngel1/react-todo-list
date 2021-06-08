import React from 'react'
import { Row, Col, Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { TodoFilter } from '../types/todo'

export interface MenuProps {
  selectedFilterText: string,
  completeButtonText: string,
  todosCount: number,
  onFilterSelected: (filter: TodoFilter) => void,
  onClearClicked: () => void,
  onCompleteAllClicked: () => void
}

export const Menu = (props: MenuProps) => {
  const onFilterSelected = (eventKey: string | null) => {
    if (eventKey == null) return
    props.onFilterSelected(TodoFilter[eventKey as keyof typeof TodoFilter])
  }

  return (
    <Row className="justify-content-end row align-items-center">
      <Col md="auto">
        <p>Total: {props.todosCount}</p>
      </Col>
      <Col md="auto">
        <DropdownButton 
          id="dropdown-basic-button" 
          title={props.selectedFilterText}
          onSelect={onFilterSelected}
        >
          <Dropdown.Item eventKey={TodoFilter.ALL}>All</Dropdown.Item>
          <Dropdown.Divider/>
          <Dropdown.Item eventKey={TodoFilter.COMPLETE}>Complete</Dropdown.Item>
          <Dropdown.Item eventKey={TodoFilter.INCOMPLETE}>Incomplete</Dropdown.Item>
        </DropdownButton>
      </Col>
      <Col md="auto">
        <Button variant="primary" onClick={props.onClearClicked}>Clear</Button>
      </Col>
      <Col md="auto">
        <Button variant="primary" onClick={props.onCompleteAllClicked}>{props.completeButtonText}</Button>
      </Col>
    </Row>
  )
}