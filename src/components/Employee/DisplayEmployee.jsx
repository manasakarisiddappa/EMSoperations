import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { empApi } from "@/services/apiConfig";
import { useEffect, useState } from "react";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";

function DisplayEmployee({ data, refresh }) {
  const [expandedId, setExpandedId] = useState(null);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchEmp = () => {
    if (expandedId !== null) {
      setLoading(true);
      empApi.getOneData(expandedId).then((res) => {
        if (res.success) {
          setDetails((prevDetails) => ({
            ...prevDetails,
            [expandedId]: res.data,
          }));
          setLoading(false);
        } else {
          console.error("Error fetching employee details:", res.message);
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    if (!details[expandedId]) fetchEmp();
  }, [expandedId]);

  const handleAccordionChange = (id) => {
    if (expandedId === id) {
      setExpandedId(null); // Collapse if the same item is clicked
    } else {
      setExpandedId(id);
    }
  };

  console.log(data);

  return (
    <div className="flex justify-center ">
      <Accordion type="single" collapsible className="w-1/2">
        {data?.map((emp) => (
          <AccordionItem key={emp.id} value={emp.id}>
            <AccordionTrigger onClick={() => handleAccordionChange(emp.id)}>
              <span>Name: {emp.name}</span>
            </AccordionTrigger>
            <AccordionContent>
              {loading && expandedId === emp.id ? (
                <p>Loading...</p>
              ) : details[emp.id] ? (
                <div className="grid gap-2 text-base ml-6">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="flex items-center gap-2">
                      <strong>Name:</strong>
                      <span>{details[emp.id].name}</span>
                    </div>
                    <div className="flex items-center w-max gap-2">
                      <strong>Age:</strong>
                      <span>{details[emp.id].age}</span>
                    </div>
                    <EditEmployee
                      refresh={refresh}
                      refresh2={fetchEmp}
                      data={details[emp.id]}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="flex items-center gap-2">
                      {details[emp.id].department && (
                        <>
                          <strong>Department:</strong>
                          <span>{details[emp.id].department.name}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center  gap-2">
                      {details[emp.id].projects.length > 0 && (
                        <>
                          <strong>Projects:</strong>
                          <span className="flex gap-2">
                            {details[emp.id].projects.map((p) => (
                              <span key={p.id}>{p.name}</span>
                            ))}
                          </span>
                        </>
                      )}
                    </div>
                    <DeleteEmployee refresh={refresh} id={emp.id} />
                  </div>
                </div>
              ) : (
                <p>No details available</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default DisplayEmployee;
