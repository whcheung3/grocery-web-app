import useSWR from "swr";
import Error from "next/error";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductCard(props) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${props.id}`
  );
  const [lowest, setLowest] = useState();

  useEffect(() => {
    if (data) {
      let temp = [];
      data?.history?.map((i) => temp.push(i.price));
      setLowest(Math.min(...temp));
    }
  }, [data]);

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

        <Card.Title>{data?.brand + " " + data?.name}</Card.Title>
        <Card.Text>
          {data?.category?.join(", ") + " - " + data?.size + data?.unit}
        </Card.Text>

        {/* Lowest Price History */}
        <hr />
        <Card.Text>
          {"Lowest: "}
          <br />

          {/* Sale Price */}
          {"$" + lowest}
          <br />

          {/* Per Unit Calculation: multiply 100 if unit is g / ml */}
          {data?.unit == "g" || data?.unit == "ml" ? (
            <>
              {` ($${((lowest / data?.size) * 100).toFixed(2)} / 100${
                data?.unit
              })`}
            </>
          ) : (
            <>{` ($${(lowest / data?.size).toFixed(2)} / ${data?.unit})`}</>
          )}
        </Card.Text>

        {/* Latest Price History */}
        <hr />
        <Card.Text>
          {/* Store Name */}
          {data?.history[data.history.length - 1]?.store}
          <br />

          {/* Sale Price */}
          {"$" + data?.history[data.history.length - 1]?.price.toFixed(2)}

          {/* Per Unit Calculation: multiply 100 if unit is g / ml */}
          {data?.unit == "g" || data?.unit == "ml" ? (
            <>
              {` ($${((lowest / data?.size) * 100).toFixed(2)} / 100${
                data?.unit
              })`}
            </>
          ) : (
            <>{` ($${(lowest / data?.size).toFixed(2)} / ${data?.unit})`}</>
          )}
          <br />

          {/* Valid To */}
          {"Ends "}
          {new Date(
            data?.history[data.history.length - 1]?.valid_to
          ).toLocaleDateString("en-CA", { day: "numeric", month: "short" })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
