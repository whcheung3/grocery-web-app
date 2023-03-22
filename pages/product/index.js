import useSWR from "swr";
import Error from "next/error";
import { useRouter } from "next/router";
import { Row, Col, Pagination, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { toast } from "react-toastify";

export default function Product() {
  const router = useRouter();
  const queryString = router.asPath.split("?")[1];
  const PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const [searchField, setSearchField] = useState("");
  const { data, error } = useSWR(
    queryString
      ? `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&perPage=${PER_PAGE}&${queryString}`
      : `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&perPage=${PER_PAGE}`
  );

  useEffect(() => {
    // for displaying the search query in search bar
    if (queryString) setSearchField(decodeURI(queryString.slice(2)));
  }, [queryString]);

  function handleShow(e) {
    router.push(`/product/${e.currentTarget.getAttribute("id")}`);
  }

  function previousPage() {
    page > 1 && setPage(page - 1);
  }

  function nextPage() {
    PER_PAGE == data.length
      ? setPage(page + 1)
      : toast.info("You have reached the end!", {
          position: "top-center",
          autoClose: 5000,
        });
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
      <SearchBar
        searchField={searchField}
        setSearchField={setSearchField}
        setPage={setPage}
      />

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
