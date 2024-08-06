import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { empApi } from "@/services/apiConfig";
import { useEffect, useState } from "react";

const CardData = () => {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    empApi.getData().then((res) => {
      setEmployee(res.data);
    });
  }, []);

  if (!employee.length) return <p>Loading...</p>;

  return (
    <div className="flex flex-wrap gap-4">
      {employee.map((emp) => (
        <Card key={emp.id} className="w-[250px]">
          <CardHeader>
            <CardTitle>{emp.name}</CardTitle>
            <CardDescription>Details</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Label htmlFor="age">Age:</Label>
            <p id="age">{emp.age}</p>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardData;
