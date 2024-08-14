import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function AccordionComponent({
  data,
  onAccordionChange,
  expandedId,
  renderContent,
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {data?.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger onClick={() => onAccordionChange(item.id)}>
            <span>Name: {item.name}</span>
          </AccordionTrigger>
          <AccordionContent>
            {expandedId === item.id ? renderContent(item.id) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AccordionComponent;
