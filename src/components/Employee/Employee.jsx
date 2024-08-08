import { useEffect, useState } from "react";
import CreateEmployee from "./CreateEmployee";
import DisplayEmployee from "./DisplayEmployee";
import { empApi } from "@/services/apiConfig";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    setError("");
    empApi.getData().then((res) => {
      if (res.success) {
        setEmployee(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(res.message);
        console.log("error creating data", res.message);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        <CreateEmployee refresh={fetchData} /> {error}...
      </div>
    );

  return (
    <>
      <CreateEmployee refresh={fetchData} />
      <DisplayEmployee data={employee} refresh={fetchData} />
    </>
  );
};

export default Employee;
