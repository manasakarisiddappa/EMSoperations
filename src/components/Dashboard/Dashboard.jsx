import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Department from "@/components/Department/Department";
import Projects from "../Projects/Projects";
import Employee from "../Employee/Employee";

const Dashboard = () => {
  return (
    <Tabs defaultValue="employee" className="w-full">
      <TabsList>
        <TabsTrigger value="employee">Employee</TabsTrigger>
        <TabsTrigger value="department">Department</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
      </TabsList>
      <TabsContent value="employee">
        <Employee />
      </TabsContent>
      <TabsContent value="department">
        <Department />
      </TabsContent>
      <TabsContent value="projects">
        <Projects />
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;
