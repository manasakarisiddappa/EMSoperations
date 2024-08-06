import { useEffect, useState } from "react";
import CreateEmployee from "./CreateEmployee";
import DisplayEmployee from "./DisplayEmployee";
import { empApi } from "@/services/apiConfig";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    empApi
      .getData()
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error fetching data", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <CreateEmployee refresh={fetchData} />
      <DisplayEmployee data={employee} refresh={fetchData} />
    </>
  );
};

export default Employee;
