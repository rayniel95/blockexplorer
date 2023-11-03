'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { Col, Container, Offcanvas, Row, Stack } from 'react-bootstrap'
import Footer from './components/Footer'
import Link from 'next/link'
import Header from './components/Header'
import Head from 'next/head'
import { useState } from 'react'
import store from '@/src/stateManager/store'
import { Provider } from 'react-redux'
import * as settings from '@/src/settings'
import Options from './components/Options'


// TODO - add transaction and block details and improve css with icons in 
// block and transaction component

export default function RootLayout({
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
                <Options show={show} handleClose={handleClose} />
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
