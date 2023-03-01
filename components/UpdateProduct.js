import { Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ConfirmDelete from "@/components/ConfirmDelete";

export default function UpdateProduct(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Modal */}
      <ConfirmDelete
        show={show}
        close={() => setShow(false)}
        id={props.id}
        target={"product"}
      />

      <Row>
        <Form>Coming Soon...</Form>
        <Col>
          <Button
            className="float-end"
            variant="danger"
            size="sm"
            onClick={() => {
              setShow(true);
            }}
          >
            Delete Product
          </Button>
        </Col>
      </Row>
    </>
  );
}
