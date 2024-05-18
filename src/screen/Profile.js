import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Fade from "react-bootstrap/Fade";
import UserProfile from "../components/normal/account/UserProfile";
import ManageAddress from "../components/normal/account/ManageAddress";
import Order from "./Order";
import AccountSummary from "../components/normal/account/AccountSummary";
import Return from "./Return";
import { useAppContext } from "../contextApi/AppContext";





const Profile = () => {

  const {logOutsap} = useAppContext()

  return (
    <>
      <div className="container h-100 ">
        <Tab.Container
          id="user-account-tabs"
          defaultActiveKey="profile"
          className=""
        >
          <Row>
            <Col sm={3} className="">

              {/* new work start here */}
              <Nav variant="underline" className="list-group">
                <Nav.Item>
                  <Nav.Link eventKey="profile" className="list-group-item list-group-item-action">
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="orders" className="list-group-item list-group-item-action">
                    Orders
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="track" className="list-group-item list-group-item-action">
                    Account Summary 
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="address" className="list-group-item list-group-item-action">
                    Return
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={logOutsap}  className="list-group-item list-group-item-action">
                    Log Out
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              {/* new work end here */}
            </Col>

            <Col sm={9}>
              <Tab.Content className="my-2" transition={Fade}>
                <Tab.Pane eventKey="profile">
                  <UserProfile />
                </Tab.Pane>
                <Tab.Pane eventKey="orders">
                  <Order/>
                </Tab.Pane>
                <Tab.Pane eventKey="track">
                 <AccountSummary/>
                </Tab.Pane>
                <Tab.Pane eventKey="address">
                  {/* <ManageAddress /> */}
                  <Return/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};

export default Profile;
