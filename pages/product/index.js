import useSWR from "swr";
import Error from "next/error";
// import Image from "next/image";
import { Row, Col, Pagination, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";

export default function Product(props) {
  var counter = 0;
  const perPage = 12;
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [clickedId, setClickedId] = useState();
  const { data, error } = useSWR(
    props.searchField
      ? `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&perPage=${perPage}&q=${props.searchField}`
      : `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&perPage=${perPage}`
  );

  function handleShow(e) {
    setShow(true);
    setClickedId(e.currentTarget.getAttribute("data-id"));
  }
  function previousPage() {
    page > 1 && setPage(page - 1);
  }
  function nextPage() {
    page < data.length && setPage(page + 1);
  }

  if (error) {
    return <Error statusCode={404} />;
  } else if (data == null || data == undefined) {
    return (
      <div class="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  } else {
    return (
      <>
        <Row xs={1} md={2} lg={4} className="g-4">
          {data?.map((product) => (
            <Col key={product.upc} data-id={product.upc} onClick={handleShow}>
              <ProductCard upc={product.upc} />
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <>
          <br />
          <Row>
            <Col>
              <Pagination className="float-end" disabled={data.length <= 0}>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        </>

        {/* Modal */}
        <ProductDetail
          clickedId={clickedId}
          show={show}
          close={() => setShow(false)}
        />
      </>
    );
  }
}
