import React from 'react'
import { Navbar } from 'react-bootstrap'
import './styles.css'

const Nav = () => {
  return (
    <div className="navbarMaster">
      <Navbar>
        <Navbar.Brand className="titleNavbar" href="/">
          PSYCOFY
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <span className="titleUser">Logado como: Stephany</span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Nav
