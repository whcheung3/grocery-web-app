import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchField, setSearchField] = useState("");
  const { data: eggData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}?page=1&perPage=3&q=egg`
  );
  const { data: breadData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}?page=1&perPage=3&q=bread`
  );
  const { data: milkData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}?page=1&perPage=3&q=milk`
  );

  function handleShow(e) {
    router.push(`/product/${e.currentTarget.getAttribute("id")}`);
  }

  return (
    <>
      <Container>
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
              current week. So what about the lowest price of a product
              recently? Now you can monitor and find the lowest prices with
              Grocery Price Tracker.
            </p>

            <SearchBar
              searchField={searchField}
              setSearchField={setSearchField}
              setPage={setPage}
            />

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
                onClick={() => {}}
                disabled
              >
                Coming Soon
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
      <Container className="mt-5">
        <Row className="p-4 align-items-center rounded-3 border shadow-lg">
          {/* Card */}
          <h3 className="p-4 pb-0">Commonly Purchased Products:</h3>
          <Row xs={1} md={2} lg={4} className="g-4 mp-0">
            {eggData?.map((product) => (
              <Col key={product._id} id={product._id} onClick={handleShow}>
                <ProductCard id={product._id} />
              </Col>
            ))}
            {milkData?.map((product) => (
              <Col key={product._id} id={product._id} onClick={handleShow}>
                <ProductCard id={product._id} />
              </Col>
            ))}
            {breadData?.map((product) => (
              <Col key={product._id} id={product._id} onClick={handleShow}>
                <ProductCard id={product._id} />
              </Col>
            ))}
            <Col className="d-flex justify-content-center">
              <big className="align-self-center">and more...</big>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}
