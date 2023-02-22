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
      <Card className="text-center h-100">
        <Card.Body>
          <Skeleton height={150} width={150} />
          <Skeleton height={25} width={100} />
          <Skeleton height={15} width={80} />
          <hr />
          <Skeleton height={15} width={70} />
          <Skeleton height={15} width={100} />
          <Skeleton height={15} width={60} />
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
          {data?.unit}
        </Card.Text>
        <hr />

        {/* Latest Price History */}
        <Card.Text>
          {data?.history[data.history.length - 1]?.store} <br />
          {/* Sale Price */}${data?.history[data.history.length - 1]?.price}
          {" ("}
          {/* Per Unit Calculation */}
          {"$"}
          {(data?.history[data.history.length - 1]?.price / data?.size).toFixed(
            5
          )}
          {" / "}
          {data?.unit}
          {")"}
          <br />
          {"Ends "}
          {new Date(
            data?.history[data.history.length - 1]?.valid_to
          ).toLocaleDateString("en-CA", { day: "numeric", month: "short" })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
