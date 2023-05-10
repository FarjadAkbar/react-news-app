import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PageWrap = ({heading, subheading}: any) => {
  return (
    <Container className="page-wrap d-flex flex-row align-items-center justify-content-center">
      <Row className="justify-content-center">
        <Col md={12} className="text-center">
          <span className="display-1 d-block">{heading}</span>
            <div className="mb-4 lead">
              {subheading}
            </div>
            <Nav.Link as={Link} to="/" className="btn btn-link">
              Back to Home
            </Nav.Link>
        </Col>
      </Row>
    </Container>
  );
}

export default PageWrap;