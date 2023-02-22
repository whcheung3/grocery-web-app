import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function UpdatePrice(props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm();

  async function onSubmit(data) {
    data.valid_to += "T23:59:59Z"; // make date until day end
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${props.id}/add`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isSubmitSuccessful && (
        <Alert key={"success"} variant={"success"}>
          Product Updated!
        </Alert>
      )}

      {errors?.root?.server && (
        <Alert key={"danger"} variant={"danger"}>
          Update Product Failed!
        </Alert>
      )}

      <Row className="mb-3">
        <Form.Group as={Col} controlId="store">
          <Form.Label>Store</Form.Label>
          <Form.Select
            {...register("store")}
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
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="valid_to">
          <Form.Label>Valid Date</Form.Label>
          <Form.Control {...register("valid_to")} type="date" required />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="price">
          <Form.Label>Sale Price</Form.Label>
          <Form.Control
            {...register("price")}
            type="number"
            placeholder="e.g. 2.48"
            min="0"
            step=".01"
            inputMode="decimal"
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
          Update
        </Button>
      </div>
    </Form>
  );
}
