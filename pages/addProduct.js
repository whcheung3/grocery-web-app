// const form = document.getElementById("addProductForm");
// form.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const formData = {
//     upc: form.querySelector('input[name="upc"]').value,
//     category: form.querySelector('input[name="category"]').value,
//     brand: form.querySelector('input[name="brand"]').value,
//     name: form.querySelector('input[name="name"]').value,
//     size: form.querySelector('input[name="size"]').value,
//     image: form.querySelector('input[name="image"]').value,
//     history: {
//       store: form.querySelector('select[name="store"]').value,
//       was_price: form.querySelector('input[name="was_price"]').value,
//       price: form.querySelector('input[name="price"]').value,
//       valid_to: `${
//         form.querySelector('input[name="valid_to"]').value
//       }T18:59:59`,
//     },
//   };

//   const response = await fetch(process.env.API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });

//   const result = await response.json();
//   console.log(result);
// });

import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      upc: "",
      category: [],
      brand: "",
      name: "",
      size: "",
      image: "",
      history: [
        {
          store: "",
          was_price: "",
          price: "",
          valid_to: "",
        },
      ],
    },
  });

  async function submitForm(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="upc">
          <Form.Label>Universal Product Code</Form.Label>
          <Form.Control
            {...register("upc")}
            pattern="^\d{12}$"
            placeholder="e.g. 064947130213"
            autoFocus
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            {...register("category")}
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
            {...register("history.store")}
            value=""
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
            placeholder="e.g. https://www.a.com/1.jpg"
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="was_price">
          <Form.Label>Original Price</Form.Label>
          <Form.Control
            {...register("history.was_price")}
            type="number"
            placeholder="e.g. 2.99"
            min="0"
            step=".01"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="price">
          <Form.Label>Sale Price</Form.Label>
          <Form.Control
            {...register("history.price")}
            type="number"
            placeholder="e.g. 2.48"
            min="0"
            step=".01"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="valid_to">
          <Form.Label>Valid Date</Form.Label>
          <Form.Control
            {...register("history.valid_to")}
            type="date"
            required
          />
        </Form.Group>
      </Row>

      <Button
        variant="success"
        type="submit "
        disabled={Object.keys(errors).length > 0}
      >
        Submit
      </Button>
    </Form>
  );
}
