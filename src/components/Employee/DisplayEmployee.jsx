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
      empApi
        .getOneData(expandedId)
        .then((res) => {
          setDetails((prevDetails) => ({
            ...prevDetails,
            [expandedId]: res.data,
          }));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching employee details:", error);
          setLoading(false);
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

  return (
    <div className="flex justify-center">
      <Accordion type="single" collapsible className="w-1/2">
        {data?.map((emp) => (
          <AccordionItem key={emp.id} value={emp.id}>
            <AccordionTrigger onClick={() => handleAccordionChange(emp.id)}>
              {emp.name} &nbsp; &nbsp; {emp.age}{" "}
            </AccordionTrigger>
            <AccordionContent>
              {loading && expandedId === emp.id ? (
                <p>Loading...</p>
              ) : details[emp.id] ? (
                <div className="flex flex-col gap-2 items-center text-lg">
                  <div>
                    <strong>Name:</strong> {details[emp.id].name}
                  </div>
                  <div>
                    <strong>Age:</strong> {details[emp.id].age}
                  </div>
                  {details[emp.id].department ? (
                    <div>
                      <strong>Department:</strong>{" "}
                      {details[emp.id].department.name}
                    </div>
                  ) : (
                    ""
                  )}
                  {details[emp.id].projects.length ? (
                    <div>
                      <strong>Projects:</strong>

                      {details[emp.id].projects.map((p) => (
                        <span key={p.id}> {p.name} &nbsp;</span>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex gap-3">
                    <EditEmployee
                      refresh={refresh}
                      refresh2={fetchEmp}
                      data={details[emp.id]}
                    />
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
