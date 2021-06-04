import React from 'react'
import { Row, Col, Button, DropdownButton, Dropdown } from 'react-bootstrap'

export const Menu = () => {
  return (
    <Row className="justify-content-end">
      <Col md="auto">
        <Button variant="primary">Complete All</Button>
      </Col>
      <Col md="auto">
        <Button variant="primary">Clear Completed</Button>
      </Col>
      <Col md="auto">
        <DropdownButton id="dropdown-basic-button" title="All">
          <Dropdown.Item href="#/action-1">All</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Complete</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Incomplete</Dropdown.Item>
        </DropdownButton>
      </Col>
    </Row>
  )
}