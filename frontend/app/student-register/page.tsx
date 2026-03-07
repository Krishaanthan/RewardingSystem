/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { StudentAuthLayout } from "@/components/auth/StudentAuthLayout";
import { Select } from "@/components/ui/Select";

type Department = {
  name: string;
  duration: number;
};

const DEPARTMENTS: Department[] = [
  // Engineering Programmes (B.E. / B.Tech / B.Des)
  { name: "B.E - Computer Science and Engineering", duration: 4 },
  { name: "B.E - Computer Science and Engineering (Artificial Intelligence)", duration: 4 },
  { name: "B.E - Computer Science and Engineering (Data Science)", duration: 4 },
  { name: "B.E - Computer Science and Engineering (Internet of Things)", duration: 4 },
  { name: "B.E - Computer Science and Engineering (Artificial Intelligence and Robotics)", duration: 4 },
  { name: "B.E - Computer Science and Engineering (Artificial Intelligence and Machine Learning)", duration: 4 },
  { name: "B.E - Computer Science and Engineering (Cyber Security)", duration: 4 },
  { name: "B.Tech - Artificial Intelligence and Data Science", duration: 4 },
  { name: "B.E - Computer Science and Business Systems", duration: 4 },
  { name: "B.E - Electrical and Electronics Engineering", duration: 4 },
  { name: "B.E - Electronics and Communication Engineering", duration: 4 },
  { name: "B.E - Electronics and Communication Engineering (Data Science)", duration: 4 },
  { name: "B.E - Mechanical Engineering", duration: 4 },
  { name: "B.E - Mechatronics", duration: 4 },
  { name: "B.E - Aeronautical Engineering", duration: 4 },
  { name: "B.E - Civil Engineering", duration: 4 },
  { name: "B.Tech - Information Technology", duration: 4 },
  { name: "B.Tech - Chemical Engineering", duration: 4 },
  { name: "B.Tech - Biotechnology", duration: 4 },
  { name: "B.Tech - Biomedical Engineering", duration: 4 },
  { name: "B.Des - Design", duration: 4 },
  { name: "B.E - Electronics and Instrumentation Engineering", duration: 4 },
  { name: "B.E - Automobile Engineering", duration: 4 },

  // Architecture
  { name: "B.Arch", duration: 5 },

  // Pharmacy
  { name: "B.Pharm - Pharmacy", duration: 4 },
  { name: "Pharm.D - Doctor of Pharmacy", duration: 6 },

  // Nursing
  { name: "B.Sc - Nursing", duration: 4 },

  // Physiotherapy
  { name: "B.P.T - Physiotherapy", duration: 4 },

  // Dental
  { name: "B.D.S - Bachelor of Dental Surgery", duration: 5 },

  // Law
  { name: "B.A. LL.B. (Hons.)", duration: 5 },
  { name: "B.B.A. LL.B. (Hons.)", duration: 5 },
  { name: "B.Com. LL.B. (Hons.)", duration: 5 },
  { name: "LL.B.", duration: 3 },

  // Arts, Science and Humanities
  { name: "B.B.A - Bachelor of Business Administration", duration: 3 },
  { name: "B.Com - Bachelor of Commerce", duration: 3 },
  { name: "B.Com - Financial Accounting", duration: 3 },
  { name: "B.Sc - Visual Communication", duration: 3 },
  { name: "B.Sc - Physics", duration: 3 },
  { name: "B.Sc - Chemistry", duration: 3 },
  { name: "B.Sc - Computer Science", duration: 3 },
  { name: "B.Sc - Mathematics", duration: 3 },
  { name: "B.Sc - Biochemistry", duration: 3 },
  { name: "B.Sc - Fashion Design", duration: 3 },
  { name: "B.Sc - Biotechnology", duration: 3 },
  { name: "B.Sc - Microbiology", duration: 3 },
  { name: "B.Sc - Psychology", duration: 3 },
  { name: "B.A - English", duration: 3 },
  { name: "B.Sc - Bioinformatics and Data Science", duration: 3 },
  { name: "B.Sc - Clinical Nutrition and Dietetics", duration: 3 },
  { name: "B.Sc - Medical Lab Technology", duration: 3 },
  { name: "B.Sc - Computer Science (Artificial Intelligence)", duration: 3 },
  { name: "B.Sc - Data Science", duration: 3 },
  { name: "B.Sc - Information Technology", duration: 3 },
  { name: "B.C.A - Bachelor of Computer Applications", duration: 3 },
  { name: "B.Sc - Forensic Science", duration: 3 },
  { name: "B.Sc - Aviation", duration: 3 },
  { name: "B.Sc - Radiology and Imaging Technology", duration: 3 },
  { name: "B.A - Tamil", duration: 3 }
];

