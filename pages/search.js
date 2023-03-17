import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
// import { useAtom } from "jotai";
// import { searchHistoryAtom } from "../store";
// import { addToHistory } from "../lib/userData";

export default function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit } = useForm({});
  //   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function submitForm(data) {
    let queryString = `${data.q}`;
    // let queryString = `${data.searchBy}=true`;
    // queryString += data.geoLocation && `&geoLocation=${data.geoLocation}`;
    // queryString += data.medium && `&medium=${data.medium}`;
    // queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`;

    router.push(`/product?q=${queryString}`);

    // setSearchHistory(await addToHistory(queryString));
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              {...register("q")}
              type="text"
              placeholder=""
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select
            {...register("searchBy")}
            name="searchBy"
            className="mb-3"
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="brand">Brand</option>
            <option value="upc">UPC</option>
            <option value="store">Store</option>
          </Form.Select>
        </Col>
        {/* <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control
              {...register("geoLocation")}
              type="text"
              placeholder=""
              name="geoLocation"
            />
            <Form.Text className="text-muted">
              Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;,
              &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.),
              with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control
              {...register("medium")}
              type="text"
              placeholder=""
              name="medium"
            />
            <Form.Text className="text-muted">
              Case Sensitive String (ie: &quot;Ceramics&quot;,
              &quot;Furniture&quot;, &quot;Paintings&quot;,
              &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple
              values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col> */}
      </Row>
      {/* <Row>
        <Col>
          <Form.Check
            {...register("isHighlight")}
            type="checkbox"
            label="Highlighted"
            name="isHighlight"
          />
          <Form.Check
            {...register("isOnView")}
            type="checkbox"
            label="Currently on View"
            name="isOnView"
          />
        </Col>
      </Row> */}
      <Row>
        <Col>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
