"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [formData, setFormData] = useState({
    registration: "",
    name: "",
    password: "",
    section: "",
  });
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registration_number: formData.registration,
          name: formData.name,
          department: selectedDepartmentName,
          password: formData.password,
          role: "STUDENT",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      // Success - redirect to login
      router.push("/student-login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StudentAuthLayout
      mode="register"
      title="Student Registration"
      subtitle="Create your account to start claiming reward points."
      activePortal="student"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 border border-red-100">
            {error}
          </div>
        )}
        <div>
          <label
            htmlFor="registration"
            className="mb-1.5 block text-sm text-black font-primary"
          >
            Registration Number
          </label>
          <input
            id="registration"
            name="registration"
            type="text"
            required
            value={formData.registration}
            onChange={handleChange}
            autoComplete="off"
            className="block w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none transition placeholder:text-black/40 focus:border-black/50 focus:ring-1 focus:ring-black/50"
            placeholder="Enter registration number"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm text-black font-primary"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            className="block w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none transition placeholder:text-black/40 focus:border-black/50 focus:ring-1 focus:ring-black/50"
            placeholder="Enter full name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="department"
              className="mb-1.5 block text-sm text-black font-primary"
            >
              Department
            </label>
            <Select
              id="department"
              required
              value={selectedDepartmentName}
              onChange={(event) => {
                setSelectedDepartmentName(event.target.value);
                setSelectedYear("");
              }}
              className="bg-white/40 border-black/20 text-black focus:ring-black/50 transition-all focus:border-black/50"
            >
              <option value="" className="bg-[#FBEFF1] text-black">Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept.name} value={dept.name} className="bg-[#FBEFF1] text-black">
                  {dept.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label
              htmlFor="year"
              className="mb-1.5 block text-sm text-black font-primary"
            >
              Year
            </label>
            <Select
              id="year"
              required
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              disabled={!selectedDepartment}
              className="bg-white/40 border-black/20 text-black focus:ring-black/50 transition-all focus:border-black/50"
            >
              <option value="" className="bg-[#FBEFF1] text-black">Select Year</option>
              {availableYears.map((year) => (
                <option key={year} value={year} className="bg-[#FBEFF1] text-black">
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
              className="mb-1.5 block text-sm text-black font-primary"
            >
              Section
            </label>
            <input
              id="section"
              name="section"
              type="text"
              value={formData.section}
              onChange={handleChange}
              autoComplete="off"
              className="block w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none transition placeholder:text-black/40 focus:border-black/50 focus:ring-1 focus:ring-black/50"
              placeholder="e.g. A"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm text-black font-primary"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="block w-full rounded-xl border border-black/20 bg-white/40 px-4 py-3 text-black outline-none transition placeholder:text-black/40 focus:border-black/50 focus:ring-1 focus:ring-black/50"
              placeholder="Create a password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8F113B] px-4 py-3.5 font-semibold text-white transition-all hover:bg-[#a61a49] hover:shadow-[0_0_20px_rgba(131,18,56,0.5)] focus:outline-none focus:ring-2 focus:ring-[#8F113B] focus:ring-offset-2 focus:ring-offset-white/50 font-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <p
          className="text-center text-xs text-black/60 font-primary"
        >
          Already have an account?{" "}
          <Link href="/student-login" className="font-semibold text-[#8F113B] hover:underline">
            Student Login
          </Link>
        </p>
      </form>
    </StudentAuthLayout>
  );
}

