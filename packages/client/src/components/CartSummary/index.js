import React from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import useCurrency from "hooks/useCurrency";

export default function CartSummary({ cartTotal, discount }) {
  const { getPrice } = useCurrency();

  return (
    <div className="cart-summary">
      <Container>
        <Row className="mb-2 summary-item">
          <Col xs="9">
            <p className="summary-label">Free Shipping</p>
          </Col>
          <Col xs="3" className="text-right">
            <p className="summary-value">{getPrice(0)}</p>
          </Col>
        </Row>
        {discount && (
          <>
            <Row>
              <Col>
                <p>Discount</p>
              </Col>
              <Col>
                <p>{discount * 100}% off</p>
              </Col>
            </Row>
          </>
        )}
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
