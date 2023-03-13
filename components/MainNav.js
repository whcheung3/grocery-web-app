import {
  Nav,
  Navbar,
  Container,
  Offcanvas,
  CloseButton,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

export default function MainNav() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Navbar
        expanded={isExpanded}
        bg="primary"
        variant="dark"
        expand="md"
        className="text-nowrap"
      >
        <Container>
          <Navbar.Toggle
            onClick={() =>
              isExpanded ? setIsExpanded(false) : setIsExpanded(true)
            }
            aria-controls="offcanvasNavbar-expand-md"
          />
          {/* act as refresh*/}
          <Link href="/" passHref>
            <Navbar.Brand>
              <Image
                alt="logo"
                src="https://em-content.zobj.net/thumbs/120/apple/325/money-with-wings_1f4b8.png"
                width={25}
                height={25}
              />
              &nbsp;Grocery Price Tracker
            </Navbar.Brand>
          </Link>
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="start"
          >
            <Offcanvas.Header>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                <Image
                  alt="logo"
                  src="https://em-content.zobj.net/thumbs/120/apple/325/money-with-wings_1f4b8.png"
                  width={25}
                  height={25}
                />
                &nbsp;Grocery Price Tracker
              </Offcanvas.Title>
              <CloseButton onClick={() => setIsExpanded(false)} />
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto  my-lg-0" style={{ maxHeight: "100px" }}>
                <Link href="/product" passHref>
                  <Nav.Link
                    active={router.pathname === "/product"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Lowest Price
                  </Nav.Link>
                </Link>

                <Link href="/add" passHref>
                  <Nav.Link
                    active={router.pathname === "/add"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Add Product
                  </Nav.Link>
                </Link>

                <Link href="/calculator" passHref>
                  <Nav.Link
                    active={router.pathname === "/calculator"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Calculator
                  </Nav.Link>
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
