import useSWR from "swr";
import Error from "next/error";
import { useRouter } from "next/router";
import { Row, Col, Pagination, Spinner } from "react-bootstrap";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

export default function Product() {
  const router = useRouter();
  const PER_PAGE = 8;
  const [page, setPage] = useState(1);
  let q = router.asPath.split("?")[1];
  const { data, error } = useSWR(
    q
      ? `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&perPage=${PER_PAGE}&${q}`
      : `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&perPage=${PER_PAGE}`
  );

  function handleShow(e) {
    router.push(`/product/${e.currentTarget.getAttribute("id")}`);
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
  return (
    <>
      {/* Search Bar */}
      <SearchBar setPage={setPage} />

      {data.length == 0 ? (
        "No Results Found"
      ) : (
        <>
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
        </>
      )}
    </>
  );
}
