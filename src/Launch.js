import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Launch() {
  const [launch, setLaunch] = useState({});
  const [cores,setCores] = useState([]);
  const [error, setError] = useState({ status: false, message: "" });
  const [loading,setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
        setLoading(true);
      try {
        const url = `https://api.spacexdata.com/v4/launches/${id}`;
        const response = await axios.get(url);
        if (response.status == 200){
            setLaunch(response.data);
            setLoading(false);
            setCores(response.data.cores[0])
            console.log(response.data);
        } 
        else
          setError({
            status: true,
            message: "Server Error or Connection Error!",
          });
      } catch (error) {
        setError({
          status: true,
          message: "Server Error or Connection Error!",
        });
      }
     
    }
    fetchData();
  }, []);

    if(error.status){
        return(<>
            <h3>Error : {error.message}</h3>
        </>)
    }

    if(loading){
        return(<>
            <h3>Loading...</h3>
        </>)
    }


  return (
    <>
        <div className="container">
          <div className="d-flex justify-content-between p-3 bg-dark mt-5  text-warning" >
            <h5> Name: {launch.name} </h5>
            <h5> Date: {new Date(launch.date_utc).toLocaleDateString()} </h5>
          </div>
            <h5 className="px-3 py-1 text-success" >Details:</h5>
            <h5 className="px-3 py-2" >  {launch.details ? launch.details:'No Details'  } </h5>
            <h5 className="d-flex justify-content-center p-3 bg-dark text-primary" > Reused: {cores.reused ? 'True':'False'}  </h5>

        </div>
    </>
  );
}
