import useSWR from "swr";
import Error from "next/error";
import { Modal, CloseButton, Tab, Tabs } from "react-bootstrap";
import ProductInfo from "@/components/ProductInfo";
import PriceHistory from "@/components/PriceHistory";
import UpdatePrice from "@/components/UpdatePrice";
import UpdateProduct from "@/components/UpdateProduct";

export default function ProductDetail(props) {
  const { data, error } = useSWR(
    props.id ? `${process.env.NEXT_PUBLIC_API_URL}/${props.id}` : null
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.close}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{data?.brand + " " + data?.name}</Modal.Title>
        <CloseButton onClick={props.close} />
      </Modal.Header>

      <Tabs defaultActiveKey="info" className="mb-3 text-nowrap" justify>
        {/* Information*/}
        <Tab eventKey="info" title="Information">
          <Modal.Body>
            <ProductInfo data={data} />
          </Modal.Body>
        </Tab>

        {/* Price History */}
        <Tab eventKey="history" title="Price History">
          <Modal.Body>
            <PriceHistory id={props.id} data={data} />
          </Modal.Body>
        </Tab>

        {/* Report Price */}
        <Tab eventKey="report" title="Report Price">
          <Modal.Body>
            <UpdatePrice id={props.id} />
          </Modal.Body>
        </Tab>

        {/* Update Product */}
        <Tab eventKey="update" title="Update Product">
          <Modal.Body>
            <UpdateProduct id={props.id} />
          </Modal.Body>
        </Tab>
      </Tabs>
    </Modal>
  );
}
