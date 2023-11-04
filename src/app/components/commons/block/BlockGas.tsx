import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <p>
              Made with ❤️ by <a href="https://rayniel95.github.io/">Rainyel Ramos</a>
            </p>
          </Col>
          <Col>
            <p>
              <a href="https://github.com/rayniel95/ecdsa-node">
                <i className="bi bi-github"></i> take a look to the code
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
