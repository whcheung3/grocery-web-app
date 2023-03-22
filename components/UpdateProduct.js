import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ConfirmDelete from "@/components/ConfirmDelete";

export default function UpdateProduct(props) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const isNoUpc = watch("noUpc");
  const isNoImage = watch("noImage");

  async function onSubmit(data) {
    const loadingToast = toast.loading("Submitting...", {
      position: "top-center",
    });

    if (isNoUpc) data.upc = new String(); // empty the UPC string
    if (data.pack) data.size *= data.pack; // sum up the total size of the product
    if (data.category)
      data.category = data.category.replace(/\s*,\s*/gi, ",").split(","); // remove whitespace and make categories in an array
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
          data.image = "https" + image.url.slice(4);
        }); // set product image url
    } else if (isNoImage) {
      data.image = new String(); // empty the image URL string
    } else {
      data.image = ""; // make no changes
    }

    for (let prop in data) {
      if (!data[prop]) delete data[`${prop}`]; // delete empty property from object in order to update modified field only
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${props.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    ).then(toast.dismiss(loadingToast));

    if (response.ok) {
      toast.success("Product Updated!", {
        position: "top-center",
        autoClose: 5000,
      });
      router.push("/product");
    } else {
      toast.error("Product Update Fail!", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }

  return (
    <>
      {/* Modal */}
      <ConfirmDelete
        show={show}
        close={() => setShow(false)}
        id={props.id}
        target={"product"}
      />

      <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="upc">
              <Form.Label>Universal Product Code</Form.Label>
              <Form.Check
                {...register("noUpc")}
                label={"No UPC?"}
                onClick={() => setValue("upc", "")}
              />
              <Form.Control
                {...register("upc")}
                pattern="^\d{12}$"
                placeholder="e.g. 064947130213"
                autoFocus
                inputMode="numeric"
                disabled={isNoUpc}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="category">
              <Form.Label>Category(s)</Form.Label>
              <Form.Control
                {...register("category")}
                placeholder="e.g. Bread, Food (seperate with ' , ')"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control {...register("brand")} placeholder="e.g. Wonder" />
            </Form.Group>

            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name")}
                placeholder="e.g. White Bread"
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
                inputMode="decimal"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="unit">
              <Form.Label>Unit</Form.Label>

              <Form.Select
                {...register("unit")}
                defaultValue=""
                aria-label="Select Unit"
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
                <option value="oz">oz</option>
                <option value="sh">sh</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="pack">
              <Form.Label>Multipack</Form.Label>
              <Form.Control
                {...register("pack")}
                type="number"
                min="0"
                placeholder="e.g. 6"
                inputMode="decimal"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="image">
              <Form.Label>Picture</Form.Label>{" "}
              <Form.Check
                {...register("noImage")}
                label={"No Image?"}
                onClick={() => setValue("image", "")}
              />
              <Form.Control
                {...register("image")}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setImage(e.target.files[0])}
                disabled={isNoImage}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Col>
              <Button
                className="float-start"
                variant="danger"
                onClick={() => {
                  setShow(true);
                }}
              >
                Delete Product
              </Button>
            </Col>
            <Col>
              <Button
                className="float-end"
                variant="success"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  );
}
