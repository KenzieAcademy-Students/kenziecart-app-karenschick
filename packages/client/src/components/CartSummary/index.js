import React from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
//import { useCurrency } from "hooks/useCurrency";
//import { useProvideCart } from "hooks";
import useCurrency from "hooks/useCurrency";

export default function CartSummary({ cartTotal }) {
  const { getPrice } = useCurrency();
  // const { coupons, setCoupons} = 

  // const handleSearchInputChange = (e) => {
  //   e.preventDefault();
  //   setCoupons(e.target.value);
  // };

  return (
    <div className="cart-summary">
      <Container>
        <Row className="mb-4">
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter Coupon Code"
                name="coupons"
                //onChange={handleSearchInputChange}
                //value={coupons}
                minLength={1}
                maxLength={30}
              ></Form.Control>
            </InputGroup>
          </Col>
          <Col className="my-auto">
          <Button className="btn-sm " >
            {" "}
            Apply
          </Button>
        </Col>
        </Row>
        
        <Row className="mb-2 summary-item">
          <Col xs="9">
            <p className="summary-label">Free Shipping</p>
          </Col>
          <Col xs="3" className="text-right">
            <p className="summary-value">{getPrice(0)}</p>
          </Col>
        </Row>
        <Row className="mb-2 summary-item">
          <Col xs="9">
            <p className="summary-label">Total</p>
          </Col>
          <Col xs="3" className="text-right">
            <p className="summary-value">{getPrice(cartTotal)}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
