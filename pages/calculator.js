import { Button, Form, Col, Row, Stack } from "react-bootstrap";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

export default function Calculator() {
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setResults([...results, `$${(price / size).toFixed(4)} / ${unit}`]);
    setShowResults(true);
  }

  function reset() {
    setPrice("");
    setSize("");
    setUnit("");
    setResults([]);
    setShowResults(false);
  }

  function clear() {
    setPrice("");
    setSize("");
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="price">
          <Form.Label column sm={2}>
            Price
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              autoFocus
              required
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step=".01"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="size">
          <Form.Label column sm={2}>
            Size
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Enter Size"
              required
              inputMode="decimal"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              min="0"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="unit">
          <Form.Label column sm={2}>
            Unit
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              aria-label="Select Unit"
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Unit
              </option>
              <option value="ea">ea</option>
              <option value="g">g</option>
              <option value="lb">lb</option>
              <option value="ml">ml</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Col sm={{ span: 10, offset: 2 }}>
          <Stack direction="horizontal" gap={3}>
            <Button variant="success" type="submit">
              Submit
            </Button>
            <div className="vr" />
            <Button variant="warning" onClick={clear}>
              Clear
            </Button>
            <div className="ms-auto" />
            <Button variant="danger" onClick={reset}>
              Reset
            </Button>
          </Stack>
        </Col>
      </Form>

      {showResults && (
        <>
          <hr />
          <h5>Price per Unit</h5>
          <ListGroup as="ol" numbered>
            {results.map((result) => (
              <ListGroup.Item as="li" key={result}>
                {result}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </>
  );
}
