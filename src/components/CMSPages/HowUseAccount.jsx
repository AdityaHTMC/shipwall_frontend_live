import React, { useEffect } from 'react'
import '../../css/mix.css'
import { useApi } from '../../contextApi/ApiContexts/ApiContexts';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';


const HowUseAccount = () => {
 
    const { getCmsDetails , cmsPage } = useApi();

    useEffect(()=>{
        const dataTosend = {
            slug : 'how-to-use-my-account'
        }
      getCmsDetails(dataTosend)
    },[])

    

  return (
    <>
      

    {/* page breadcrumbs start */}
    <section className="pageBreadcrumbs">
        <article className="container">
          <ul>
            <li><Link className="text" to="/">Home</Link></li>
            <li className="active">{cmsPage?.title}</li>
          </ul>
        </article>
    </section>
    {/* page breadcrumbs end */}

      {/* page body start here */}
      <div className='container pt-5 pb-5'>
       <div className='row'>
         <div className='col-md-12'>
        <h4 className='mb-2' align="center">{cmsPage?.title}</h4>
         <p className="about-txt" align='justify'>
         <ReactQuill
                value={cmsPage?.description}
                readOnly={true}
                modules={{ toolbar: false }}
                theme="snow"
              />
         </p>
         </div>
       </div>
      </div>
      {/* page body end here */}

    </>
  )
}

export default HowUseAccount