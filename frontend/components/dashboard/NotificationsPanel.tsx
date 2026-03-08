"use client";

const notifications = [
  { id: 1, emoji: "🎉", title: "You earned a badge", desc: "Hackathon Champ unlocked!", unread: true },
  { id: 2, emoji: "📈", title: "Rank improved", desc: "You are now ranked 5th.", unread: true },
  { id: 3, emoji: "📢", title: "New event available", desc: "Spring Hackathon registration open.", unread: true },
  { id: 4, emoji: "✅", title: "Quiz completed", desc: "You earned 30 points.", unread: false },
  { id: 5, emoji: "🔖", title: "Course added", desc: "Cybersecurity 201 now available.", unread: false },
];

export function NotificationsPanel() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 p-6 transition-all duration-200 hover:shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            <span className="text-primary font-bold">{notifications.filter(n => n.unread).length} unread</span>
          </p>
        </div>
        <button className="text-xs font-semibold text-primary hover:text-primary-700 transition-colors">
          Mark all read
        </button>
      </div>
      <div className="flex flex-col gap-2 flex-1 overflow-auto">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`relative flex items-start gap-3.5 p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
              n.unread ? "bg-primary-50/50 border-primary-100 hover:bg-primary-50" : "bg-gray-50/50 border-gray-100 hover:bg-gray-50"
            }`}
          >
            {/* Unread dot */}
            {n.unread && (
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
            )}
            <span className="text-xl flex-shrink-0">{n.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold leading-tight ${n.unread ? "text-gray-900" : "text-gray-600"}`}>
                {n.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
