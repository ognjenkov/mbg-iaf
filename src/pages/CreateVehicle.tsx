import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "../api/axios";

type VehicleForm = {
  model: string;
  firstRegistrationYear: string;
  cubicCapacity: string;
  fuel: string;
  mileage: string;
};

function CreateVehicle() {
  const [form, setForm] = useState<VehicleForm>({
    model: "",
    firstRegistrationYear: "",
    cubicCapacity: "",
    fuel: "",
    mileage: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    try {
      await axios.post("/vehicles", {
        ...form,
        cubicCapacity: Number(form.cubicCapacity),
      });

      alert("Vehicle created!");
      setForm({
        model: "",
        firstRegistrationYear: "",
        cubicCapacity: "",
        fuel: "",
        mileage: "",
      });
    } catch (err: any) {
      console.log(err);

      if (err.response?.status === 400) {
        const data = err.response.data;
        const fieldErrors: { [key: string]: string } = {};

        if (data.error && data.error.includes("enum")) {
          fieldErrors.mileage = "Invalid mileage value";
        } else {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              fieldErrors[key] = data[key];
            }
          }
        }

        setErrors(fieldErrors);
      } else {
        alert("Unexpected error");
      }
    }

    setLoading(false);
  };

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="mb-0">New Vehicle</h1>
        </Col>
        <Col className="text-end">
          <Button
            variant="success"
            className="rounded-pill px-4"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <Spinner size="sm" /> : "Save"}
          </Button>
        </Col>
      </Row>

      <Form>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <Form.Control
              size="lg"
              type="text"
              name="model"
              placeholder="Model"
              value={form.model}
              onChange={handleChange}
              isInvalid={!!errors.model}
            />
            <Form.Control.Feedback type="invalid">
              {errors.model}
            </Form.Control.Feedback>
          </Col>

          <Col xs={12} md={4}>
            <Form.Control
              size="lg"
              type="number"
              name="firstRegistrationYear"
              placeholder="First registration year"
              value={form.firstRegistrationYear}
              onChange={handleChange}
              isInvalid={!!errors.firstRegistrationYear}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstRegistrationYear}
            </Form.Control.Feedback>
          </Col>

          <Col xs={12} md={4}>
            <Form.Control
              size="lg"
              type="number"
              name="cubicCapacity"
              placeholder="Cubic capacity"
              value={form.cubicCapacity}
              onChange={handleChange}
              isInvalid={!!errors.cubicCapacity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cubicCapacity}
            </Form.Control.Feedback>
          </Col>

          <Col xs={12} md={4}>
            <Form.Control
              size="lg"
              type="text"
              name="fuel"
              placeholder="Fuel"
              value={form.fuel}
              onChange={handleChange}
              isInvalid={!!errors.fuel}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fuel}
            </Form.Control.Feedback>
          </Col>

          <Col xs={12} md={4}>
            <Form.Select
              size="lg"
              name="mileage"
              value={form.mileage}
              onChange={handleChange}
              isInvalid={!!errors.mileage}
            >
              <option value="">Select Mileage</option>
              <option value="ZERO">ZERO</option>
              <option value="ONE">ONE</option>
              <option value="TWO">TWO</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.mileage}
            </Form.Control.Feedback>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreateVehicle;
