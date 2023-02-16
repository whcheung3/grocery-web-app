import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm();

  async function onSubmit(data) {
    data.history[0].valid_to += "T23:59:59Z"; // make date until day end
    await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isSubmitSuccessful && (
        <Alert key={"success"} variant={"success"}>
          New Product Added!
        </Alert>
      )}

      {errors?.root?.server && (
        <Alert key={"danger"} variant={"danger"}>
          Add Product Failed!
        </Alert>
      )}

      <Row className="mb-3">
        <Form.Group as={Col} controlId="upc">
          <Form.Label>Universal Product Code</Form.Label>
          <Form.Control
            {...register("upc")}
            pattern="^\d{12}$"
            placeholder="e.g. 064947130213"
            autoFocus
            inputMode="numeric"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            {...register("category.0")}
            placeholder="e.g. Bread, Food"
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            {...register("brand")}
            placeholder="e.g. Wonder"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register("name")}
            placeholder="e.g. White Bread"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="size">
          <Form.Label>Size</Form.Label>
          <Form.Control
            {...register("size")}
            placeholder="e.g. 675g"
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} xs={4} controlId="store">
          <Form.Label>Store</Form.Label>
          <Form.Select
            {...register("history.0.store")}
            defaultValue=""
            aria-label="Select Store"
            required
          >
            <option value="" disabled hidden>
              Select Store
            </option>
            <optgroup label="Asian Supermarket">
              <option value="FreshWay Foodmart">FreshWay Foodmart</option>
              <option value="T&T Supermarket">T&T Supermarket</option>
              <option value="Winco Food Mart">Winco Food Mart</option>
            </optgroup>
            <optgroup label="Western Supermarket">
              <option value="Food Basics">Food Basics</option>
              <option value="FreshCO">FreshCO</option>
              <option value="Longos">Longos</option>
              <option value="Metro">Metro</option>
              <option value="No Frills">No Frills</option>
              <option value="Real Canadian Superstore">
                Real Canadian Superstore
              </option>
              <option value="Shoppers Drug Mart">Shoppers Drug Mart</option>
              <option value="Walmart">Walmart</option>
            </optgroup>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="image">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            {...register("image")}
            placeholder="e.g. https://www.abc.com/1.jpg"
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="was_price">
          <Form.Label>Original Price</Form.Label>
          <Form.Control
            {...register("history.0.was_price")}
            type="number"
            placeholder="e.g. 2.99"
            min="0"
            step=".01"
            required
            inputMode="decimal"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="price">
          <Form.Label>Sale Price</Form.Label>
          <Form.Control
            {...register("history.0.price")}
            type="number"
            placeholder="e.g. 2.48"
            min="0"
            step=".01"
            required
            inputMode="decimal"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="valid_to">
          <Form.Label>Valid Date</Form.Label>
          <Form.Control
            {...register("history.0.valid_to")}
            type="date"
            required
          />
        </Form.Group>
      </Row>
      <div className="d-flex justify-content-end">
        <Button
          variant="success"
          type="submit "
          disabled={Object.keys(errors).length > 0}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
