import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

const CustomHoverCard = ({ triggerText, items }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="ml-2 underline cursor-pointer">{triggerText}</span>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        className="p-2 bg-white shadow-lg w-max"
      >
        <div className="w-max">
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CustomHoverCard;