export default function StudentRegisterPage() {
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const selectedDepartment = useMemo(
    () => DEPARTMENTS.find((dept) => dept.name === selectedDepartmentName) ?? null,
    [selectedDepartmentName]
  );

  const availableYears = useMemo(
    () =>
      selectedDepartment
        ? Array.from({ length: selectedDepartment.duration }, (_, index) => `Year ${index + 1}`)
        : [],
    [selectedDepartment]
  );

  return (
    <StudentAuthLayout
      mode="register"
      title="Student Registration"
      subtitle="Create your account to start claiming reward points."
      activePortal="student"
    >
      <form className="space-y-5">
        <div>
          <label
            htmlFor="registration"
            className="mb-1.5 block text-sm text-white/90"
            style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
          >
            Registration Number
          </label>
          <input
            id="registration"
            name="registration"
            type="text"
            autoComplete="off"
            className="block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 outline-none transition placeholder:text-white/40 focus:border-white/50 focus:ring-1 focus:ring-white/50"
            placeholder="Enter registration number"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm text-white/90"
            style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 outline-none transition placeholder:text-white/40 focus:border-white/50 focus:ring-1 focus:ring-white/50"
            placeholder="Enter full name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="department"
              className="mb-1.5 block text-sm text-white/90"
              style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
            >
              Department
            </label>
            <Select
              id="department"
              value={selectedDepartmentName}
              onChange={(event) => {
                setSelectedDepartmentName(event.target.value);
                setSelectedYear("");
              }}
              className="bg-white/10 border-white/20 text-white/90"
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept.name} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label
              htmlFor="year"
              className="mb-1.5 block text-sm text-white/90"
              style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
            >
              Year
            </label>
            <Select
              id="year"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              disabled={!selectedDepartment}
              className="bg-white/10 border-white/20 text-white/90"
            >
              <option value="">Select Year</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="section"
              className="mb-1.5 block text-sm text-white/90"
              style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
            >
              Section
            </label>
            <input
              id="section"
              name="section"
              type="text"
              autoComplete="off"
              className="block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 outline-none transition placeholder:text-white/40 focus:border-white/50 focus:ring-1 focus:ring-white/50"
              placeholder="e.g. A"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm text-white/90"
              style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 outline-none transition placeholder:text-white/40 focus:border-white/50 focus:ring-1 focus:ring-white/50"
              placeholder="Create a password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8F113B] px-4 py-3.5 font-semibold text-white transition-all hover:bg-[#a61a49] hover:shadow-[0_0_20px_rgba(143,17,59,0.5)] focus:outline-none focus:ring-2 focus:ring-[#8F113B] focus:ring-offset-2 focus:ring-offset-black/50"
          style={{ fontFamily: '"League Spartan", system-ui, sans-serif' }}
        >
          Create Account
        </button>

        <p
          className="text-center text-xs text-white/60"
          style={{ fontFamily: '"Canva Sans", system-ui, sans-serif' }}
        >
          Already have an account?{" "}
          <Link href="/student-login" className="font-semibold text-[#ff4d79] hover:underline">
            Student Login
          </Link>
        </p>
      </form>
    </StudentAuthLayout>
  );
}

