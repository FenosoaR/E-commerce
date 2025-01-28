import NavAdmin from "../components/NavAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const ProductId = params.id;

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin/oneProduct/" + ProductId)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((er) => console.log(er));
  }, [ProductId]);

  return (
<div className="container-fluid">
<div className="row">
  <SideBar />
    <div className="col-lg-10">
      <div className="row">
      <NavAdmin />
      </div>
      
      <div className="row">
        <div className="col-lg-12">
          <h2 style={{marginTop : '10px'}}>Page Produit</h2>
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-lg-12">
             <b>Produit : </b><span>{product.name}</span> <br />
             <b>Description : </b><span>{product.desc}</span><br />
             <b>Prix : </b><span>{product.price} Ar</span> <br />
             <b>Stock : </b><span>{product.stock}</span> <br />
             <b>Couleur disponible : </b><span>{product.color}</span>
             <hr />
             <div className="row">
              <div className="col">
                <div className="product_photo">
                  <img
                    src={`http://localhost:9000/product/${product.image_1}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col">
                <div className="product_photo">
                  <img
                    src={`http://localhost:9000/product/${product.image_2}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col">
                <div className="product_photo">
                  <img
                    src={`http://localhost:9000/product/${product.image_3}`}
                    alt=""
                  />
                </div>
              </div>
            </div>
        
        </div>
     
      </div>




    </div>
</div>
</div>
  );
}
