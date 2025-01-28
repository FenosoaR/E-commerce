import { useState, useEffect } from "react";
import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Products(){

    const [product, setProduct] = useState(
        <tr>
          <td></td>
          <td>loading...</td>
          <td></td>
        </tr>
      );

      let [success, setSuccess] = useState(null);
      let [refresh, setRefresh] = useState(false);

      function handleDelete(ProductId) {
        axios
          .delete("http://localhost:9000/api/admin/removeProduct/" + ProductId)
          .then((res) => {
            setSuccess(res.data.message);
            setRefresh(true);
          })
          .catch((er) => console.log(er));
      }

    useEffect(()=>{
        axios.get('http://localhost:9000/api/admin')
        .then((res) =>{
          console.log(res.data.products);
          
            let products = res.data.products


            let tableProducts = products.map((value, index) => {
                return (
                  <tr key={value.id}>
                    <td>{value.SousCategory.Category.name}</td>
                    <td>{value.SousCategory.name}</td>
                    <td>{value.name}</td>
                    <td>{value.price}</td>
                    <td>
                      <button
                        id={value.id}
                        className="btn btn-danger"
                        onClick={() => handleDelete(value.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                      <Link
                      to={`/admin/singleProduct/${value.id}`}
                      className="btn btn-primary"
                      style={{ marginLeft: "15px" }}
                    >
                      <i className="fa fa-eye"></i>
                    </Link>
                    </td>
                  </tr>
                );
              });
              setProduct(tableProducts);
              setRefresh(false);

        })
        .catch(er=>console.log(er))
    },[refresh])
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
                  <h2 style={{marginTop : '10px'}}>Gestions des produits</h2>
                </div>
                <div className="col-lg-2" style={{paddingTop:"20px"}}>
                  <Link to={"/admin/addProduct"}>
                  <i className="fa fa-plus"></i> Ajouter un produit
                  </Link>
                </div>
              </div>
      
              <div className="row">
                <div className="col-lg-12">
                <table className="table" >
                    <thead>
                        <tr>
                          <th>Categorie</th>
                          <th>Sous-categorie</th>
                          <th>Produit</th>
                            <th>Prix</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                       {product}
                    </tbody>
                </table>
                </div>
             
              </div>
      
      
      
      
            </div>
        </div>
      </div>
    )
}