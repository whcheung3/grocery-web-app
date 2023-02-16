import useSWR from "swr";
import Error from "next/error";
import { Row, Col, Pagination, Spinner } from "react-bootstrap";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import SearchBar from "@/components/SearchBar";

export default function Product() {
  const PER_PAGE = 8;
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [clickedId, setClickedId] = useState();
  const [searchField, setSearchField] = useState("");
  const { data, error } = useSWR(
    searchField
      ? `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&perPage=${PER_PAGE}&q=${searchField}`
      : `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&perPage=${PER_PAGE}`
  );

  function handleShow(e) {
    setShow(true);
    setClickedId(e.currentTarget.getAttribute("id"));
  }
  function previousPage() {
    page > 1 && setPage(page - 1);
  }
  function nextPage() {
    PER_PAGE == data.length && setPage(page + 1);
  }

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
  if (data.length == 0) {
    return (
      <>
        <SearchBar
          searchField={searchField}
          setSearchField={setSearchField}
          setPage={setPage}
        />
        No Result
      </>
    );
  }
  return (
    <>
      {/* Search Bar */}
      <SearchBar
        searchField={searchField}
        setSearchField={setSearchField}
        setPage={setPage}
      />

      {/* Card */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {data?.map((product) => (
          <Col key={product._id} id={product._id} onClick={handleShow}>
            <ProductCard id={product._id} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <br />
      <Row>
        <Col>
          <Pagination className="float-end">
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </Col>
      </Row>

      {/* Modal */}
      <ProductDetail id={clickedId} show={show} close={() => setShow(false)} />
    </>
  );
}
