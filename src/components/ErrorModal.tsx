import { Modal, Button } from "react-bootstrap"

export interface ErrorModalProps {
    error: string
    hideCloseButton: boolean
    showModal: boolean
    showRetryButton: boolean
    handleClose: () => void
    onCloseClicked?: () => void
    onRetryClicked?: () => void
}

export const ErrorModal = (props: ErrorModalProps) => {
    const onRetryClicked = () => {
        if (props.onRetryClicked != undefined) props.onRetryClicked()
        props.handleClose()
    }

    const onCloseClicked = () => {
        if (props.onCloseClicked != undefined) props.onCloseClicked()
        props.handleClose()
    }
    
    return (
        <Modal show={props.showModal}>
            <Modal.Header>
                <Modal.Title>Error!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                    <p>{props.error}</p>
            </Modal.Body>
            
            <Modal.Footer>
                { props.showRetryButton && 
                    <Button variant="primary" onClick={onRetryClicked}>Retry</Button>
                }
                { !props.hideCloseButton &&
                    <Button variant="secondary" onClick={onCloseClicked}>Close</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}