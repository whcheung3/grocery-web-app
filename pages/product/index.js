import useSWR from "swr";
import Error from "next/error";
// import Image from "next/image";
import { Table, Container, Row, Col, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import ProductDetail from "@/components/ProductDetail";

export default function Product(props) {
  var counter = 0;
  const perPage = 10;
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [clickedId, setClickedId] = useState();
  const { data, error } = useSWR(
    props.searchField
      ? `${process.env.NEXT_PUBLIC_API_URL}?page=${page}&perPage=${perPage}&name=${props.searchField}`
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
    perPage < data.length && setPage(page + 1);
  }

  if (error) {
    return <Error statusCode={404} />;
  } else if (data == null || data == undefined) {
    return null;
  } else {
    return (
      <>
        {data.length > 0 ? (
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Name</th>
                <th>Size</th>
                <th>Store</th>
                <th>Sale Price</th>
                <th>Valid Date</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr
                  onClick={handleShow}
                  data-id={product.upc}
                  key={product._id}
                >
                  <td>{++counter}</td>
                  <td>{product?.category.join("</br>")}</td>
                  <td>{product?.brand}</td>
                  <td>{product?.name}</td>
                  <td>{product?.size}</td>
                  <td>{product?.history[product.history.length - 1]?.store}</td>
                  <td>
                    ${product?.history[product.history.length - 1]?.price}
                  </td>
                  <td>
                    {new Date(
                      product?.history[product.history.length - 1]?.valid_to
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    <img
                      src={product?.image}
                      alt={product?.name}
                      width={100}
                      height={100}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Container>
            <Row>
              <Col>Try searching for something else.</Col>
            </Row>
          </Container>
        )}

        {/* Pagination */}
        {data.length > perPage && (
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
        )}

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
