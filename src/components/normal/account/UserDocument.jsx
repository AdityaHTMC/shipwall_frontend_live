import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { MdDownload } from "react-icons/md";
import { useApi } from '../../../contextApi/ApiContexts/ApiContexts';

const baseURL2 = "https://shipwall.au/test/API/shipwall"; // Node Api Base URL

const UserDocument = () => {
    const { baseURL2 , base_url} = useApi()
    const [docData, setDocData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cardCode , access } = useApi()

    const getDoc = async () => {
        try {
            // const cardCode = localStorage.getItem("username");
            const response = await fetch(`${baseURL2}/api/v1/customer/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "cardCode": cardCode
                })
            });

            const data = await response.json();
            setDocData(data.data);
            // console.log(data, 'mydata');
            // console.log(docData, 'download');
        } catch (error) {
            console.error('Error in getDoc:', error);
        } finally {
            setLoading(false);
        }
    };

    const handelDownload = async (documentFile) => {
        try {
            const downloadURL = `${baseURL2}/uploads/kyc_document/${documentFile}`;
            const response = await fetch(downloadURL);
            if (response.ok) {
                const blob = await response.blob();
                const downloadLink = document.createElement("a");
                const blobURL = URL.createObjectURL(blob);
                downloadLink.href = blobURL;
                downloadLink.download = documentFile;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            } else {
                console.error("Failed to fetch file:", response.statusText);
            }
        } catch (error) {
            console.error("Error during file download:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching data
            await getDoc();
        };
        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : docData.length === 0 ? (
                <p>No Documents found</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Document Number</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docData.length >0 ? docData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.document_name}</td>
                                <td>{item.document_number}</td>
                                <td>
                                    <button onClick={() => handelDownload(item.document_file)}>
                                        Download : <MdDownload />
                                    </button>
                                </td>
                            </tr>
                        )):
                       <h5 className='mt-4 text-align-center'>No data Found</h5>
                        }
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default UserDocument;
