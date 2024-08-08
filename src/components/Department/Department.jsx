import { useEffect, useState } from "react";
import CreateDepartment from "./CreateDepartment";
import DepartmentTable from "./DepartmentTable";
import { depApi } from "@/services/apiConfig";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    setError("");
    depApi.getData().then((res) => {
      const message = res.message;
      if (res.success) {
        setDepartments(res.data);
        setLoading(false);
      } else {
        console.log("error fetching data", message);
        setLoading(false);
        setError(message);
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
        <div className="flex justify-end mb-2">
          <CreateDepartment refresh={fetchData} />
        </div>{" "}
        {error}...
      </div>
    );

  return (
    <>
      <div className="flex justify-end mb-2">
        <CreateDepartment refresh={fetchData} />
      </div>
      <div className="flex  justify-center min-w-screen ">
        <DepartmentTable data={departments} refresh={fetchData} />
      </div>
    </>
  );
};

export default Department;
