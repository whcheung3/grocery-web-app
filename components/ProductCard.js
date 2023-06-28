import useSWR from "swr";
import Error from "next/error";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductCard(props) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${props.id}`
  );
  const [lowestPrice, setLowestPrice] = useState(99999);
  const [lowestDate, setLowestDate] = useState();

  function perUnitSwitch(unit, size, price) {
    // keep the same unit for easier compare
    switch (unit) {
      case "ml":
        return ` ($${((price / size) * 100).toFixed(3)} / 100ml)`;
      case "g":
        return ` ($${((price / size) * 100).toFixed(3)} / 100g)`;
      case "kg":
        return ` ($${(price / size / 10).toFixed(3)} / 100g)`;
      case "l":
        return ` ($${(price / size / 10).toFixed(3)} / 100ml)`;
      case "sh":
        return ` ($${((price / size) * 100).toFixed(3)} / 100sh)`;
      default:
        return ` ($${(price / size).toFixed(3)} / ${unit})`;
    }
  }

  useEffect(() => {
    if (data) {
      data?.history?.map((hist) => {
        if (hist.price < lowestPrice) {
          setLowestPrice(hist.price);
          setLowestDate(hist.valid_to);
        }
      });
    }
  }, [data, lowestPrice, lowestDate]);

  // if (error) {
  //   return <Error statusCode={404} />;
  // }

  if (!data) {
    return (
      // Skeleton Screen
      <Card className="text-center h-100">
        <Card.Body>
          <Skeleton className="mb-2" height={150} width={150} />
          <Skeleton className="mb-2" height={25} width={180} />
          <Skeleton height={15} width={80} />
          <hr />
          <Skeleton height={15} width={140} />
          <Skeleton height={15} width={120} />
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="text-center h-100 shadow">
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
        <Card.Text>
          {"Lowest: " +
            new Date(lowestDate).toLocaleDateString("en-CA", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          {/*  ${new Date(
              new Date(lowestDate).getTime() - 6 * 24 * 60 * 60 * 1000
            ).toLocaleDateString("en-CA", {
              day: "numeric",
              month: "short",
            })} - */}
          <br />

          {/* Sale Price */}
          <strong>{"$" + lowestPrice?.toFixed(2)}</strong>
          {/* Per Unit Calculation */}
          <small>{perUnitSwitch(data?.unit, data?.size, lowestPrice)}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
