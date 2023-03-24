import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";

export default function Home({ data }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchField, setSearchField] = useState("");

  function handleShow(e) {
    router.push(`/product/${e.currentTarget.getAttribute("id")}`);
  }

  return (
    <>
      {/* Hero Section */}
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
                <button className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">
                  Browse All
                </button>
              </Link>

              <Link href="/search" passHref>
                <button className="btn btn-outline-success btn-lg px-4">
                  Advanced Search
                </button>
              </Link>
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

      {/* Commonly Purchased Products: Egg / Milk / Bread */}
      <Container className="mt-5">
        <Row className="p-4 align-items-center rounded-3 border shadow-lg">
          <h3 className="p-4 pb-0">Commonly Purchased Products</h3>
          <Row xs={1} md={2} lg={4} className="g-4 mt-0">
            {data.eggData?.map((product) => (
              <Col key={product._id} id={product._id} onClick={handleShow}>
                <ProductCard id={product._id} />
              </Col>
            ))}
            {data.milkData?.map((product) => (
              <Col key={product._id} id={product._id} onClick={handleShow}>
                <ProductCard id={product._id} />
              </Col>
            ))}
            {data.breadData?.map((product) => (
              <Col key={product._id} id={product._id} onClick={handleShow}>
                <ProductCard id={product._id} />
              </Col>
            ))}
            <Col className="d-flex justify-content-center">
              <Link href="/product" passHref>
                <button className="btn btn-outline-secondary align-self-center">
                  and more...
                </button>
              </Link>
            </Col>
          </Row>
        </Row>
      </Container>

      {/* On Sale Offers */}
      <Container className="mt-5">
        <Row className="p-4 align-items-center rounded-3 border shadow-lg">
          <h3 className="p-4 pb-0">On Sale Offers</h3>
          <Row xs={1} md={2} lg={4} className="g-4 mt-0">
            {data.onSaleData?.map((product) => (
              <Col key={product._id} id={product._id} onClick={handleShow}>
                <ProductCard id={product._id} />
              </Col>
            ))}
            <Col className="d-flex justify-content-center">
              <Link href="/product" passHref>
                <button className="btn btn-outline-secondary align-self-center">
                  and more...
                </button>
              </Link>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const eggData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?page=1&perPage=3&q=egg`
  ).then((res) => res.json());

  const breadData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?page=1&perPage=3&q=bread`
  ).then((res) => res.json());

  const milkData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?page=1&perPage=3&q=milk`
  ).then((res) => res.json());

  const onSaleData = [];
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?page=1&perPage=7`)
    .then((res) => res.json())
    .then((data) =>
      data?.map((product) =>
        product.history.map(
          (history) =>
            new Date(history.valid_to) >= new Date() && onSaleData.push(product)
        )
      )
    );

  return {
    props: {
      data: {
        eggData,
        breadData,
        milkData,
        onSaleData,
      },
    },
  };
}
