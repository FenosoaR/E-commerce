import NavAdmin from "../components/NavAdmin";
import SideBar from "../components/SideBar";

export default function Dashboard() {

  return (
    <div>
     
      <div className="container-fluid">
        <div className="row">
            <SideBar />
          <div className="col-lg-10">
            <div className="row">
              <NavAdmin/>
              <h2>Dashboard</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
