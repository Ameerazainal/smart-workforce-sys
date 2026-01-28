const StatusBadge = ({ status, className = "" }) => {
  const badges = {
    safe: {
      text: "SAFE",
      bg: "bg-emerald-100",
      textColor: "text-emerald-800",
      ring: "ring-emerald-300",
    },
    missing: {
      text: "MISSING",
      bg: "bg-red-100",
      textColor: "text-red-800",
      ring: "ring-red-300",
    },
    overdue: {
      text: "OVERDUE",
      bg: "bg-red-100",
      textColor: "text-red-800",
      ring: "ring-red-200",
    },
    overwork: {
      text: "OVERWORK",
      bg: "bg-yellow-100",
      textColor: "text-yellow-800",
      ring: "ring-yellow-300",
    },
  };

  const badge = badges[status] || {
    text: "",
    bg: "bg-slate-100",
    textColor: "text-slate-600",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-[10px] font-bold border ${badge.bg} ${badge.textColor} ${badge.ring} ${className}`}
    >
      {badge.text}
    </span>
  );
};

export default StatusBadge;
