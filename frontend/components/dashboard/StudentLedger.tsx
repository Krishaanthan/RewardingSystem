"use client";

const transactions = [
  { date: "Mar 7, 2026", activity: "Hackathon Winner", points: 50 },
  { date: "Mar 5, 2026", activity: "Library Contribution", points: 10 },
  { date: "Mar 4, 2026", activity: "Event Participation", points: 20 },
  { date: "Mar 2, 2026", activity: "Quiz Champion", points: 30 },
  { date: "Feb 28, 2026", activity: "Course Redemption", points: -100 },
  { date: "Feb 24, 2026", activity: "Weekly Login Bonus", points: 50 },
  { date: "Feb 20, 2026", activity: "Sponsor Bonus", points: 150 },
  { date: "Feb 15, 2026", activity: "Peer Review", points: 25 },
  { date: "Feb 10, 2026", activity: "Merch Redemption", points: -200 },
  { date: "Feb 5, 2026", activity: "Academic Grant", points: 100 },
];

export function StudentLedger() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">Student Ledger</h3>
        <p className="text-sm text-gray-500 mt-0.5">All points transactions</p>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Activity</th>
              <th className="pb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transactions.map((tx, i) => (
              <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                <td className="py-3 pr-4 text-xs text-gray-400 font-medium whitespace-nowrap">{tx.date}</td>
                <td className="py-3 pr-4 text-sm text-gray-700 font-semibold">{tx.activity}</td>
                <td className={`py-3 text-sm font-extrabold text-right ${tx.points > 0 ? "text-green-600" : "text-red-600"}`}>
                  {tx.points > 0 ? `+${tx.points}` : tx.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
