import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ConfirmDelete(props) {
  async function del(target) {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/${props.id}`;

    if (target == "history") {
      url += `/delete/${props.historyId}`;
    }

    const response = await fetch(url, {
      method: "DELETE",
    });

    response.ok
      ? toast.success("Deleted!", {
          position: "top-center",
          autoClose: 5000,
        })
      : toast.error("Delele Fail!", {
          position: "top-center",
          autoClose: 5000,
        });
  }

  return (
    <Modal size="sm" show={props.show} onHide={props.close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you confirm to delete?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            del(props.target).then(props.close);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
