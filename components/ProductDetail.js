import useSWR from "swr";
import Error from "next/error";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  CloseButton,
  Tab,
  Tabs,
  Alert,
} from "react-bootstrap";
import UpdatePrice from "@/components/UpdatePrice";
import UpdateProduct from "@/components/UpdateProduct";

export default function ProductDetail(props) {
  const { data, error } = useSWR(
    props.id ? `${process.env.NEXT_PUBLIC_API_URL}/${props.id}` : null
  );
  const [lowest, setLowest] = useState();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (data) {
      let temp = [];
      data?.history?.map((i) => temp.push(i.price));
      setLowest(Math.min(...temp));
    }
  }, [data]);

  async function deleteHistory(historyId) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${props.id}/delete/${historyId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{ "_id": "${historyId}" }`,
      }
    );
    if (response.ok) {
      setIsDeleted(true);
    } else {
      console.error("Unable to delete history");
    }
  }

  async function deleteProduct() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${props.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setIsDeleted(true);
    } else {
      console.error("Unable to delete product");
    }
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.close}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>
          {data?.brand} {data?.name}
        </Modal.Title>
        <CloseButton onClick={props.close} />
      </Modal.Header>

      {/* Information*/}
      <Tabs defaultActiveKey="info" className="mb-3 text-nowrap" justify>
        <Tab eventKey="info" title="Information">
          <Modal.Body>
            {isDeleted && (
              <Alert key={"success"} variant={"success"}>
                Product Deleted!
              </Alert>
            )}
            <Row>
              <Col className="d-flex justify-content-center">
                <Image
                  src={
                    data?.image
                      ? data?.image
                      : `https://via.placeholder.com/200`
                  }
                  alt={data?.name}
                  height={200}
                  width={200}
                  objectFit="contain"
                />
              </Col>
              <Col>
                <strong>UPC:</strong>
                <br />
                {data?.upc
                  ? data?.upc?.substring(0, 1) +
                    " " +
                    data?.upc?.substring(1, 6) +
                    " " +
                    data?.upc?.substring(6, 11) +
                    " " +
                    data?.upc?.substring(11, 12)
                  : "N/A"}
                <br />
                <strong>Category:</strong>
                <br />
                {data?.category?.join(", ")}
                <br />
                <strong>Size:</strong>
                <br />
                {data?.size}
                {data?.unit}
                <br />
                <strong>Lowest Price:</strong>
                <br />${lowest}
              </Col>
            </Row>
          </Modal.Body>
        </Tab>

        {/* Price History */}
        <Tab eventKey="history" title="Price History">
          <Modal.Body>
            {isDeleted && (
              <Alert key={"success"} variant={"success"}>
                History Deleted!
              </Alert>
            )}
            {data?.history?.map((hist) => (
              <Row key={hist._id}>
                <Col>
                  <strong>Store: </strong>
                  <br />
                  {hist?.store} <br />
                  <strong>Sale Price: </strong>
                  <br />
                  {"$"}
                  {hist?.price} <br />
                  {/* Per Unit Calculation */}
                  <strong>Price Per Unit: </strong>
                  <br />
                  {"$"}
                  {(hist?.price / data?.size).toFixed(5)}
                  {" / "}
                  {data?.unit}
                  <br />
                  <strong>Valid To: </strong>
                  <br />
                  {new Date(hist?.valid_to).toLocaleDateString()}
                  <br /> <br />
                </Col>
                <Col>
                  <Button
                    className="float-end"
                    variant="danger"
                    size="sm"
                    id={hist._id}
                    onClick={(e) =>
                      deleteHistory(e.currentTarget.getAttribute("id"))
                    }
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Modal.Body>
        </Tab>

        {/* Report New Price */}
        <Tab eventKey="report" title="Report Price">
          <Modal.Body>
            <UpdatePrice id={props.id} />
          </Modal.Body>
        </Tab>

        {/* Modify */}
        <Tab eventKey="update" title="Update Product">
          <Modal.Body>
            <UpdateProduct id={props.id} />
          </Modal.Body>
        </Tab>
      </Tabs>
    </Modal>
  );
}
