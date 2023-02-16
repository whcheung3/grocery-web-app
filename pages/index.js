import Product from "@/pages/product/index";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");

  async function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    props.setSearchField(searchField); // pass to props
    router.push("/");
  }

  return (
    <>
      {/* Search Bar */}
      <Form className="d-flex mb-4" onSubmit={submitForm}>
        <Form.Control
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          type="search"
          placeholder="Search by Name"
          aria-label="Search"
        />
        <div className="vr ms-2 me-1" />
        <Button type="submit" variant="light">
          &#x1F50D;
        </Button>
      </Form>

      <Product searchField={props.searchField} />
    </>
  );
}
