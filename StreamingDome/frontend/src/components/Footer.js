import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="py-5 bg-dark text-center text-white">
      <Container>
        <Row>
          <div className="col-md-10 mx-auto">
            <div className="row">
              <div className="col-md-12">
                <p>Questions? Call 1-844-505-2993</p>
              </div>
              <div className="col-6 col-md-3">
                <ul className="nav flex-column">
                  <li>FAQ</li>
                  <li>Investor Relations</li>
                  <li>Ways to Watch</li>
                  <li>Corporate Information</li>
                  <li>Only on StreamingDome</li>
                </ul>
              </div>

              <div className="col-6 col-md-3">
                <ul className="nav flex-column">
                  <li>Help Center</li>
                  <li>Jobs</li>
                  <li>Terms of Use</li>
                  <li>Contact Us</li>
                </ul>
              </div>

              <div className="col-6 col-md-3">
                <ul className="nav flex-column">
                  <li>Account</li>
                  <li>Redeem Gift Cards</li>
                  <li>Privacy</li>
                  <li>Speed Test</li>
                </ul>
              </div>

              <div className="col-6 col-md-3">
                <ul className="nav flex-column">
                  <li>Media Center</li>
                  <li>Buy Gift Cards</li>
                  <li>Cookie Preferences</li>
                  <li>Legal Notices</li>
                </ul>

              </div>
              <div className="col-md-12">
                <div className="dropdown mt-4">
                  <button className="btn btn-dark dropdown-toggle  py-2" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-globe"></i> English
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">English</a>
                    <a className="dropdown-item" href="#">Hindi</a>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <p className="copyright mt-3">StreamingDome</p>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
