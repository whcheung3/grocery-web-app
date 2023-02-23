import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function SearchBar(props) {
  const router = useRouter();
  const [input, setInput] = useState("");

  async function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    props.setSearchField(input); // pass to upper level props
    props.setPage(1); // pass to upper level props
    router.push("/");
  }

  return (
    <Form className="d-flex mb-4" onSubmit={submitForm}>
      <Form.Control
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="search"
        placeholder="Search by Name / Brand / UPC / Category"
        aria-label="Search"
      />
      <div className="vr ms-2 me-1" />
      <Button type="submit" variant="light">
        &#x1F50D;
      </Button>
    </Form>
  );
}
