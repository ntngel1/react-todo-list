import { Container, Modal, Spinner, Row } from "react-bootstrap"

export interface LoaderModalProps {
    show: boolean
}

export const LoaderModal = (props: LoaderModalProps) => {
    return (
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container fluid="md">
            <Row className="justify-content-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    )
}