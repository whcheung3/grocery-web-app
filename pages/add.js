import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm();
  const [image, setImage] = useState(null);

  async function onSubmit(data) {
    data.history[0].valid_to += "T23:59:59Z"; // make date until day end

    if (image) {
      // upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: imageData,
        }
      )
        .then((response) => response.json())
        .then((image) => {
          data.image = image.url;
        }); // set product image url
    } else {
      data.image = "";
    }

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
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="size">
          <Form.Label>Size</Form.Label>
          <Form.Control
            {...register("size")}
            type="number"
            min="0"
            step=".01"
            placeholder="e.g. 675"
            required
            inputMode="decimal"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="unit">
          <Form.Label>Unit</Form.Label>

          <Form.Select
            {...register("unit")}
            defaultValue=""
            aria-label="Select Unit"
            required
          >
            <option value="" disabled hidden>
              Select Unit
            </option>
            <option value="ea">ea</option>
            <option value="pc">pc</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="lb">lb</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="store">
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
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
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
