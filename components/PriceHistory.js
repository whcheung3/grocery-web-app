import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import ConfirmDelete from "@/components/ConfirmDelete";

export default function PriceHistory(props) {
  const [show, setShow] = useState(false);
  const [clickedHistoryId, setClickedHistoryId] = useState();

  return (
    <>
      {/* Modal */}
      <ConfirmDelete
        show={show}
        close={() => setShow(false)}
        id={props.id}
        historyId={clickedHistoryId}
        target={"history"}
      />

      {/* History */}
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
              onClick={() => {
                setClickedHistoryId(hist._id);
                setShow(true);
              }}
            >
              &times;
            </Button>
          </Col>
        </Row>
      ))}
    </>
  );
}
