import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="py-5 bg-dark text-center text-white">
      <Container>
        <Row>
          <div class="col-md-10 mx-auto" align="left" style={{fontSize:"20px",left:"0px"}}>
            <div class="row">
              <div class="col-md-12">
                <p>Questions? Call <a href="tel:1-844-505-2993" style={{color:"white"}}>1-844-505-2993</a></p>
              </div>
              <br></br>
              <div class="col-6 col-md-3">
                <ul class="nav flex-column">
                  <li>FAQ</li>

                  <li>Ways to Watch</li>

                  <li>Only on StreamingDome</li>
                </ul>
              </div>

              <div class="col-6 col-md-3">
                <ul class="nav flex-column">
                  <li>Help Center</li>
                  <li>Jobs</li>
                  <li>Terms of Use</li>
                  <li>Contact Us</li>
                </ul>
              </div>

              <div class="col-6 col-md-3">
                <ul class="nav flex-column">
                  <li>Account</li>
                  <li>Redeem Gift Cards</li>
                  <li>Privacy</li>

                </ul>
              </div>

              <div class="col-6 col-md-3">
                <ul class="nav flex-column">

                  <li>Buy Gift Cards</li>
                  <li>Cookie Preferences</li>

                </ul>

              </div>
              <div class="col-md-12">
                <div class="dropdown mt-4">
                  {/* <button class="btn btn-dark dropdown-toggle  py-2" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-globe"></i> English
                  </button> */}
                  <label for="language">Language:&nbsp;</label>

                  <select name="Language" id="language">
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>
              <div class="col-sm" align="center">
                <p class="copyright mt-3"> Copy right @StreamingDome</p>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
