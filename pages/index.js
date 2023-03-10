import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);

  return (
    <Container>
      {show && <SearchBar />}
      <Row className="p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <Col className="lg-7 p-3 p-lg-5 pt-lg-3">
          <h1 className="display-5fw-bold mb-5">
            Save money with
            <br />
            Grocery Price Tracker
          </h1>
          <p className="lead mb-5">
            Nowadays, the cost of living is keep increasing because of
            inflation. Watching flyers has become our weekly routine. However,
            flyers can only tell which stores are offering a better deal in
            current week. So what about the lowest price of a product recently?
            Now you can monitor and find the lowest prices with Grocery Price
            Tracker.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <Link href="/product" passHref>
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
              >
                Get Started
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
              onClick={() => setShow(true)}
            >
              Search
            </button>
          </div>
        </Col>
        <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <Image
            src="/cart.jpg"
            alt=""
            width="720"
            height="1280"
            objectFit="cover"
            priority
          />
        </div>
      </Row>
    </Container>
  );
}
