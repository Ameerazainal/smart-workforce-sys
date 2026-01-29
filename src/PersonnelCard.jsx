import StatusBadge from "./components/StatusBadge";
import ShiftBadge from "./components/ShiftBadge";

const PersonnelCard = ({ person, isEmergency, onMoveStaff }) => {
  const isSupport = person.type === "support";
  //Support staff logic: Flag if in break room > 45 mins
  const isOverdue =
    !isEmergency && person.zone === "Break Room" && person.timeIn >= 1; // 1 minute max

  const isOverwork =
    !isEmergency &&
    ["Line A", "Line B", "Maintenance Bay"].includes(person.zone) &&
    person.timeIn >= 5; // 5 minutes max

  //Emergency mode status
  const isSafe = person.status === "safe";
  const isMissing = isEmergency && person.status !== "safe";

  const zones = isEmergency
    ? ["", "Assembly A", "Assembly B"]
    : ["Line A", "Line B", "Maintenance Bay", "Break Room"];

  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all shadow-sm hover:shadow-md ${
        isEmergency
          ? isSafe
            ? "bg-emerald-50 border-emerald-200 ring-2 ring-emerald-300"
            : "bg-red-50 border-red-200 ring-2 ring-red-300 animate-pulse"
          : isOverdue
            ? "bg-red-50 border-red-200 animate-pulse-slow ring-1 ring-red-200"
            : isOverwork
              ? "bg-yellow-50 border-yellow-200 ring-1 ring-yellow-300"
              : "bg-white border-slate-100 hover:border-blue-300"
      }`}
    >
      <div className="flex flex-col space-y-1 flex-1 min-w-0">
        <span
          className={`text-sm font-bold truncate ${
            isSupport ? "text-indigo-600" : "text-slate-900"
          } ${isEmergency && isMissing ? "text-red-600" : ""}`}
        >
          {person.name}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            {person.role}
          </span>
          <ShiftBadge shift={person.shift} />
          {(isOverdue || isOverwork) && !isEmergency && (
            <StatusBadge status={isOverdue ? "overdue" : "overwork"} />
          )}
          {isEmergency && <StatusBadge status={isSafe ? "safe" : "missing"} />}
        </div>
      </div>
      {/* {isOverdue && <span>OVERDUE</span>}
      {isOverwork && <span>OVERWORK</span>} */}
      <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
        {!isEmergency ? (
          <p
            className={`text-[10px] font-mono font-bold ${isOverdue ? "text-red-600" : "text-slate-400"}`}
          >
            {person.timeIn}m
          </p>
        ) : (
          <p className="text-[11px] text-slate-500 font-medium text-right max-w-[80px]">
            {person.zone}
          </p>
        )}

        <select
          className={`w-28 text-[11px] py-1.5 px-2 rounded-lg border font-medium focus:outline-none focus:ring-2 transition-all ${
            isEmergency
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-white border-slate-200 hover:border-blue-300 text-slate-700"
          }`}
          value={person.zone}
          onChange={(e) => onMoveStaff(person.id, e.target.value)}
          // disabled={isEmergency && !isSafe}
        >
          {zones.map((z) => {
            const isCurrent = z === person.zone;
            const isDisabled =
              !isCurrent &&
              isEmergency &&
              !["", "Assembly A", "Assembly B"].includes(z);

            return (
              <option key={z} value={z} disabled={isDisabled}>
                {z} {isDisabled ? "(EVAC)" : isCurrent ? "(HERE)" : ""}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default PersonnelCard;
