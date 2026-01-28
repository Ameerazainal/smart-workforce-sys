const EmergencyPanel = ({
  isEmergency,
  musteringStats,
  onToggleEmergency,
  evacStartTime,
}) => {
  if (!isEmergency) {
    return (
      <div className="p-6 bg-green-50 border-4 border-green-300 rounded-2xl shadow-lg mb-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-green-600">
            🏭 Normal Operations
          </h1>
          <button
            onClick={onToggleEmergency}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            TRIGGER EMERGENCY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-red-50 border-4 border-red-300 rounded-2xl shadow-xl mb-8 max-w-4xl mx-auto animate-pulse">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight text-red-600 flex-1">
          🚨 EMERGENCY EVACUATION ACTIVE
          <span className="text-sm font-normal block lg:inline ml-0 lg:ml-4 text-red-500">
            Started: {new Date(evacStartTime).toLocaleTimeString()}
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
          {musteringStats && (
            <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 grid grid-cols-3 gap-2 text-center min-w-[240px]">
              <div className="text-slate-600 text-sm font-medium">Expected</div>
              <div className="text-slate-600 text-sm font-medium">Safe</div>
              <div className="text-slate-600 text-sm font-medium">Missing</div>
              <div className="text-2xl font-black text-slate-900">
                {musteringStats.expected}
              </div>
              <div className="text-2xl font-black text-emerald-600">
                {musteringStats.safe}
              </div>
              <div className="text-2xl font-black text-red-600">
                {musteringStats.missing}
              </div>
            </div>
          )}
          <button
            onClick={onToggleEmergency}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all whitespace-nowrap"
          >
            ALL CLEAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPanel;
