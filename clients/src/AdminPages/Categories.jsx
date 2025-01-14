import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";

export default function Categories(){
    return (
        <>
        <NavAdmin/>
        <div className="row">
            <div className="col-lg-3">
            <SideBar />
            </div>
            <div className="col-lg-9">
             <h2 style={{marginTop : '10px'}}>Categories</h2>
             <div style={{float : 'right' , marginTop:'-40px' , marginRight:'40px'}}>
            <i className="fa fa-plus"></i>
                <Link  to={"/admin/addCategory"}>
                    Ajouter Categorie
                </Link>
             </div>

            </div>
        </div>
        </>
    )
}