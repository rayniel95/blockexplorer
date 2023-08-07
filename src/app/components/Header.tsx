import { Button, Container, Form, Nav, NavDropdown, Navbar, Offcanvas } from "react-bootstrap";
import { changeNetwork } from "@/src/stateManager/networkSlice";
import { Network } from "alchemy-sdk";
import { useAppDispatch, useAppSelector } from "@/src/stateManager/hooks";
import * as settings from "@/src/settings";
import { NetworkSwitcher } from "./commons/header/NetworkSwitcher";


export default function Header({ showOffcanvas }: { showOffcanvas: () => void }) {
  //NOTE - maybe use a small font size for use expand in md
  //TODO - use a fixed bootom top for header and footer and put the center
  // in the middle
  //TODO - extract network swiotcher to another wrapper component
  const network = useAppSelector((state) => state.network.newtork);
  const dispatch = useAppDispatch()
  const actionsForNetwork = {
    "Ethereum Mainnet": () => dispatch(changeNetwork(Network.ETH_MAINNET)),
    "Sepolia": () => dispatch(changeNetwork(Network.ETH_SEPOLIA)),
  }

  const networkToNetworkName = {
    [Network.ETH_MAINNET]: "Ethereum Mainnet",
    [Network.ETH_SEPOLIA]: "Sepolia",
  }

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
                <NetworkSwitcher id="offCanvasNav" actionForNetwork={actionsForNetwork} defaultNetwork={networkToNetworkName[network]} />
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