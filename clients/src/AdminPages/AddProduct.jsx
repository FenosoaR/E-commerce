import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";

let init = {
  name: "",
  desc: "",
  price: "",
  SousCategoryId: "",
  color: "",
  size: "",
  stock: "",
};

export default function AddProduct() {
  const [selectCategory, setSelectCategory] = useState();
  let navigate = useNavigate();

  const [state, setState] = useState(init);
  const [images, setImages] = useState([]);

  const handleChange = useCallback(
    (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    },
    [state]
  );

  console.log(state);
  

  function fileChange(e) {
    setImages(e.target.files);
  }

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin")
      .then((res) => {
        let categories = res.data.categories;

        let htmlCategories = categories.map((value, index) => {
          return (
            // <div key={value.id}>
            //   <li>{value.name}</li>
            //   {value.SousCategories.map((souscategory) => (
            //     <div key={souscategory.id}>
            //       <input
            //         type="checkbox"
            //         name="SousCategoryId"
            //         value={souscategory.id}
            //         className="check-input"
            //         id={`souscategory-${souscategory.id}`}
            //         onClick={handleChange}
            //       />
            //       <label htmlFor={`souscategory-${souscategory.id}`}>
            //         {souscategory.name}
            //       </label>
            //     </div>
            //   ))}
            // </div>
            <>
           <select
              name="SousCategoryId"
              key={value.id}
              className="select"
              onChange={handleChange} // Ajout de l'événement onChange
            >
              <option value="">{value.name}</option>
              {value.SousCategories.map((souscategory) => (
                <option value={souscategory.id} key={souscategory.id}>
                  {souscategory.name}
                </option>
              ))}
            </select>
           </>
          
           
          );
        });
        setSelectCategory(htmlCategories);
      })
      .catch((er) => console.log(er));
  }, [handleChange]);

 

  function handlesubmit(event) {
    event.preventDefault();

    const formdata = new FormData();

    formdata.append("name", state.name);
    formdata.append("desc", state.desc);
    formdata.append("price", state.price);
    formdata.append("SousCategoryId", state.SousCategoryId);
    formdata.append("color", state.color);
    formdata.append("size", state.size);
    formdata.append("stock", state.stock);

    for (let index = 0; index < images.length; index++) {
      formdata.append("files", images[index]);
    }

    axios
      .post("http://localhost:9000/api/admin/addProduct", formdata)
      .then((res) => {
        console.log(res.data)
        navigate("/admin/products");
      })
      .catch((er) => console.log(er));
  }

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
                <h2  style={{marginTop : '10px'}}>Ajout produit</h2>
                <div className="row">
                  <div className="col-lg-11">
                  <form action="" onSubmit={handlesubmit}>
                   <div className="mb-3">
                    <label htmlFor="">Categorie : </label><br />
                    {selectCategory}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name">Produit : </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="desc">Description : </label>
                      <input
                        type="text"
                        name="desc"
                        className="form-control"
                        id="desc"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price">Price: </label>
                      <input
                        type="text"
                        name="price"
                        className="form-control"
                        id="price"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="files">Image : </label>
                      <input
                        type="file"
                        name="files"
                        className="form-control"
                        id="files"
                        multiple
                        onChange={fileChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="color">Color : </label>
                      <input
                        type="text"
                        name="color"
                        className="form-control"
                        id="color"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="size">Size : </label>
                      <input
                        type="text"
                        name="size"
                        className="form-control"
                        id="size"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tock">Stock : </label>
                      <input
                        type="number"
                        name="stock"
                        className="form-control"
                        id="stock"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <button type="submit" className="form-control btn btn-primary bg-color">
                        Ajouter{" "}
                      </button>
                    </div>
                  </form>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
