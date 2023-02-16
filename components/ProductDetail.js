import useSWR from "swr";
import Error from "next/error";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button, Modal, Row, Col, CloseButton } from "react-bootstrap";
import UpdateProduct from "@/components/UpdateProduct";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function ProductDetail(props) {
  const { data, error } = useSWR(
    props.clickedId
      ? `${process.env.NEXT_PUBLIC_API_URL}/${props.clickedId}`
      : null
  );
  const [lowest, setLowest] = useState();

  useEffect(() => {
    if (data) {
      let temp = [];
      data?.history?.map((i) => temp.push(i.price));
      setLowest(Math.min(...temp));
    }
  }, [data]);

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

      <Tabs defaultActiveKey="info" className="mb-3" justify>
        <Tab eventKey="info" title="Information">
          <Modal.Body>
            <Row>
              <Col className="d-flex justify-content-center">
                <Image
                  src={
                    data?.image
                      ? data?.image
                      : `https://via.placeholder.com/250`
                  }
                  alt={data?.name}
                  height={300}
                  width={250}
                  objectFit="contain"
                />
              </Col>
              <Col>
                <strong>UPC: </strong>
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
                <strong>Category: </strong>
                {data?.category?.join(", ")}
                <br />
                <strong>Size: </strong>
                {data?.size}
                <br />
                <br />
                <strong>Price History: </strong>
                {data?.history?.map((hist) => (
                  <div key={hist._id}>
                    <strong>Store: </strong>
                    {hist?.store} <br />
                    <strong>Original Price: </strong>${hist?.was_price} <br />
                    <strong>Price: </strong>${hist?.price} <br />
                    <strong>Valid To: </strong>
                    {new Date(hist?.valid_to).toLocaleDateString()}
                  </div>
                ))}
                <br />
                <strong>Lowest Price: </strong>${lowest}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={props.close}>
              Close
            </Button>
          </Modal.Footer>
        </Tab>
        <Tab eventKey="update" title="Add New Price History">
          <Modal.Body>
            <UpdateProduct id={props.clickedId} />
          </Modal.Body>
        </Tab>
      </Tabs>
    </Modal>
  );
}
