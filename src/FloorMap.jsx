import ZoneCard from "./ZoneCard";

const FloorMap = ({ staff, onMoveStaff }) => {
  const zones = ["Line A", "Line B", "Maintenance Bay", "Break Room"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {zones.map((zone) => (
        <ZoneCard
          key={zone}
          name={zone}
          people={staff.filter((p) => p.zone === zone)}
          onMoveStaff={onMoveStaff}
        />
      ))}
    </div>
  );
};

export default FloorMap;
