import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="col-lg-2 sidebar" style={{height:'100vh'}}>
    
      <ul>
        <li style={{marginTop:'30px'}}>
           <h3>E-commerce</h3>
          
        </li>
        <hr />
        <li>
          <i className="fa fa-dashboard"></i>
          <Link className="cat" to={"/admin/dashboard"}>
            Dashboard
          </Link>
        </li>

      <li>
        <i className="fa fa-folder"></i>
          <Link className="cat" to={"/admin/categories"}>
            Categories
          </Link>
        </li>

        <li>
        <i className="fa fa-list"></i>
          <Link className="cat" to={"/admin/souscategories"}>
            Sous Categories
          </Link>
        </li>
       
        <li>
          <i className="fa fa-th-list"></i>
          <Link className="cat" to={"/admin/products"}>
            Produits
          </Link>
        </li>
        <li>
          <i className="fa fa-shopping-cart"></i>
          <Link className="cat" to={"/admin/commande"}>
            Commandes
          </Link>
        </li>
       
        <li>
          <i className="fa fa-users"></i>
          <Link className="cat" to={"/admin/clients"}>
            Clients
          </Link>
        </li>
       
       
      </ul>
    </div>
  );
}
