import { useState, useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";

import ConfirmDelete from "@/components/ConfirmDelete";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

export default function PriceHistory(props) {
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState(false);
  const [clickedHistoryId, setClickedHistoryId] = useState();
  const [price, setPrice] = useState();
  const [valid_to, setValid_to] = useState();

  useEffect(() => {
    let tempPrice = [];
    let tempDate = [];
    for (const history of props.data.history) {
      tempPrice.push(history.price);
      tempDate.push(new Date(history.valid_to));
    }

    // adding the dummy flyer start date
    tempPrice.unshift(tempPrice[0]);
    tempDate.unshift(new Date(new Date(tempDate[0]) - 6 * 24 * 60 * 60 * 1000));

    setPrice(tempPrice);
    setValid_to(tempDate);
  }, [props.data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-CA", {
                style: "currency",
                currency: "CAD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "week",
          isoWeekday: 3,
          tooltipFormat: "MMM d, yyyy",
          displayFormats: {
            week: "MMM d, yyyy",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
        ticks: {
          stepSize: 0.2,
          callback: function (value, index, ticks) {
            return "$" + value.toFixed(2);
          },
        },
      },
    },
  };

  const chartdata = {
    labels: valid_to,
    datasets: [
      {
        label: props.data.name,
        data: price,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75,192,192,0.4)",
        fill: true,
        stepped: "after",
      },
    ],
  };

  // Per Unit Calculation
  function perUnitSwitch(unit, size, price) {
    // keep the same unit for easier compare
    switch (unit) {
      case "ml":
        return `$${((price / size) * 100).toFixed(3)} / 100ml`;
      case "g":
        return `$${((price / size) * 100).toFixed(3)} / 100g`;
      case "kg":
        return `$${(price / size / 10).toFixed(3)} / 100g`;
      case "l":
        return `$${(price / size / 10).toFixed(3)} / 100ml`;
      case "sh":
        return ` ($${((price / size) * 100).toFixed(3)} / 100sh)`;
      default:
        return `$${(price / size).toFixed(3)} / ${unit}`;
    }
  }

  async function checkIsLastHistory() {
    // cannot delete the last price history of a product
    if (props.data?.history?.length <= 1) throw new Error();
  }

  return (
    <>
      {/* Modal */}
      <ConfirmDelete
        show={show}
        close={() => setShow(false)}
        id={props.id}
        historyId={clickedHistoryId}
        target={"history"}
      />

      {/* Line Chart */}
      <Line options={options} data={chartdata} />

      {/* History */}
      <div className="d-flex justify-content-center">
        <Button
          variant="outline-success"
          size="sm"
          className="m-3"
          onClick={() => (details ? setDetails(false) : setDetails(true))}
        >
          View Details
        </Button>
      </div>

      {details && (
        <Table responsive striped hover size="sm">
          <thead>
            <tr>
              <th>Store</th>
              <th>Price</th>
              <th>Per Unit</th>
              <th>Valid To</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.data?.history?.map((hist) => (
              <tr key={hist._id}>
                <td>{hist?.store}</td>
                <td>{"$" + hist?.price.toFixed(2)}</td>
                <td>
                  {perUnitSwitch(
                    props.data?.unit,
                    props.data?.size,
                    hist?.price
                  )}
                </td>
                <td>{new Date(hist?.valid_to).toLocaleDateString("en-CA")}</td>
                <td>
                  <Button
                    className="float-end"
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setClickedHistoryId(hist._id);
                      checkIsLastHistory()
                        .then(() => setShow(true))
                        .catch(() =>
                          toast.error("Must have at least one history", {
                            position: "top-center",
                            autoClose: 5000,
                          })
                        );
                    }}
                  >
                    &times;
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
