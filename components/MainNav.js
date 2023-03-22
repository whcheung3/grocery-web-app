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
          <Link href="/" passHref>
            <Navbar.Brand className="d-flex">
              <Image
                alt="logo"
                src="https://res.cloudinary.com/whcheung3/image/upload/v1679455835/logo/logo_pohwmr.png"
                width={240}
                height={30}
                quality={100}
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="start"
          >
            <Offcanvas.Header>
              <Offcanvas.Title
                className="d-flex"
                id="offcanvasNavbarLabel-expand-md"
              >
                <Image
                  alt="logo"
                  src="https://res.cloudinary.com/whcheung3/image/upload/v1679456252/logo/logo_dark_urapbs.png"
                  width={240}
                  height={30}
                  quality={100}
                />
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

                <Link href="/search" passHref>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Search
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
