"use client";

const events = [
  { emoji: "🏆", label: "Hackathon Winner", points: "+50", date: "Mar 7", positive: true },
  { emoji: "📚", label: "Library Contribution", points: "+10", date: "Mar 5", positive: true },
  { emoji: "🎤", label: "Event Participation", points: "+20", date: "Mar 4", positive: true },
  { emoji: "🎯", label: "Quiz Champion", points: "+30", date: "Mar 2", positive: true },
  { emoji: "🔖", label: "Course Redemption", points: "-100", date: "Feb 28", positive: false },
  { emoji: "🌟", label: "Weekly Login Bonus", points: "+50", date: "Feb 24", positive: true },
];

export function ActivityTimeline() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md h-full">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-gray-800">Activity Timeline</h3>
        <p className="text-sm text-gray-500 mt-0.5">Your recent point activity</p>
      </div>
      <div className="relative flex flex-col gap-0">
        {events.map((ev, i) => (
          <div key={i} className="flex gap-4 group">
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-lg flex-shrink-0 group-hover:border-red-200 transition-colors">
                {ev.emoji}
              </div>
              {i < events.length - 1 && <div className="w-px flex-1 bg-gray-100 my-1" />}
            </div>
            {/* Content */}
            <div className="pb-5 flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">{ev.label}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{ev.date}</p>
              </div>
              <span className={`text-sm font-extrabold ml-2 ${ev.positive ? "text-green-600" : "text-red-600"}`}>
                {ev.points}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
