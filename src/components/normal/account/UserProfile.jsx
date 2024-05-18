import { useAppContext } from "../../../contextApi/AppContext";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./ManageAddress.css";
import axios from "axios";
import UserDocument from "./UserDocument";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";

const base_url = "https://shipwall.au/WCF_API_HTTPS"; //SAP Base URL
const baseURL2 = "https://shipwall.au/test/API/shipwall"; // Node Api Base URL
const UserProfile = () => {
  const [Adddata, setAddData] = useState();
  const [loading, setloading] = useState(false);
  const { base_url,baseURL2, cardCode , access } = useApi()

  const getBP = async () => {
    try {
      setloading(true);
      // const cardCode = localStorage.getItem("username");
      // const access = localStorage.getItem("accessC");
      const response = await axios.get(
        `${base_url}/api/Masters/GetBP/${cardCode || "%20"}/C/%20/%20`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const { data } = response;

      setAddData(data[0]);
    } catch (error) {
      // toast.error('Server Down');
    } finally {
      setloading(false);
    }
  };

  // console.log(Adddata,'d');
  const { addresses } = Adddata || { addresses: [] };

  const billingAddress =
    Array.isArray(addresses) &&
    addresses.filter((address) => address.adresType === "B");
  const shippingAddress =
    Array.isArray(addresses) &&
    addresses.filter((address) => address.adresType === "S");

  // console.log(billingAddress, "Billing Addresses");
  // console.log(shippingAddress, "Shipping Addresses");

  useEffect(() => {
    const f = async () => {
      await getBP();
    };
    f();
  }, []);

  return (
    <>
      {loading ? (
        // Render your loader here
        <div>Loading...</div>
      ) : (
        <div className="h-100 ">
          <div className="card">
            <div className="card-header">
              <h4 className="text mb-0">Profile Details</h4>
            </div>
            <div className="card-body">
              {/* table part start */}
              <div className="table-responsive">
                <table className="table table-bordered table-striped mb-0">
                  <tbody>
                    <tr>
                      <th width="30%">Name:</th>
                      <td>{Adddata ? Adddata?.cardName : ""} </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{Adddata ? Adddata?.e_Mail : " "}</td>
                    </tr>
                    <tr>
                      <th>Mobile</th>
                      <td>{Adddata ? Adddata?.cellular : ""}</td>
                    </tr>
                    <tr>
                      <th>Group</th>
                      <td>{Adddata ? Adddata?.groupName : ""}</td>
                    </tr>
                    <tr>
                      <th>Branch</th>
                      <td>{Adddata ? Adddata?.dftbranchname : ""}</td>
                    </tr>
                    <tr>
                      <th>ABN</th>
                      <td>{Adddata ? Adddata?.abnno : ""}</td>
                    </tr>
                    <tr>
                      <th>ACN</th>
                      <td>{Adddata ? Adddata?.acnno : ""}</td>
                    </tr>
                    <tr>
                      <th>Sales Co-Ordinator</th>
                      <td>{Adddata ? Adddata?.slpName : ""}</td>
                    </tr>
                   
                  </tbody>
                </table>
              </div>
              {/* table part end */}
            </div>
          </div>
          <br />
          <br />

          {/* billing data  */}
          <div className="card">
            <div className="card-header">
              <h4 className="text mb-0">Billing Details</h4>
            </div>
            <div className="card-body">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Address Id</th>
                    <th>Full Address</th>
                  </tr>
                </thead>
                {billingAddress.map((item) => (
                  <tbody>
                    <tr>
                      <td> {item?.address} </td>
                      <td> {item?.street} , {item?.block} , {item?.city} , {item?.zipCode}, {item?.stateName} , {item?.countryName},{item?.county},{item?.streetNo} </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </div>
          </div>

          <br />
          <br />

          {/* Shipping data */}

          <div className="card">
            <div className="card-header">
              <h4 className="text mb-0">Shipping Details</h4>
            </div>
            <div className="card-body">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Address Id</th>
                    <th>Full Address</th>
                  </tr>
                </thead>
                {shippingAddress.map((item) => (
                  <tbody>
                    <tr>
                      <td> {item?.address} </td>
                      <td> {item?.street} , {item?.block} , {item?.city} , {item?.zipCode}, {item?.stateName} , {item?.countryName},{item?.county},{item?.streetNo} </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </div>
          </div>

          {/* get doc data */}

          <div className="user-doc-header">
            <h4>User Documents</h4>
            <UserDocument />
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;