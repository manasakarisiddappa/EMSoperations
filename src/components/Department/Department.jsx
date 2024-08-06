import { useEffect, useState } from "react";
import CreateDepartment from "./CreateDepartment";
import DepartmentTable from "./DepartmentTable";
import { depApi } from "@/services/apiConfig";

const Department = () => {
  const [departments, setDepartments] = useState([]);

  const fetchData = () => {
    depApi
      .getData()
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.log("error fetching data", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CreateDepartment refresh={fetchData} />
      <div className="flex  justify-center min-w-screen ">
        <DepartmentTable data={departments} refresh={fetchData} />
      </div>
    </>
  );
};

export default Department;
