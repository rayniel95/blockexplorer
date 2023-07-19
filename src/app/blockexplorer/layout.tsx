'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { Col, Container, Nav, Offcanvas, Row } from 'react-bootstrap'
import Footer from './components/Footer'
import Link from 'next/link'
import Header from './components/Header'
import Head from 'next/head'
import { useState } from 'react'
import store from '@/src/stateManager/store'
import { Provider } from 'react-redux'


// TODO - add transaction and block details and improve css with icons in 
// block and transaction component
export default function BlockExplorerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <html lang="en">
      <Head>
        <title>Blockchain Explorer</title>
        <meta name="description" content="AU Module 3 project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Provider store={store}>
          <Header showOffcanvas={handleShow} />

          <Container fluid>
            <Row>
              <Col className="d-none d-md-block" md={2}>
                <Offcanvas show={show} onHide={handleClose} responsive="md">
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <p className="mb-0">
                      <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/blocklist`}>Block</Link>
                      <Nav.Link href="/address">Huff Verifier</Nav.Link>
                    </p>
                  </Offcanvas.Body>
                </Offcanvas>
              </Col>
              <Col xs={12} md={10}>
                <main>
                  {children}
                </main>
              </Col>
            </Row>
          </Container>
        </Provider>
        <Footer />
      </body>
    </html>
  )
}
