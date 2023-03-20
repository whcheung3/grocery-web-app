import { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
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
} from "chart.js";
import { Line } from "react-chartjs-2";
import ConfirmDelete from "@/components/ConfirmDelete";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PriceHistory(props) {
  const [show, setShow] = useState(false);
  const [clickedHistoryId, setClickedHistoryId] = useState();
  const [price, setPrice] = useState();
  const [valid_to, setValid_to] = useState();

  useEffect(() => {
    let tempPrice = [];
    let tempDate = [];
    for (const history of props.data.history) {
      tempPrice.push(history.price);
      tempDate.push(
        new Date(history.valid_to).toLocaleString("en-CA", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );
    }

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
      y: {
        ticks: {
          // Include a dollar sign in the ticks
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
        tension: 0.1,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  function perUnitSwitch(unit, size, price) {
    // keep the same unit for easier compare
    switch (unit) {
      case "ml":
        return `$${((price / size) * 100).toFixed(4)} / 100ml`;
      case "g":
        return `$${((price / size) * 100).toFixed(4)} / 100g`;
      case "kg":
        return `$${(price / size / 10).toFixed(4)} / 100g`;
      case "l":
        return `$${(price / size / 10).toFixed(4)} / 100ml`;
      default:
        return `$${(price / size).toFixed(4)} / ${unit}`;
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
      <br />

      {/* History */}
      {props.data?.history?.map((hist) => (
        <Row key={hist._id}>
          <Col className="text-nowrap">
            <strong>Store: </strong>
            <br />
            {hist?.store}
            <br />

            <strong>Sale Price: </strong>
            <br />
            {"$" + hist?.price.toFixed(2)}
            <br />

            {/* Per Unit Calculation */}
            <strong>Price Per Unit: </strong>
            <br />
            {perUnitSwitch(props.data?.unit, props.data?.size, hist?.price)}
            <br />

            <strong>Valid To: </strong>
            <br />
            {new Date(hist?.valid_to).toLocaleDateString()}
            <br />
            <br />
          </Col>

          <Col>
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
          </Col>
        </Row>
      ))}
    </>
  );
}
