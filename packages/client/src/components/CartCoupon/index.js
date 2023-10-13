import React from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { verifyCoupon } from "utils/axiosService";
import { toast } from "react-toastify";

function CartCoupon({ coupon, applyCoupon }) {
  console.log(coupon);
  const [code, setCode] = useState(coupon ? coupon.code : "");
  const [codeAccepted, setCodeAccepted] = useState();

  const handleSearchInputChange = (e) => {
    if (!codeAccepted) setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyCoupon(code);
      applyCoupon(response.data);
      setCodeAccepted(true);

      console.log(response);
    } catch (error) {
      setCodeAccepted(false);
      toast.error("Invalid Code");
    }
  };

  return (
    <Container>
      <Row as={Form} onSubmit={handleSubmit} className="mb-4">
        <Col as={Form.Group}>
          {!codeAccepted ? (
            <Form.Control
              type="text"
              placeholder="Enter Coupon Code"
              name="code"
              onChange={handleSearchInputChange}
              isInvalid={codeAccepted === false}
              value={code}
            />
          ) : (
            <span>
              {coupon.code} ({coupon.discount * 100}% off)
            </span>
          )}
        </Col>
        <Col className="my-auto">
          <Button
            className="btn-sm "
            type="submit"
            variant="info"
            disabled={codeAccepted}
          >
            Apply
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CartCoupon;
