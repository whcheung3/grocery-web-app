import Image from "next/image";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

export default function ProductInfo(props) {
  const [lowest, setLowest] = useState();

  useEffect(() => {
    if (props.data) {
      let temp = [];
      props.data?.history?.map((i) => temp.push(i.price));
      setLowest(Math.min(...temp));
    }
  }, [props.data]);

  return (
    <Row>
      <Col className="d-flex justify-content-center">
        <Image
          src={
            props.data?.image
              ? props.data?.image
              : `https://via.placeholder.com/200`
          }
          alt={props.data?.name}
          height={200}
          width={200}
          objectFit="contain"
        />
      </Col>
      <Col className="align-self-center">
        <strong>UPC:</strong>
        <br />
        {props.data?.upc
          ? props.data?.upc?.substring(0, 1) +
            " " +
            props.data?.upc?.substring(1, 6) +
            " " +
            props.data?.upc?.substring(6, 11) +
            " " +
            props.data?.upc?.substring(11, 12)
          : "N/A"}
        <br />
        <strong>Category:</strong>
        <br />
        {props.data?.category?.join(", ")}
        <br />
        <strong>Size:</strong>
        <br />
        {props.data?.size + props.data?.unit}
        <br />
      </Col>
    </Row>
  );
}
