import { useState, useEffect } from "react";
import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";
import axios from "axios";


export default function SousCategories(){
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


    function handleDelete(SousCategoryId) {
      axios
        .delete("http://localhost:9000/api/admin/removeSousCategory/" + SousCategoryId)
        .then((res) => {
          setSuccess(res.data.message)
          setRefresh(true);
        })
        .catch((er) => console.log(er));
    }


    axios
    .get("http://localhost:9000/api/admin")
    .then((res) => {
    
      let categories = res.data.sousCategories;

      let tableCategory = categories.map((value, index) => {
        return (
          <tr key={value.id}>
            <td>{value.Category.name}</td>
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
        {success && (
            <div className="alert alert-success">
                {success}
            </div>
        )}
        
        <div className="row">
          <div className="col-lg-10">
            <h2 style={{marginTop : '10px'}}>Listes des sous-categories</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
          <table className="table" >
              <thead>
                  <tr>
                      <th>Categorie</th>
                      <th>SousCategorie</th>
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