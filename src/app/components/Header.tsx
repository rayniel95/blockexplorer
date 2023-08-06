import { Button, Container, Form, Nav, NavDropdown, Navbar, Offcanvas } from "react-bootstrap";
import { changeNetwork } from "@/src/stateManager/networkSlice";
import { Network } from "alchemy-sdk";
import { useAppDispatch } from "@/src/stateManager/hooks";
import * as settings from "@/src/settings";


export default function Header({ showOffcanvas }: { showOffcanvas: () => void }) {
  //NOTE - maybe use a small font size for use expand in md
  //TODO - use a fixed bootom top for header and footer and put the center
  // in the middle
  const dispatch = useAppDispatch()

  return (
    <header>
      <Navbar expand="md">
        <Container fluid>
          <Button variant="primary" className="d-md-none" onClick={showOffcanvas}>
            <i className="bi bi-three-dots"></i>
          </Button>
          <Navbar.Brand>Blockchain Explorer</Navbar.Brand>
          <Navbar.Toggle aria-controls="offCanvasNav"></Navbar.Toggle>
          <Navbar.Offcanvas id="offCanvasNav" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offCanvasNav">
                Blochain Explorer
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Nav.Link href={`${settings.BASE_PATH}`}>Home</Nav.Link>
                <NavDropdown
                  title="Network"
                  id="offCanvasNav"
                >
                  <NavDropdown.Item href="" onClick={(e) => dispatch(changeNetwork(Network.ETHEREUM))}>
                    Ethereum Mainnet
                  </NavDropdown.Item>
                  <NavDropdown.Item href="" onClick={(e) => dispatch(changeNetwork(Network.STARKNET))}>
                    Sepolia
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}