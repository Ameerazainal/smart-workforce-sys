import { useState, useEffect } from "react";
import FloorMap from "./FloorMap";
import EmergencyPanel from "./components/EmergencyPanel";

const App = () => {
  const MOCK_DATA = [
    {
      id: 1,
      name: "Ali",
      role: "Operator",
      zone: "Line A",
      type: "primary",
      timeIn: 120,
      shift: "Day", // Added for multi-shift
      status: "present", // Added for emergency: "present" | "evacuating" | "safe" | "missing"
    },
    {
      id: 2,
      name: "Siti",
      role: "Operator",
      zone: "Line A",
      type: "primary",
      timeIn: 120,
      shift: "Day",
      status: "present",
    },
    {
      id: 3,
      name: "Musa",
      role: "Maintenance",
      zone: "Line B",
      type: "support",
      timeIn: 30,
      shift: "Day",
      status: "present",
    },
    {
      id: 4,
      name: "Ravi",
      role: "Operator",
      zone: "Line B",
      type: "primary",
      timeIn: 45,
      shift: "Night", // Multi-shift example
      status: "present",
    },
    {
      id: 5,
      name: "John",
      role: "Technical",
      zone: "Line A",
      type: "support",
      timeIn: 30,
      shift: "Day",
      status: "present",
    },
    {
      id: 6,
      name: "Aminah",
      role: "Operator",
      zone: "Break Room",
      type: "primary",
      timeIn: 15,
      shift: "Day",
      status: "present",
    },
    {
      id: 7,
      name: "Zul",
      role: "Electrician",
      zone: "Maintenance Bay",
      type: "support",
      timeIn: 10,
      shift: "Night",
      status: "present",
    },
  ];

  const [isEmergency, setIsEmergency] = useState(false);
  const [evacStartTime, setEvacStartTime] = useState(null); // Timestamp when emergency triggered
  const [staffData, setStaffData] = useState(MOCK_DATA);
  const [onSiteSnapshot, setOnSiteSnapshot] = useState([]);

  // Real-time Timer: Increments timeIn for everyone every 1 min
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isEmergency) {
        setStaffData((prevStaff) =>
          prevStaff.map((person) => ({ ...person, timeIn: person.timeIn + 1 })),
        );
      }
    }, 60000); //60000ms = 1min
    return () => clearInterval(interval);
  }, [isEmergency]);

  const triggerEmergency = () => {
    const newEmergency = !isEmergency;
    setIsEmergency(newEmergency);

    if (newEmergency) {
      //Emergency START: Take snapshot of onsite personnel
      const snapshot = staffData.filter((p) => p.status === "present");
      setOnSiteSnapshot(
        snapshot.map((p) => ({
          ...p,
          lastSeenZone: p.zone,
          lastSeenAt: Date.now(),
        })),
      );
      setEvacStartTime(Date.now());
      // In real app: API call to PACS for "emergency unlock" doors
      console.log("🚨 EMERGENCY MODE: Doors unlocked, mustering started");
    } else {
      setOnSiteSnapshot([]);
      setEvacStartTime(null);
      setStaffData((prev) =>
        prev.map((p) => ({
          ...p,
          zone: "Break Room",
          timeIn: 0,
          status: "present",
        })),
      );
      console.log("✅ All Clear: Reset to normal operations");
    }
  };

  // Move Function: Changes zone and resets timeiIn to 0
  const moveStaff = (staffId, newZone) => {
    setStaffData((prevStaff) =>
      prevStaff.map((person) => {
        if (person.id === staffId) {
          // Rule 1: Reset if going TO Break Room
          const isEnteringBreak = newZone === "Break Room";

          // Rule 2: Reset if coming FROM Break Room
          const isLeavingBreak =
            person.zone === "Break Room" && newZone !== "Break Room";

          // Emergency mode: Only allow moves to Muster zones, update status
          if (
            isEmergency &&
            !["", "Assembly A", "Assembly B"].includes(newZone)
          ) {
            console.warn(
              `Restricted: Cannot move to ${newZone} during emergency`,
            );
            return person; // Block non-muster moves
          }

          const newStatus =
            isEmergency && ["", "Assembly A", "Assembly B"].includes(newZone)
              ? "safe"
              : person.status;

          return {
            ...person,
            zone: newZone,
            status: newStatus,
            // Reset to 0 if either condition is met; otherwise, keep cumulative time
            timeIn: isEnteringBreak || isLeavingBreak ? 0 : person.timeIn,
          };
        }

        return person;
      }),
    );
  };

  const musteringStats = isEmergency
    ? {
        expected: onSiteSnapshot.length,
        safe: staffData.filter((p) => p.status === "safe").length,
        missing: onSiteSnapshot.filter(
          (p) => !staffData.some((s) => s.id === p.id && s.status === "safe"),
        ).length,
      }
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <EmergencyPanel
        isEmergency={isEmergency}
        musteringStats={musteringStats}
        evacStartTime={evacStartTime}
        onToggleEmergency={triggerEmergency}
      />
      <main className="max-w-6xl mx-auto">
        <FloorMap
          staff={staffData}
          isEmergency={isEmergency}
          onsiteSnapshot={onSiteSnapshot}
          onMoveStaff={moveStaff}
        />
      </main>
    </div>
  );
};

export default App;
