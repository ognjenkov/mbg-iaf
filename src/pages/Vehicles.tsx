import { Container, Row, Col, Button, Table } from "react-bootstrap";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Vehicle = {
  id: number;
  model: string;
  firstRegistrationYear: string;
  cubicCapacity: number;
  fuel: string;
  mileage: string;
};

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = () => {
    setIsLoading(true);

    axios
      .get<Vehicle[]>("vehicles")
      .then((res) => {
        setVehicles(res.data);
        setError(false);
        setErrorMessage("");
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`vehicles`, { data: { id } })
      .then(() => {
        getVehicles();
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      });
  };

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="mb-0">Vehicle data</h1>
        </Col>
        <Col className="text-end">
          <Link to="/create-vehicle">
            <Button variant="success" className="rounded-pill px-4">
              + New
            </Button>
          </Link>
        </Col>
      </Row>

      <Table bordered style={{ border: "2px solid black" }}>
        <thead>
          <tr className="text-center align-middle">
            <th className="bg-info text-white">ID</th>
            <th className="bg-info text-white">Model</th>
            <th className="bg-info text-white">First registration year</th>
            <th className="bg-info text-white">Cubic capacity</th>
            <th className="bg-info text-white">Fuel</th>
            <th className="bg-info text-white">Mileage</th>
            <th className="bg-info text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="text-center align-middle">
              <td colSpan={7}>Loading...</td>
            </tr>
          ) : error ? (
            <>
              <tr className="text-center align-middle text-danger">
                <td colSpan={7}>{errorMessage}</td>
              </tr>
              <tr className="text-center align-middle text-danger">
                <td colSpan={7}>
                  <Button
                    variant="danger"
                    className="rounded-pill"
                    onClick={() => getVehicles()}
                  >
                    Retry
                  </Button>
                </td>
              </tr>
            </>
          ) : vehicles.length === 0 ? (
            <tr className="text-center align-middle">
              <td colSpan={7}>No vehicles found</td>
            </tr>
          ) : (
            vehicles.map((v) => (
              <tr key={v.id} className="text-center align-middle">
                <td>{v.id}</td>
                <td>{v.model}</td>
                <td>{v.firstRegistrationYear}</td>
                <td>{v.cubicCapacity}</td>
                <td>{v.fuel}</td>
                <td>{v.mileage}</td>
                <td>
                  <Button
                    variant="danger"
                    className="rounded-pill"
                    onClick={() => handleDelete(v.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}
