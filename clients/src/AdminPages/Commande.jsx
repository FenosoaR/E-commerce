import axios from "axios";
import { useState, useEffect } from "react";
import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";

export default function Commande() {
  const [commande, setCommande] = useState(
    <tr>
      <td></td>
      <td>loading...</td>
      <td></td>
    </tr>
  );
  let [refresh, setRefresh] = useState(false);

  function formatDate(date) {
    const options = { day: "numeric", month: "long" };
    return new Date(date).toLocaleDateString("fr-FR", options);
  }

  function handleValideCommande(CommandeId){
    axios
    .patch(`http://localhost:9000/api/admin/valideCommande/${CommandeId}`)
    .then((res) =>{
      setRefresh(true);
    })
    .catch((er) => console.log(er));
  }

  function handleLivraisonEffectue(CommandeId){
    axios.patch(`http://localhost:9000/api/admin/commandeLivre/${CommandeId}`)
    .then((res) =>{
      // setRefresh(true);
      console.log(res.data);
    })
    .catch((er) => console.log(er));
  }
    

  useEffect(() => {
  
    axios
      .get("http://localhost:9000/api/admin/commande")
      .then((res) => {
       
        let commandes = res.data.commande;
       
        let htmlCommande = commandes.map((value , index) =>{

          return (
            <tr key={value.id}>
                  <td>{value.User.username}</td>
                    <td>{value.Product.name}</td>
                    <td>{formatDate(value.createdAt)}</td>
                    <td>{formatDate(value.date_livraison)}</td>
                    <td>{value.addresse_livraison}</td>
                    <td>{value.statut}</td>
                    {value.statut === 'En cours' ? (
                      <td onClick={() => handleValideCommande(value.id)}>
                      <button className='btn btn-success'>
                          Validé la commande
                      </button>
                  </td>
                 ) : null}

                    {value.statut === 'Valide' ? (
                       <td onClick={() => handleLivraisonEffectue(value.id)}>
                       <button className='btn btn-danger'>
                           Livraison effectuée
                       </button>
                   </td>
                 ) : value.statut === 'Livré' ? (
                  <td>
                      <span>Terminé</span>
                  </td>
              ) : null}  
            </tr>
          )
        })
        setCommande(htmlCommande);
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
          <div className="col-lg-12">
            <h2  style={{marginTop : '10px'}}>Commandes</h2>

          
            <table className="table">
               <thead>
                 <tr>
                   <th>Client</th>
                   <th>Produit</th>
                   <th>Date de commande</th>
                   <th>Date de livraison</th>
                   <th>Addresse</th>
                   <th>Statut</th>
                   <th>Options</th>
                 </tr>
               </thead>
               <tbody>
                {commande}
               </tbody>
             </table>
            </div>
            
         
        </div>
      </div>
    </div>
  </div>
  );
}
