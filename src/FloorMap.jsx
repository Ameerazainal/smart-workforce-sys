import ZoneCard from "./ZoneCard";

const FloorMap = ({ staff, isEmergency, onsiteSnapshot, onMoveStaff }) => {
  const zones = [
    "Line A",
    "Line B",
    "Maintenance Bay",
    "Break Room",
    ...(isEmergency ? ["Assembly A", "Assembly B"] : []),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {zones.map((zone) => (
        <ZoneCard
          key={zone}
          name={zone}
          people={staff.filter((p) => p.zone === zone)}
          isEmergency={isEmergency}
          onsiteSnapshot={onsiteSnapshot}
          onMoveStaff={onMoveStaff}
        />
      ))}
    </div>
  );
};

export default FloorMap;
