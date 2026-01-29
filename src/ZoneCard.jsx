import PersonnelCard from "./PersonnelCard";

const ZoneCard = ({
  name,
  people,
  isEmergency,
  onsiteSnapshot,
  onMoveStaff,
}) => {
  const isBreakZone = name === "Break Room";
  const isMusterZone = name === "" || "Assembly A" || "Assembly B";

  const expectedHere = isEmergency
    ? onsiteSnapshot.filter((p) => p.lastSeenZone === name).length
    : 0;
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all hover:shadow-md ${
        isMusterZone
          ? "ring-4 ring-emerald-200 border-emerald-300"
          : isBreakZone
            ? "ring-1 ring-orange-100"
            : "border-slate-200"
      } ${isEmergency ? "ring-2 ring-red-100" : ""}`}
    >
      <div
        className={`px-5 py-3 flex flex-col md:flex-row justify-between items-start md:items-center ${
          isMusterZone
            ? "bg-emerald-50"
            : isBreakZone
              ? "bg-orange-50"
              : "bg-slate-50"
        } border-b border-slate-100`}
      >
        <h3 className="font-bold text-slate-700 tracking-tight text-lg">
          {name}
        </h3>
        <div className="flex flex-col items-end gap-1 mt-2 md:mt-0">
          <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-500 border border-slate-200 uppercase tracking-wide">
            {people.length} Active
          </span>
          {isEmergency && expectedHere > 0 && (
            <span className="text-xs text-slate-500">
              Expected: {expectedHere}
            </span>
          )}
        </div>
      </div>
      <div className="p-4 space-y-3 min-h-[200px]">
        {people.map((person) => (
          <PersonnelCard
            key={person.id}
            person={person}
            isEmergency={isEmergency}
            onMoveStaff={onMoveStaff}
          />
        ))}
      </div>
    </div>
  );
};

export default ZoneCard;
