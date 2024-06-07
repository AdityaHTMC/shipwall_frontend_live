import React, { useEffect, useState } from "react";
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
import { Link, useLocation } from "react-router-dom";

const Profile = () => {
 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabTerm = searchParams.get("tab") || null;

  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if (tabTerm) {
      setActiveTab(tabTerm);
    }
    if(tabTerm === null){
      setActiveTab("profile")
    }
  }, [tabTerm]);

  const { logOutsap } = useAppContext();

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
              {/* <Nav variant="underline" className="list-group">
                <Nav.Item>
                  <Nav.Link
                    eventKey="profile"
                    className="list-group-item list-group-item-action"
                  >
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="orders"
                    className="list-group-item list-group-item-action"
                  >
                    Orders
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="track"
                    className="list-group-item list-group-item-action"
                  >
                    Account Summary
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="address"
                    className="list-group-item list-group-item-action"
                  >
                    Return
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={logOutsap}
                    className="list-group-item list-group-item-action"
                  >
                    Log Out
                  </Nav.Link>
                </Nav.Item>
              </Nav> */}
              <div className="list-group mt-2">
                <Link  to='/account?tab=profile' className={`${activeTab === 'profile' && "active"} list-group-item list-group-item-action`} >Profile</Link>
                <Link  to='/account?tab=orders' className={`${activeTab === 'orders' && "active"} list-group-item list-group-item-action`} >Orders</Link>
                <Link  to='/account?tab=track' className={`${activeTab === 'track' && "active"} list-group-item list-group-item-action`} >Account</Link>
                <Link  to='/account?tab=address' className={`${activeTab === 'address' && "active"} list-group-item list-group-item-action`} >Address</Link>
                <Link  to='/account?tab=return' className={`${activeTab === 'return' && "active"} list-group-item list-group-item-action`} >Return</Link>
                
              </div>
              {/* new work end here */}
            </Col>

            <Col sm={9}>
              <Tab.Content className="my-2" transition={Fade}>
                {/* <Tab.Pane eventKey="profile">
                </Tab.Pane> */}
                {activeTab === "profile" && <UserProfile />}
                {/* <Tab.Pane eventKey={activeTab}> */}
                {activeTab === "orders" && <Order />}
                {/* </Tab.Pane> */}
                {activeTab === "track" && <AccountSummary />}
                {/* <Tab.Pane eventKey="track">
                </Tab.Pane> */}
                {activeTab === "address" && <ManageAddress />}

                {activeTab === "return" && <Return />}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};

export default Profile;
