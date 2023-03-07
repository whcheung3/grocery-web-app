import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";

export default function SearchBar(props) {
  const router = useRouter();

  async function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    props.setPage(1); // reset to the first page
    router.push(`/product?q=${props.searchField}`);
  }

  return (
    <Form className="d-flex mb-4" onSubmit={submitForm}>
      <Form.Control
        value={props.searchField}
        onChange={(e) => props.setSearchField(e.target.value)}
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
