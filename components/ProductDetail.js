import useSWR from "swr";
import Error from "next/error";
// import Image from "next/image";
import { useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";

export default function ProductDetail(props) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${props.clickedId}`
  );
  const [lowest, setLowest] = useState();

  useEffect(() => {
    if (data != null && data != undefined) {
      let temp = [];
      data?.history?.map((i) => temp.push(i.price));
      setLowest(Math.min(...temp));
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  } else if (data == null || data == undefined) {
    return null;
  } else {
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
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={6} md={4}>
              <img
                src={data?.image}
                alt={data?.name}
                height={300}
                width={300}
              />
            </Col>
            <Col xs={10} md={6}>
              <strong>Universal Product Code: </strong>
              {data?.upc?.substring(0, 1)}&nbsp;
              {data?.upc?.substring(1, 6)}&nbsp;
              {data?.upc?.substring(6, 11)}&nbsp;
              {data?.upc?.substring(11, 12)}
              <br />
              <strong>Category: </strong>
              {data?.category?.join(", ")}
              <br />
              <strong>Size: </strong>
              {data?.size}
              <br />
              <hr />
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
              <hr />
              <strong>Lowest Price: </strong>
              {lowest}
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={props.close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
