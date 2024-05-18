import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../contextApi/AppContext';
import './ManageAddress.css'

import axios from "axios";
import { useApi } from '../../../contextApi/ApiContexts/ApiContexts';
const base_url = "https://shipwall.au/WCF_API_HTTPS";

const ManageAddress = () => {

  const { base_url , cardCode , access } = useApi()
    
    const [ Adddata , setAddData] = useState()
    const [ loading , setloading] = useState(false)
  
    
    const getBP = async () => {
      
      try {
        setloading(true)
        // const cardCode =  localStorage.getItem("username");
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
      }
      finally{
        setloading(false)
      }
     
    };
  
    // console.log(Adddata,'d');
    const { addresses } = Adddata || { addresses: [] };

  
    useEffect(() => {
        const f = async () => {
            await getBP();
        };
        f();
    }, []);
    
    // console.log(Adddata, 'd');
    
    const billingAddress = Array.isArray(addresses) && addresses.filter(address => address.adresType === "B");
    const shippingAddress = Array.isArray(addresses) && addresses.filter(address => address.adresType === "S");
    
    // console.log(billingAddress, "Billing Addresses");
    // console.log(shippingAddress, "Shipping Addresses");



    return (
        <>
      <div className="row">
        <div className="col-lg-12">
          <div className="address-data">
            <h4>Address</h4>
            <br />
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="card">
          <div className="card-header">
            <h4 className="text mb-0">Billing Details</h4>
          </div>
          
          <div className="card-body">
            {/* table part start */}
            <div className="table-responsive">
              <table className="table table-bordered table-striped mb-0">
              {
               Array.isArray(billingAddress)&& billingAddress.map((billingAddress,index)=>(
                    <>
                    <h5 className="mutiple_billing_title">Billing Address : {index+1}</h5>
                    <tbody key={index}>
                    <tr>
                      <th width='30%'>Address ID </th>
                      <td>{billingAddress?.address}</td>
                    </tr>
                    <tr>
                      <th width='30%'>Street / PO Box</th>
                      <td>{billingAddress?.street}</td>
                    </tr>
                    <tr>
                      <th>Block</th>
                      <td>{billingAddress?.block}</td>
                    </tr>
                    <tr>
                      <th>City</th>
                      <td>{billingAddress?.city}</td>
                    </tr>
                    <tr>
                      <th>County</th>
                      <td>{billingAddress?.county}</td>
                    </tr>
                    <tr>
                      <th>Zip Code</th>
                      <td>{billingAddress?.zipCode}</td>
                    </tr>

                    <tr>
                      <th>Country / Region</th>
                      <td>{billingAddress?.countryCode} -  {billingAddress?.countryName}</td>
                    </tr>

                    <tr>
                      <th>State</th>
                      <td>{billingAddress?.stateCode } - {billingAddress?.stateName} </td>
                    </tr>
                    <tr>
                      <th>Street No</th>
                      <td>{billingAddress?.streetNo}</td>
                    </tr>
                    <tr>
                      <th>Building</th>
                      <td>{billingAddress?.building}</td>
                    </tr>
                  </tbody>
                
                  </>
                ))
              }
              </table>
            </div>
            {/* table part end */}
            
          </div>
          
                 </div>
                 <br/>  <br/>


                 <div className="card">
          <div className="card-header">
            <h4 className="text mb-0">Shipping Details</h4>
          </div>
          
          <div className="card-body">
            {/* table part start */}
            <div className="table-responsive">
              <table className="table table-bordered table-striped mb-0">
              {
               Array.isArray(shippingAddress)&& shippingAddress.map((shippingAddress,index)=>(
                    <>
                    <h5 className="mutiple_billing_title">Shipping Address : {index+1}</h5>
                    <tbody key={index}>
                    <tr>
                    <th width='30%'>Address ID</th>
                    <td>{shippingAddress?.address}</td>
                  </tr>
                  <tr>
                    <th width='30%'>Street / PO Box</th>
                    <td>{shippingAddress?.street}</td>
                  </tr>
                  <tr>
                    <th>Block</th>
                    <td>{shippingAddress?.block}</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>{shippingAddress?.city}</td>
                  </tr>

                  <tr>
                    <th>County</th>
                    <td>{shippingAddress?.county}</td>
                  </tr>

                  <tr>
                    <th>Zip Code</th>
                    <td>{shippingAddress?.zipCode}</td>
                  </tr>


                  <tr>
                    <th>Country / Region</th>
                    <td>{shippingAddress?.countryCode} - {shippingAddress?.countryName} </td>
                  </tr>
                  
                  <tr>
                    <th>State </th>
                    <td> {shippingAddress?.stateCode} - {shippingAddress?.stateName}  </td>
                  </tr>
                  
                 
                  <tr>
                    <th>Street No</th>
                    <td>{shippingAddress?.streetNo}</td>
                  </tr>
                  <tr>
                    <th>Building</th>
                    <td>{shippingAddress?.building}</td>
                  </tr>
                  </tbody>
      
                  </>
                ))
              }
              </table>
            </div>
            {/* table part end */}
          </div>
                 </div>

              </>
            )}
          </div>
        </div>
      </div>
    </>
    );
};

export default ManageAddress;
