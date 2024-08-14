import { useEffect, useState } from "react";
import { empApi } from "@/services/apiConfig";
import EditEntity from "../CRUDOperations/EditEntity";
import DeleteEntity from "../CRUDOperations/DeleteEntity";
import EmpModalContent from "./EmpModalContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomHoverCard from "../CommonComponents/CustomHoverCard";

function DisplayEmployee({ data, refresh }) {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchAllDetails = async () => {
    setLoading(true);
    const detailsPromises = data.map((emp) => empApi.getOneData(emp.id));

    Promise.all(detailsPromises).then((detailsResponses) => {
      const allDetails = detailsResponses.reduce((acc, res, index) => {
        if (res.success) {
          acc[data[index].id] = res.data;
        } else {
          console.error("Error fetching employee details:", res.message);
        }
        return acc;
      }, {});
      setDetails(allDetails);
      setLoading(false);
    });
  };

  console.log(details);

  useEffect(() => {
    fetchAllDetails();
  }, [data]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-wrap gap-4">
      {data.length &&
        data.map((emp) => {
          const empDetails = details[emp.id];
          return (
            <Card key={emp.id} className="w-[420px]">
              <div className="grid gap-2  box-border ">
                {empDetails ? (
                  <>
                    <CardHeader>
                      <div className="flex justify-between items-center  box-border capitalize">
                        <div className="flex flex-col text-left gap-1">
                          <CardTitle>{empDetails.name}</CardTitle>
                          <CardDescription>Information</CardDescription>
                        </div>
                        <div className="flex gap-4">
                          <EditEntity
                            api={empApi}
                            refresh={refresh}
                            refresh2={() => fetchAllDetails(empDetails.id)}
                            data={empDetails}
                            ModalContent={EmpModalContent}
                            title="Edit Employee"
                          />
                          <DeleteEntity
                            entityApi={empApi}
                            id={empDetails.id}
                            refresh={refresh}
                            title="Delete Employee"
                            description="This action cannot be undone. This will permanently delete your Employee and remove it."
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="capitalize truncate box-border ">
                        <div className="grid grid-cols-5 gap-4 text-left">
                          <p className="col-span-2">
                            Name: <strong>{empDetails.name}</strong>
                          </p>
                          <p className="col-span-3">
                            Age: <strong>{empDetails.age}</strong>
                          </p>
                        </div>
                        <div className="grid grid-cols-5 gap-4 text-left mt-2">
                          {empDetails.department && (
                            <p className="col-span-2">
                              Department:{" "}
                              <strong> {empDetails.department.name} </strong>
                            </p>
                          )}
                          {empDetails.projects.length > 0 && (
                            <div className="col-span-3 flex items-center">
                              Projects:{" "}
                              <strong className="ml-1 truncate">
                                {empDetails.projects[0].name}
                              </strong>
                              <CustomHoverCard
                                triggerText={
                                  <span className="flex items-center box-border">
                                    {empDetails.projects.length > 1 && (
                                      <span className="ml-1 text-gray-500">
                                        +{empDetails.projects.length - 1} more
                                      </span>
                                    )}
                                  </span>
                                }
                                items={empDetails.projects.map((p) => p.name)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent>
                    <p>No details available</p>
                  </CardContent>
                )}
              </div>
            </Card>
          );
        })}
    </div>
  );
}

export default DisplayEmployee;
