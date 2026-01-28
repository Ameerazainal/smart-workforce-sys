import PersonnelCard from "./PersonnelCard";

const ZoneCard = ({ name, people, onMoveStaff }) => {
  const isBreakZone = name === "Break Room";
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md ${isBreakZone ? "ring-1 ring-orange-100" : ""}`}
    >
      <div
        className={`px-5 py-3 flex justify-between items-center ${isBreakZone ? "bg-orange-50" : "bg-slate-50"} border-b border-slate-100`}
      >
        <h3 className="font-bold text-slate-700 tracking-tight">{name}</h3>
        <span className="bg-white px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-500 border border-slate-200 uppercase">
          {people.lenght} Active
        </span>
      </div>
      <div className="p-4 space-y-3 min-h-[200px]">
        {people.map((person) => (
          <PersonnelCard
            key={person.id}
            person={person}
            onMoveStaff={onMoveStaff}
          />
        ))}
      </div>
    </div>
  );
};

export default ZoneCard;
