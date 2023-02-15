import useSWR from "swr";
import Error from "next/error";
import { Card } from "react-bootstrap";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductCard(props) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${props.id}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return (
      // Skeleton Screen
      <Card>
        <Card.Body>
          <Skeleton height={150} />
          <Card.Title>
            <Skeleton height={30} />
          </Card.Title>
          <Card.Text>
            <Skeleton />
            <Skeleton count={3} />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="text-center h-100">
      <Card.Body>
        <Image
          src={data?.image ? data?.image : `https://via.placeholder.com/150`}
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
          {data?.history[data.history.length - 1]?.price} {/* Original Price */}
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
