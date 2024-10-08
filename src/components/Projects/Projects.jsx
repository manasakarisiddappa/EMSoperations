import { useEffect, useState } from "react";
import { projApi } from "@/services/apiConfig";
import CreateProject from "./CreateProject";
import ProjectTable from "./ProjectTable";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    setError("");
    projApi.getData().then((res) => {
      if (res.success) {
        setProjects(res.data);
        setLoading(false);
      } else {
        console.log("error fetching data", res.message);
        setLoading(false);
        setError(res.message);
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
          <CreateProject refresh={fetchData} />
        </div>
        {error}...
      </div>
    );

  return (
    <>
      <div className="flex justify-end mb-2">
        <CreateProject refresh={fetchData} />
      </div>
      <div className="flex  justify-center min-w-screen ">
        <ProjectTable data={projects} refresh={fetchData} />
      </div>
    </>
  );
};

export default Projects;
