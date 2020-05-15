/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

// reactstrap components
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

// core components
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
import routes from "routes.js";

class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      modalOpen: true,
    }
  }
  componentWillMount(){
    if (localStorage.getItem('loggedIn') == 'true'){
      window.location.href = '#/admin/index'
    }
  }
  componentDidMount() {
    document.body.classList.add("bg-default");
    localStorage.setItem('loggedIn', false);
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <>
        <div className="main-content">
          {/* <AuthNavbar /> */}
          <Modal isOpen={this.state.modalOpen}>
            <ModalHeader toggle={this.state.modalOpen=false}>Welcome to Warrior Wellness!</ModalHeader>
            <ModalBody>
              Thank you for visiting! This site is currently under production and many functions may not be available. <br/>
              To view the model website, click on the `Take Me There!` button below! Alternatively, close this modal and click on the sign in button within inputting any details!
            </ModalBody>
            <ModalFooter>
              <Link
                className='nav-link-icon'
                to='/admin/index'
              >
              <Button className='mt-4' color='primary' onClick={this.state.modalOpen=false}>Take me there!</Button>
              </Link>
              <Button className='mt-4' onClick={() => {this.state.modalOpen=false; this.forceUpdate()} }>Close</Button>
            </ModalFooter>
          </Modal>
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome!</h1>
                    <p className="text-lead text-light">
                      Login or create new account to view your dashboard!
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/auth/login" />
              </Switch>
            </Row>
          </Container>
        </div>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between" />
          </Container>
        </footer>
      </>
    );
  }
}

export default Auth;
