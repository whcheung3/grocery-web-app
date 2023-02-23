import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UpdateProduct(props) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);

  async function deleteProduct() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${props.id}`,
      {
        method: "DELETE",
      }
    );
    response.ok ? setIsDeleted(true) : setIsError(true);
  }

  return (
    <>
      {/* Message */}
      {isDeleted && (
        <Alert key={"success"} variant={"success"}>
          History Deleted!
        </Alert>
      )}
      {isError && (
        <Alert key={"danger"} variant={"danger"}>
          Unable to Delete History!
        </Alert>
      )}

      <Row>
        <Form></Form>
        <Col>
          <Button
            className="float-end"
            variant="danger"
            size="sm"
            onClick={deleteProduct}
          >
            Delete Product
          </Button>
        </Col>
      </Row>
    </>
  );
}
