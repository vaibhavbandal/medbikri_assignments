import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Router, Routes } from "react-router-dom";
export default function LaunchPads() {
  const [launchPads, setLaunchPads] = useState([]);
  const [error, setError] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const url = "https://api.spacexdata.com/v4/launchpads";
        const response = await axios.get(url);
        if (response.status == 200) {
          setLaunchPads(response.data);
          setLoading(false);
        } else {
          setLoading(false);
          setError({
            status: true,
            message: "Server Error or Connection Error!",
          });
        }
      } catch (error) {
        setError({
          status: true,
          message: "Server Error or Connection Error!",
        });
      }
    }
    fetchData();
  }, []);

  if (error.status) {
    return (
      <div>
        <h4>Error :{error.message}</h4>
      </div>
    );
  }
  if (loading) {
    return <h3>Loading....</h3>;
  }

  return (
    <>
      <div className="container">
        <h2 className="display-2 text-center m-3">SpaceX Data By Medbikri Technologies</h2>
        {launchPads.map((value, index) => {
          return <Pads key={value.id} pad={value} />;
        })}
      </div>
    </>
  );
}

function Pads({ pad }) {
  const { name, status, details, launches } = pad;

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between bg-dark text-white p-3"> 
        <h6>Name :{name} </h6>
        <h6>Status :{status} </h6>
        </div>
        <span className=" text-info "> Details : </span>
        <h6 className="px-3 py-1"> {details} </h6>

        {launches.length >= 3 ? (
          <ul>
            <h4>Top #3 Launches </h4>
            <Link to={`/launches/${launches[0]}`}>
              {" "}
              <li>Launch 1: {launches[0]} </li>{" "}
            </Link>
            <Link to={`/launches/${launches[1]}`}>
              {" "}
              <li>Launch 2: {launches[1]} </li>{" "}
            </Link>
            <Link to={`/launches/${launches[2]}`}>
              {" "}
              <li>Launch 3: {launches[2]} </li>{" "}
            </Link>
          </ul>
        ) : (
          <div>
            <h3> No Launch Available</h3>
          </div>
        )}
      </div>
      <hr />
    </>
  );
}

function ShowError({ message }) {
  return <></>;
}
