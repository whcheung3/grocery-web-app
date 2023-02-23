import { useState, useEffect } from "react";
import { Button, Row, Col, Alert } from "react-bootstrap";

export default function PriceHistory(props) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);

  async function deleteHistory(historyId) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${props.id}/delete/${historyId}`,
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

      {props.data?.history?.map((hist) => (
        <Row key={hist._id}>
          <Col>
            <strong>Store: </strong>
            <br />
            {hist?.store}
            <br />

            <strong>Sale Price: </strong>
            <br />
            {"$" + hist?.price.toFixed(2)}
            <br />

            {/* multiply 100 if unit is g / ml */}
            <strong>Price Per Unit: </strong>
            <br />
            {props.data?.unit == "g" || props.data?.unit == "ml" ? (
              <>
                {`$${((hist?.price / props.data?.size) * 100).toFixed(
                  2
                )} / 100${props.data?.unit}`}
              </>
            ) : (
              <>{`$${(hist?.price / props.data?.size).toFixed(2)} / ${
                props.data?.unit
              }`}</>
            )}
            <br />

            <strong>Valid To: </strong>
            <br />
            {new Date(hist?.valid_to).toLocaleDateString()}
            <br />
            <br />
          </Col>

          <Col>
            <Button
              className="float-end"
              variant="danger"
              size="sm"
              id={hist._id}
              onClick={(e) => deleteHistory(e.currentTarget.getAttribute("id"))}
            >
              &times;
            </Button>
          </Col>
        </Row>
      ))}
    </>
  );
}
