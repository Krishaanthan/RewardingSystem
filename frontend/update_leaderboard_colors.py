import re

with open("components/leaderboard/UniversityLeaderboard.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# 1. Background tertiary -> white
text = text.replace('bg-tertiary', 'bg-white')

# 2. Main wrappers for title and table
text = text.replace(
    'className="mt-6 overflow-hidden rounded-[2rem] border border-black/20 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(143,17,59,0.3)]"',
    'className="mt-6"'
)
text = text.replace(
    'className="mt-8 rounded-[2rem] border border-black/20 bg-white/40 p-5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(143,17,59,0.3)] sm:p-7"',
    'className="mt-8 pt-10"'
)

# 3. Pills and Tabs
text = text.replace(
    'className="inline-flex rounded-full bg-white/40 border border-black/20 p-1"',
    'className="inline-flex rounded-md bg-[#f5f5f5] p-1"'
)
text = text.replace(
    'active ? "bg-primary text-secondary shadow-sm" : "text-black hover:bg-white/60 hover:text-black"',
    'active ? "bg-white text-black shadow-sm font-bold" : "text-black/60 hover:bg-black/5"'
)
text = text.replace(
    'className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/40 px-3 py-1.5 text-xs font-semibold text-black shadow-sm"',
    'className="inline-flex items-center gap-2 rounded-md bg-[#f5f5f5] px-4 py-2.5 text-xs font-bold text-black"'
)
text = text.replace(
    '<span className="tracking-wide text-black/70">{label}</span>',
    '<span className="tracking-wide text-black">{label}</span>'
)

# 4. Search bar
text = text.replace(
    'className="flex w-full max-w-md items-stretch overflow-hidden rounded-full bg-white/40 border border-black/20 shadow-sm"',
    'className="flex w-full max-w-md items-stretch overflow-hidden rounded-md bg-[#f5f5f5]"'
)
text = text.replace(
    'className="shrink-0 px-4 py-2 text-sm font-semibold text-secondary bg-primary"',
    'className="hidden" '  # Hide button to match UI purely
)

# 5. Cards
# 2nd & 3rd Place cards
text = text.replace(
    'className="relative rounded-3xl border border-black/20 bg-white/40 p-5 pt-7 backdrop-blur-md"',
    'className="relative rounded-2xl bg-[#f5f5f5] p-5 pt-7 pb-8"'
)
# 1st Place card
text = text.replace(
    'className="relative rounded-3xl border border-black/20 bg-white/40 p-6 pt-8 backdrop-blur-md shadow-2xl"',
    'className="relative rounded-2xl bg-[#831238] p-6 pt-10 pb-12 shadow-2xl"'
)
# Fix 1st place text colours
text = re.sub(
    r'<div className="text-lg font-semibold text-black">Priya Sharma</div>\s*<div className="text-xs font-semibold text-black/70">',
    '<div className="text-2xl font-bold text-white mt-4 text-center">Priya Sharma</div>\n                        <div className="text-[10px] uppercase font-bold text-white/70 text-center tracking-widest mt-1">',
    text
)
text = text.replace(
    'className="text-4xl font-semibold text-black">3,120 pts</div>',
    'className="text-4xl font-black text-white text-center mt-6 tracking-tight"><span className="bg-black/20 rounded-full px-5 py-2 inline-flex items-baseline gap-1">3120 <span className="text-sm font-bold tracking-widest">PTS</span></span></div>'
)
text = text.replace(
    'className="mt-1 text-xs font-semibold text-black/70">\n                        18 Tasks Completed · Gold Badge',
    'className="hidden">'
)
# Update text in other cards for alignment perfectly matching image
text = re.sub(
    r'<div className="text-base font-semibold text-black">Vikram Singh</div>\s*<div className="text-xs font-semibold text-black/70">\(Mechanical Eng, 2025\)</div>',
    '<div className="text-lg font-bold text-black mt-4 text-center">Vikram Singh</div>\n                        <div className="text-[10px] uppercase font-bold text-black/50 tracking-widest text-center mt-1">MECHANICAL ENG · 2025</div>',
    text
)
text = re.sub(
    r'<div className="text-base font-semibold text-black">Aisha Patel</div>\s*<div className="text-xs font-semibold text-black/70">\(Bio-Tech, 2026\)</div>',
    '<div className="text-lg font-bold text-black mt-4 text-center">Aisha Patel</div>\n                        <div className="text-[10px] uppercase font-bold text-black/50 tracking-widest text-center mt-1">BIO-TECH · 2026</div>',
    text
)
# Fix points format for 2nd and 3rd
text = text.replace(
    '<div className="text-3xl font-semibold text-black">2,950 pts</div>',
    '<div className="text-3xl font-black text-black text-center mt-6">2950 <span className="text-[11px] font-bold tracking-widest text-black/40">PTS</span></div>'
)
text = text.replace(
    '<div className="text-3xl font-semibold text-black">2,880 pts</div>',
    '<div className="text-3xl font-black text-black text-center mt-6">2880 <span className="text-[11px] font-bold tracking-widest text-black/40">PTS</span></div>'
)
text = text.replace(
    'className="mt-1 text-xs font-semibold text-black/70">\n                        16 Tasks Completed · Silver Badge',
    'className="hidden">'
)
text = text.replace(
    'className="mt-1 text-xs font-semibold text-black/70">\n                        15 Tasks Completed · Bronze Badge',
    'className="hidden">'
)
# Medals & avatars
text = text.replace(
    '<MedalIcon tone="gold" />\n                      <span className="text-xs font-bold uppercase tracking-widest text-black/75">1st place</span>',
    ''
)
text = text.replace(
    '<MedalIcon tone="silver" />\n                      <span className="text-xs font-bold uppercase tracking-widest text-black/75">2nd place</span>',
    ''
)
text = text.replace(
    '<MedalIcon tone="bronze" />\n                      <span className="text-xs font-bold uppercase tracking-widest text-black/75">3rd place</span>',
    ''
)
# Replace avatar shapes
text = text.replace(
    'className="grid size-14 place-items-center rounded-full bg-white/60 ring-1 ring-black/10"',
    'className="mx-auto w-32 h-32 rounded-full border-4 border-[#831238] overflow-hidden bg-white shadow-lg"'
)
text = text.replace(
    'className="grid size-12 place-items-center rounded-full bg-white/60 ring-1 ring-black/10"',
    'className="mx-auto w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-[#f5f5f5] shadow-sm"'
)
text = text.replace(
    '<span className="text-sm font-black text-white">PS</span>',
    '<img src="https://i.pravatar.cc/150?u=priya" alt="Priya" className="w-full h-full object-cover" />'
)
text = text.replace(
    '<span className="text-sm font-black text-black">VS</span>',
    '<img src="https://i.pravatar.cc/150?u=vikram" alt="Vikram" className="w-full h-full object-cover" />'
)
text = text.replace(
    '<span className="text-sm font-black text-black">AP</span>',
    '<img src="https://i.pravatar.cc/150?u=aisha" alt="Aisha" className="w-full h-full object-cover" />'
)

# 6. Table styling
text = text.replace(
    'const PROGRESS_BAR_FILL = "#81113b";',
    'const PROGRESS_BAR_FILL = "#831238";'
)
# Rank column format #04
text = text.replace(
    '<span className="text-sm font-semibold text-black">{r.rank}</span>',
    '<span className="text-base font-bold text-black/50">#{r.rank.toString().padStart(2, "0")}</span>'
)
# Progress complete text below bar
text = text.replace(
    '<span className="text-xs font-semibold text-black">{clampPct(r.progressPct)}%</span>',
    ''
)
text = text.replace(
    '<div className="h-2 w-40 overflow-hidden rounded-full bg-black/10">',
    '<div><div className="h-2.5 w-40 overflow-hidden rounded-full bg-[#f5f5f5]"><div className="h-full" style={{width: `${clampPct(r.progressPct)}%`, backgroundColor: PROGRESS_BAR_FILL}} /></div><div className="text-[10px] font-bold mt-1.5 uppercase text-black">{clampPct(r.progressPct)}% COMPLETE</div></div>'
)
text = text.replace(
    '<div\n                              className="h-full"\n                              style={{\n                                width: `${clampPct(r.progressPct)}%`,\n                                backgroundColor: PROGRESS_BAR_FILL\n                              }}\n                            />',
    ''
)
# User row text
text = text.replace(
    '<div className="font-semibold text-black">\n                              {r.user.name} <span className="text-neutral-400">({r.user.dept}, {String(r.user.year).slice(-2)})</span>\n                            </div>\n                            <div className="text-xs font-semibold text-black/70">\n                              {r.user.dept} · {r.user.year}\n                            </div>',
    '<div className="text-sm font-bold text-black">{r.user.name}</div><div className="text-[10px] font-bold uppercase tracking-wider text-black/50">{r.user.dept} · {r.user.year}</div>'
)
# Score column format
text = text.replace(
    '<span className="font-semibold text-black">{r.scorePts.toLocaleString()} pts</span>',
    '<span className="text-base font-black text-[#831238]">{r.scorePts} <span className="text-[10px] text-black/40 tracking-widest font-bold">PTS</span></span>'
)
# Task completed format
text = text.replace(
    '<span className="text-xs font-semibold text-black">\n                          {r.taskcompleted.tasks} Tasks Completed\n                        </span>',
    '<span className="text-sm font-bold text-black/80">{r.taskcompleted.tasks}/50</span>'
)

# 7. Footer
text = text.replace(
    'className="fixed bottom-5 left-1/2 z-40 w-[min(980px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl px-4 py-3 shadow-[0_8px_32px_0_rgba(143,17,59,0.4)] border border-black/20 backdrop-blur-xl"',
    'className="fixed bottom-0 left-0 z-50 w-full bg-[#14110F] py-4 shadow-xl border-t border-white/10"'
)
text = text.replace(
    'className="rounded-2xl px-4 py-3 bg-primary text-secondary"',
    'className="mx-auto max-w-6xl px-4 flex justify-between items-center text-white"'
)
# Inside footer
text = re.sub(
    r'<div className="flex flex-col gap-2 text-xs font-semibold sm:flex-row sm:items-center sm:justify-between">\s*<div className="flex flex-wrap items-center gap-x-3 gap-y-1">\s*<span className="rounded-full bg-black/10 text-black px-2 py-1 text-\[11px\] font-bold tracking-widest">\s*MY RANK\s*</span>\s*<span className="text-black">\s*YOUR RANK: <span className="text-black">152</span>\s*</span>\s*<span className="text-black">\s*SCORE: <span className="text-black">980 pts</span>\s*</span>\s*<span className="text-black">\s*PROGRESS: <span className="text-black">54%</span>\s*</span>\s*</div>\s*<div className="text-black">\s*PROFILE <span className="text-black">\(Aman J\.\)</span>\s*</div>\s*</div>',
    '<div className="flex w-full items-center justify-between"><div className="flex items-center gap-12"><div className="flex flex-col"><span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">MY RANK</span><span className="text-2xl font-black text-white">#152</span></div><div className="flex flex-col"><span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">SCORE</span><span className="text-xl font-black text-white">980 <span className="text-xs text-white/50">PTS</span></span></div><div className="flex flex-col"><span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">PROGRESS</span><div className="flex items-center gap-3"><div className="w-24 h-2 bg-white/10 rounded-full"><div className="h-full bg-[#831238] w-[54%] rounded-full"></div></div><span className="text-xs font-bold">54%</span></div></div></div><div className="flex items-center gap-4"><div className="flex flex-col text-right"><span className="text-[10px] tracking-widest font-bold text-white/50 uppercase">ACTIVE PROFILE</span><span className="font-bold">Aman J.</span></div><div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 p-1"><div className="w-full h-full rounded-full bg-[#ffb5a7]"></div></div></div></div>',
    text
)

# 8. Load More button
text = text.replace(
    '</main>',
    '  <div className="flex justify-center mt-12 mb-32"><button className="px-6 py-2.5 rounded-lg border-2 border-[#831238] text-[#831238] font-bold hover:bg-[#831238] hover:text-white transition">Load More Rankings</button></div>\n        </main>'
)

with open("components/leaderboard/UniversityLeaderboard.tsx", "w", encoding="utf-8") as f:
    f.write(text)
