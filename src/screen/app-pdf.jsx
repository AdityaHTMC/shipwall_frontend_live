import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import PdfTable from "../components/normal/account/PdfTable";

export const AppPdf = () => {
    const location = useLocation()
    const [open, setOpen] = useState(true)
    const {code} = useParams()
    const [token, setToken] = useState(null);
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('token');
    const start = urlParams.get('start');
    const end = urlParams.get('end');

    useEffect(() => {
      if (accessToken) {
        const decodedToken = decodeURIComponent(accessToken);
        console.log(decodedToken)
        setToken(decodedToken);
      }
    }, [accessToken]);


    if(!token){
      return <div>Inavlid data</div>
    }
    if(!start || !end){
      return <div>Inavlid Date</div>
    }

    return (
      <div style={{width: '100vw', height: 'auto'}}>
        {open && (
          <PdfTable onClose={setOpen} code={code} endDate={end} startDate={start} token={token} />
        )}
      </div>
    )

}