import { Button, Container, Form, Nav, NavDropdown, Navbar, Offcanvas } from "react-bootstrap";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeNetwork } from "@/src/stateManager/networkSlice";
import { Network } from "@/src/stateManager/types";
import { useAppDispatch } from "@/src/stateManager/hooks";


export default function Header({showOffcanvas}: {showOffcanvas: () => void}) {
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
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown
                  title="Network"
                  id="offCanvasNav"
                >
                  <NavDropdown.Item href="" onClick={(e)=>dispatch(changeNetwork(Network.ETHEREUM))}>
                    Ethereum
                  </NavDropdown.Item>
                  <NavDropdown.Item href="" onClick={(e)=>dispatch(changeNetwork(Network.STARKNET))}>
                    StarkNet
                  </NavDropdown.Item>
                  <NavDropdown.Item href="" onClick={(e)=>dispatch(changeNetwork(Network.POLYGON))}>
                    Polygon
                  </NavDropdown.Item>
                  <NavDropdown.Item href="" onClick={(e)=>dispatch(changeNetwork(Network.ARBITRUM))}>
                    Arbitrum
                  </NavDropdown.Item>
                  <NavDropdown.Item href="" onClick={(e)=>dispatch(changeNetwork(Network.SOLANA))}>
                    Solana
                  </NavDropdown.Item>
                  <NavDropdown.Item href="" onClick={(e)=>dispatch(changeNetwork(Network.POLKADOT))}>
                    Polkadot
                  </NavDropdown.Item>
                  <NavDropdown.Item href="" onClick={(e)=>dispatch(changeNetwork(Network.NEAR))}>
                    Near
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