import axios from "axios";
import { useState , useEffect} from "react";
import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";

export default function Client(){

    const [clients , setClients] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9000/api/admin/clients")
        .then((res)=>{
            // console.log(res.data.clients)
            setClients(res.data.clients)
        })
        .catch((er) => console.log(er))
    }, []);

    return(
    
        <div className="container-fluid">
        <div className="row">
          <SideBar />
          <div className="col-lg-10">
            <div className="row">
            <NavAdmin />
            </div>
            
            <div className="row">
              <div className="col-lg-12">
                <h2  style={{marginTop : '10px'}}>Clients</h2>
                <table className="table">
                             <thead>
                                 <tr>
                                     <th>Clients</th>
                                     <th>Email</th>
                                 </tr>
                             </thead>
                      
                         <tbody>
                             {clients.map((value , index)  => (
                                 <tr key={index}>
                                     <td>{value.username}</td>
                                     <td>{value.email}</td>
                                 </tr>
                             ))}

                         </tbody>
                     </table>
             
                </div>
                
             
            </div>
          </div>
        </div>
      </div>
    )
}