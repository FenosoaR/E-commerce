import { useState, useEffect } from "react";
import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Categories(){
    const [category, setCategory] = useState(
        <tr>
          <td></td>
          <td>loading...</td>
          <td></td>
        </tr>
      );
      let [success, setSuccess] = useState(null);
      let [refresh, setRefresh] = useState(false);

   useEffect(() =>{


    function handleDelete(CategoryId) {
      axios
        .delete("http://localhost:9000/api/admin/removeCategory/" + CategoryId)
        .then((res) => {
          setSuccess(res.data.message)
          setRefresh(true);
        })
        .catch((er) => console.log(er));
    }


    axios
    .get("http://localhost:9000/api/admin")
    .then((res) => {
      
      let categories = res.data.categories;

      let tableCategory = categories.map((value, index) => {
        return (
          <tr key={value.id}>
            <td>{value.name}</td>
            <td>
              <button
                id={value.id}
                className="btn btn-danger"
                onClick={() => handleDelete(value.id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        );
      });
      setCategory(tableCategory);
      setRefresh(false);
    })
    .catch((er) => console.log(er));
}, [refresh]);



return (
<div className="container-fluid">
  <div className="row">
    <SideBar />
      <div className="col-lg-10">
        <div className="row">
        <NavAdmin />
        </div>
        
        <div className="row">
          <div className="col-lg-10">
            <h2 style={{marginTop : '10px'}}>Gestions des categories</h2>
          </div>
          <div className="col-lg-2" style={{paddingTop:"20px"}}>
            <Link to={"/admin/addCategory"}>
            <i className="fa fa-plus"></i> Ajouter Categorie
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
          <table className="table" >
              <thead>
                  <tr>
                      <th>Nom du categorie</th>
                      <th>Options</th>
                  </tr>
              </thead>
              <tbody>
                  {category}
              </tbody>
          </table>
          </div>
       
        </div>




      </div>
  </div>
</div>

)
}