import useSWRConfig from "swr";
import Error from "next/error";
import { Card } from "react-bootstrap";
import Image from "next/image";

export default function ProductCard(props) {
  const { data, error } = useSWRConfig(
    `${process.env.NEXT_PUBLIC_API_URL}/${props.upc}`
  );

  if (error) {
    return <Error statusCode={404} />;
  } else if (data == null || data == undefined) {
    return null;
  } else {
    return (
      <Card className="text-center h-100">
        <Card.Body>
          <Image
            src={data?.image}
            alt=""
            width={150}
            height={150}
            objectFit="contain"
          />
          <Card.Title>
            {data?.brand} {data?.name}
          </Card.Title>
          <Card.Text>
            {data?.category?.join(", ")}
            {" - "}
            {data?.size}
          </Card.Text>
          <hr />

          {/* Latest Price History */}
          <Card.Text>
            <strong>Store: </strong>
            {data?.history[data.history.length - 1]?.store} <br />
            {/* Sale Price */}
            <strong>Price: </strong>$
            {data?.history[data.history.length - 1]?.price}{" "}
            {/* Original Price */}
            <small>
              <s>${data?.history[data.history.length - 1]?.was_price}</s>
            </small>
            {/* Discount Calculation */}
            {" (-"}
            {(
              (1 -
                data?.history[data.history.length - 1]?.price /
                  data?.history[data.history.length - 1]?.was_price) *
              100
            ).toFixed(0)}
            {"%)"}
            <br />
            <strong>Valid To: </strong>
            {new Date(
              data?.history[data.history.length - 1]?.valid_to
            ).toLocaleDateString()}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
