import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import ConfirmDelete from "@/components/ConfirmDelete";
import { toast } from "react-toastify";

export default function PriceHistory(props) {
  const [show, setShow] = useState(false);
  const [clickedHistoryId, setClickedHistoryId] = useState();

  function perUnitSwitch(unit, size, price) {
    // keep the same unit for easier compare
    switch (unit) {
      case "ml":
        return `$${((price / size) * 100).toFixed(4)} / 100ml`;
      case "g":
        return `$${((price / size) * 100).toFixed(4)} / 100g`;
      case "kg":
        return `$${(price / size / 10).toFixed(4)} / 100g`;
      case "l":
        return `$${(price / size / 10).toFixed(4)} / 100ml`;
      default:
        return `$${(price / size).toFixed(4)} / ${unit}`;
    }
  }

  async function checkIsLastHistory() {
    // cannot delete the last price history of a product
    if (props.data?.history?.length <= 1) throw new Error();
  }

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
          <Col className="text-nowrap">
            <strong>Store: </strong>
            <br />
            {hist?.store}
            <br />

            <strong>Sale Price: </strong>
            <br />
            {"$" + hist?.price.toFixed(2)}
            <br />

            {/* Per Unit Calculation */}
            <strong>Price Per Unit: </strong>
            <br />
            {perUnitSwitch(props.data?.unit, props.data?.size, hist?.price)}
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
              onClick={() => {
                setClickedHistoryId(hist._id);
                checkIsLastHistory()
                  .then(() => setShow(true))
                  .catch(() =>
                    toast.error("Must have at least one history", {
                      position: "top-center",
                      autoClose: 5000,
                    })
                  );
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
