import { useEffect, useState } from "react";
import { projApi } from "@/services/apiConfig";
import CreateProject from "./CreateProject";
import ProjectTable from "./ProjectTable";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const fetchData = () => {
    projApi
      .getData()
      .then((res) => {
        setProjects(res.data);
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
      <CreateProject refresh={fetchData} />
      <div className="flex  justify-center min-w-screen ">
        <ProjectTable data={projects} refresh={fetchData} />
      </div>
    </>
  );
};

export default Projects;
