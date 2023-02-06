import { Nav, Navbar, Container, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function MainNav(props) {
  // const router = useRouter();
  const [searchField, setSearchField] = useState("");

  async function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    props.setSearchField(searchField); // pass to props
  }

  return (
    <>
      <Navbar collapseOnSelect bg="info" variant="dark" expand="lg">
        <Container>
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

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>

              <Link href="/addProduct" passHref>
                <Nav.Link>Add Product</Nav.Link>
              </Link>

              <Link href="/calculator" passHref>
                <Nav.Link>Calculator</Nav.Link>
              </Link>
            </Nav>

            <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button type="submit" variant="success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
