import { useEffect, useState } from "react";
import DisplayEmployee from "./DisplayEmployee";
import { empApi } from "@/services/apiConfig";
import CreateEntity from "../CRUDOperations/CreateEntity";
import EmpModalContent from "./EmpModalContent";

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
        <div className="flex justify-end mb-2">
          <CreateEntity
            entityApi={empApi}
            ModalContent={EmpModalContent}
            refresh={fetchData}
            buttonLabel="Create Employee"
          />
        </div>
        {error}...
      </div>
    );

  return (
    <>
      <div className="flex justify-end mb-2">
        <CreateEntity
          entityApi={empApi}
          ModalContent={EmpModalContent}
          refresh={fetchData}
          buttonLabel="Create Employee"
        />
      </div>
      <DisplayEmployee data={employee} refresh={fetchData} />
    </>
  );
};

export default Employee;
