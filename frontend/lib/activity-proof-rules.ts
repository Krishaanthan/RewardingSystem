/**
 * Activity-specific proof requirements and fraud considerations.
 * Used on the Claim Points page to show correct upload formats per activity.
 */
export type ProofFieldType = "certificate" | "letter" | "poster" | "photo" | "link" | "marksheet" | "sanction" | "agreement";

export type ProofField = {
  id: string;
  type: ProofFieldType;
  label: string;
  accept?: string;
  placeholder?: string;
  required: boolean;
};

export type ActivityProofRule = {
  activity: string;
  fraudChallenge: string;
  requiredProof: string;
  fields: ProofField[];
};

export const ACTIVITY_PROOF_RULES: ActivityProofRule[] = [
  {
    activity: "Swayam NPTEL course",
    fraudChallenge: "Fake certificates, edited PDFs, duplicate submissions",
    requiredProof:
      "Upload certificate PDF with certificate ID. AI OCR verification with NPTEL database.",
    fields: [
      { id: "certificate", type: "certificate", label: "Certificate PDF (with certificate ID)", accept: ".pdf", required: true },
      { id: "link", type: "link", label: "NPTEL verification link (optional)", placeholder: "https://...", required: false },
    ],
  },
  {
    activity: "Coursera Course",
    fraudChallenge: "Screenshot-based fraud, incomplete course claims",
    requiredProof: "Upload official completion certificate with completion badge.",
    fields: [
      { id: "certificate", type: "certificate", label: "Official completion certificate with badge", accept: ".pdf,image/*", required: true },
      { id: "link", type: "link", label: "Coursera profile / certificate link", placeholder: "https://coursera.org/...", required: false },
    ],
  },
  {
    activity: "Volunteering",
    fraudChallenge: "Fake hours, no supervisor validation",
    requiredProof:
      "Upload volunteering letter signed by class coordinator / year coordinator / HOD.",
    fields: [
      { id: "letter", type: "letter", label: "Volunteering letter (signed by coordinator/HOD)", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Hackathon Participation",
    fraudChallenge: "Fake participation",
    requiredProof:
      "Upload official participation certificate with team name + event poster image + Od (On duty) letter.",
    fields: [
      { id: "certificate", type: "certificate", label: "Participation certificate (team name)", accept: ".pdf,image/*", required: true },
      { id: "poster", type: "poster", label: "Event poster image", accept: "image/*", required: true },
      { id: "letter", type: "letter", label: "Od (On duty) letter", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Winning the hackathon",
    fraudChallenge: "False winner claims",
    requiredProof:
      "Upload official winner certificate or winner announcement from organizer.",
    fields: [
      { id: "certificate", type: "certificate", label: "Winner certificate or announcement", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Conducting Workshop",
    fraudChallenge: "Students claim without proof",
    requiredProof:
      "Upload event poster with name listed + faculty approval letter (Od letter).",
    fields: [
      { id: "poster", type: "poster", label: "Event poster (with your name listed)", accept: "image/*,.pdf", required: true },
      { id: "letter", type: "letter", label: "Faculty approval / Od letter", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Organizing an event",
    fraudChallenge: "Hard to verify student role",
    requiredProof: "Upload signed approval letter from faculty coordinator.",
    fields: [
      { id: "letter", type: "letter", label: "Signed approval letter from faculty coordinator", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Participating in other college event",
    fraudChallenge: "False participation claim",
    requiredProof:
      "Upload event poster + participation photo + participation certificate (Od letter).",
    fields: [
      { id: "poster", type: "poster", label: "Event poster", accept: "image/*,.pdf", required: true },
      { id: "photo", type: "photo", label: "Participation photo", accept: "image/*", required: true },
      { id: "letter", type: "letter", label: "Participation certificate / Od letter", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Cultural Participation",
    fraudChallenge: "No standardized proof",
    requiredProof:
      "Upload participation certificate or event photo + signed faculty letter (Od letter).",
    fields: [
      { id: "certificate", type: "certificate", label: "Participation certificate or event photo", accept: ".pdf,image/*", required: true },
      { id: "letter", type: "letter", label: "Signed faculty letter (Od letter)", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Sports and other activities",
    fraudChallenge: "Informal participation",
    requiredProof: "Upload sports department signed participation letter (Od letter).",
    fields: [
      { id: "letter", type: "letter", label: "Sports department signed participation letter (Od letter)", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "NCC/NSS activities",
    fraudChallenge: "Attendance tracking issues",
    requiredProof:
      "Upload attendance proof photo or official approval from NCC/NSS office (Od letter).",
    fields: [
      { id: "letter", type: "letter", label: "Attendance proof or NCC/NSS office approval (Od letter)", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Conducting coding contest",
    fraudChallenge: "Fake contest claims",
    requiredProof:
      "Upload event registration proof + contest platform link (GitHub/HackerRank etc.) + Faculty Approval Letter.",
    fields: [
      { id: "certificate", type: "certificate", label: "Event registration proof", accept: ".pdf,image/*", required: true },
      { id: "link", type: "link", label: "Contest platform link (GitHub, HackerRank, etc.)", placeholder: "https://...", required: true },
      { id: "letter", type: "letter", label: "Faculty Approval Letter", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Global Certificate",
    fraudChallenge: "Hard to verify foreign certificates",
    requiredProof: "Upload verifiable certificate link or digital badge.",
    fields: [
      { id: "certificate", type: "certificate", label: "Certificate file", accept: ".pdf,image/*", required: false },
      { id: "link", type: "link", label: "Verifiable certificate link or digital badge URL", placeholder: "https://...", required: true },
    ],
  },
  {
    activity: "Club Activities",
    fraudChallenge: "Inflated participation claims",
    requiredProof:
      "Upload proof of participation + approval letter from club president.",
    fields: [
      { id: "certificate", type: "certificate", label: "Proof of participation", accept: ".pdf,image/*", required: true },
      { id: "letter", type: "letter", label: "Approval letter from club president", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Student Chapter activity",
    fraudChallenge: "Multiple submissions for same event",
    requiredProof:
      "Upload activity photo or official activity letter (Od letter).",
    fields: [
      { id: "photo", type: "photo", label: "Activity photo or official activity letter (Od letter)", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Research/Project/Development",
    fraudChallenge: "Plagiarism or fake projects",
    requiredProof:
      "Upload project report + GitHub/demo link + supervisor approval letter.",
    fields: [
      { id: "certificate", type: "certificate", label: "Project report", accept: ".pdf", required: true },
      { id: "link", type: "link", label: "GitHub or demo link", placeholder: "https://github.com/...", required: true },
      { id: "letter", type: "letter", label: "Supervisor approval letter", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Study summer camp Abroad",
    fraudChallenge: "Fake admission letters",
    requiredProof:
      "Upload official offer letter + visa proof + institute verification email.",
    fields: [
      { id: "letter", type: "letter", label: "Official offer letter", accept: ".pdf,image/*", required: true },
      { id: "certificate", type: "certificate", label: "Visa proof", accept: ".pdf,image/*", required: true },
      { id: "certificate2", type: "certificate", label: "Institute verification email", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "NPTEL 12 week course",
    fraudChallenge: "Students upload shorter course certificates",
    requiredProof:
      "Upload certificate where AI checks course duration field.",
    fields: [
      { id: "certificate", type: "certificate", label: "NPTEL 12-week course certificate (duration verified by AI)", accept: ".pdf", required: true },
    ],
  },
  {
    activity: "External Certification",
    fraudChallenge: "Massive variety of formats",
    requiredProof:
      "Upload certificate file with digital verification link or badge.",
    fields: [
      { id: "certificate", type: "certificate", label: "Certificate file", accept: ".pdf,image/*", required: true },
      { id: "link", type: "link", label: "Digital verification link or badge URL", placeholder: "https://...", required: true },
    ],
  },
  {
    activity: ">8.5 CGPA",
    fraudChallenge: "Self-reported CGPA fraud",
    requiredProof: "Upload official semester marksheet or ERP verification.",
    fields: [
      { id: "marksheet", type: "marksheet", label: "Official semester marksheet or ERP screenshot", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Student Funding Project",
    fraudChallenge: "False funding claims",
    requiredProof: "Upload official sanction letter + transaction proof.",
    fields: [
      { id: "sanction", type: "sanction", label: "Official sanction letter", accept: ".pdf,image/*", required: true },
      { id: "certificate", type: "certificate", label: "Transaction proof", accept: ".pdf,image/*", required: true },
    ],
  },
  {
    activity: "Startup Funded and approved",
    fraudChallenge: "Fake funding announcements",
    requiredProof:
      "Upload funding agreement + startup registration proof + incubator letter.",
    fields: [
      { id: "agreement", type: "agreement", label: "Funding agreement", accept: ".pdf,image/*", required: true },
      { id: "certificate", type: "certificate", label: "Startup registration proof", accept: ".pdf,image/*", required: true },
      { id: "letter", type: "letter", label: "Incubator letter", accept: ".pdf,image/*", required: true },
    ],
  },
];
