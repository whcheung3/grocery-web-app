import useSWR from "swr";
import Error from "next/error";
import {
  Card,
  CloseButton,
  Tab,
  Tabs,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import ProductInfo from "@/components/ProductInfo";
import PriceHistory from "@/components/PriceHistory";
import UpdatePrice from "@/components/UpdatePrice";
import UpdateProduct from "@/components/UpdateProduct";

export default function ProductDetail(props) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${props.id}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }
  if (!data) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <Card>
      <Card.Header>
        <Row className="mt-2">
          <Col>
            <Card.Title>{data?.brand + " " + data?.name}</Card.Title>
          </Col>
          <Col>
            <CloseButton
              className="float-end"
              variant="white"
              onClick={props.close}
            />
          </Col>
        </Row>
      </Card.Header>

      <Tabs defaultActiveKey="info" className="mb-3 text-nowrap" justify>
        {/* Information*/}
        <Tab eventKey="info" title="Information">
          <Card.Body>
            <ProductInfo data={data} />
          </Card.Body>
        </Tab>

        {/* Price History */}
        <Tab eventKey="history" title="Price History">
          <Card.Body>
            <PriceHistory id={props.id} data={data} />
          </Card.Body>
        </Tab>

        {/* Report Price */}
        <Tab eventKey="report" title="Report Price">
          <Card.Body>
            <UpdatePrice id={props.id} />
          </Card.Body>
        </Tab>

        {/* Update Product */}
        <Tab eventKey="update" title="Update Product">
          <Card.Body>
            <UpdateProduct id={props.id} />
          </Card.Body>
        </Tab>
      </Tabs>
    </Card>
  );
}
