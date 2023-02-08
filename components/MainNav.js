import {
  Nav,
  Navbar,
  Container,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function MainNav(props) {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  async function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    props.setSearchField(searchField); // pass to props
    setIsExpanded(false);
    router.push("/");
  }

  return (
    <>
      <Navbar
        expanded={isExpanded}
        bg="info"
        variant="dark"
        expand="md"
        className="mb-3 text-nowrap"
      >
        <Container>
          <Navbar.Toggle
            onClick={() =>
              isExpanded ? setIsExpanded(false) : setIsExpanded(true)
            }
            aria-controls="offcanvasNavbar-expand-md"
          />

          {/* act as refresh*/}
          <Nav.Link href="/">
            <Navbar.Brand>
              <img
                alt=""
                src="https://em-content.zobj.net/thumbs/120/apple/325/money-with-wings_1f4b8.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              &nbsp;Grocery Price Tracker
            </Navbar.Brand>
          </Nav.Link>

          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="start"
          >
            <Offcanvas.Header>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                <img
                  alt=""
                  src="https://em-content.zobj.net/thumbs/120/apple/325/money-with-wings_1f4b8.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
                &nbsp;Grocery Price Tracker
              </Offcanvas.Title>
              <Button variant="lgiht" onClick={() => setIsExpanded(false)}>
                &#x2715;
              </Button>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto  my-lg-0" style={{ maxHeight: "100px" }}>
                <Link href="/" passHref>
                  <Nav.Link
                    active={router.pathname === "/"}
                    disabled={router.pathname === "/"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Home
                  </Nav.Link>
                </Link>
                <Link href="/addProduct" passHref>
                  <Nav.Link
                    active={router.pathname === "/addProduct"}
                    disabled={router.pathname === "/addProduct"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Add Product
                  </Nav.Link>
                </Link>
                <Link href="/calculator" passHref>
                  <Nav.Link
                    active={router.pathname === "/calculator"}
                    disabled={router.pathname === "/calculator"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Calculator
                  </Nav.Link>
                </Link>
              </Nav>
              &nbsp;
              <hr />
              <Form className="d-flex" onSubmit={submitForm}>
                <Form.Control
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                  type="search"
                  placeholder="Search by Name"
                  className="me-2"
                  aria-label="Search"
                />
                <Button type="submit" variant="success">
                  Search
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
