"use client";

import { Badge } from "@/components/ui/Badge";

export default function FacultyProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex max-w-6xl gap-8 px-6 py-10 lg:py-12">
        <aside className="w-full max-w-xs rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="h-28 w-28 rounded-full border-4 border-white shadow-md">
                <img
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Faculty profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Dr. John Smith
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              Assistant Professor · Computer Science
            </p>

            <div className="mt-4 space-y-1 text-xs text-gray-600">
              <p>
                <span className="font-semibold text-gray-700">Faculty ID:</span> FAC1023
              </p>
              <p>
                <span className="font-semibold text-gray-700">Email:</span> johnsmith@university.edu
              </p>
              <p>
                <span className="font-semibold text-gray-700">Phone:</span> 9876543210
              </p>
            </div>

            <div className="mt-6 flex w-full flex-col gap-3">
              <button
                type="button"
                className="w-full rounded-full bg-[#8F113B] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-[#751036]"
              >
                Edit Profile
              </button>
              <button
                type="button"
                className="w-full rounded-full border border-[#8F113B] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#8F113B] transition hover:bg-[#8F113B]/5"
              >
                Change Password
              </button>
            </div>

            <div className="mt-6 w-full border-t border-gray-100 pt-4">
              <p className="mb-2 text[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                Account Settings
              </p>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center justify-between">
                  <span>Edit Profile</span>
                  <span className="h-1 w-1 rounded-full bg-gray-400" />
                </li>
                <li className="flex items-center justify-between">
                  <span>Change Password</span>
                  <span className="h-1 w-1 rounded-full bg-gray-400" />
                </li>
                <li className="flex items-center justify-between">
                  <span>Upload Profile Picture</span>
                  <span className="h-1 w-1 rounded-full bg-gray-400" />
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <header className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Faculty Profile
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage your academic and professional information.
              </p>
            </div>
            <div className="hidden gap-3 sm:flex">
              <button
                type="button"
                className="rounded-full border border-[#8F113B] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#8F113B] transition hover:bg-[#8F113B]/5"
              >
                Edit Profile
              </button>
              <button
                type="button"
                className="rounded-full bg-[#8F113B] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-[#751036]"
              >
                Save Changes
              </button>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Basic Information
                  </h3>
                </div>
                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Full Name</dt>
                    <dd className="mt-1 text-gray-900">Dr. John Smith</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Faculty ID</dt>
                    <dd className="mt-1 text-gray-900">FAC1023</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Department</dt>
                    <dd className="mt-1 text-gray-900">Computer Science</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Designation</dt>
                    <dd className="mt-1 text-gray-900">Assistant Professor</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Email ID</dt>
                    <dd className="mt-1 text-gray-900">johnsmith@university.edu</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Phone Number</dt>
                    <dd className="mt-1 text-gray-900">9876543210</dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Personal Details
                  </h3>
                </div>
                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Date of Birth</dt>
                    <dd className="mt-1 text-gray-900">10 August 1985</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Gender</dt>
                    <dd className="mt-1 text-gray-900">Male</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Address</dt>
                    <dd className="mt-1 text-gray-900">
                      12, Lake View Street, Chennai, Tamil Nadu - 600119
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Nationality</dt>
                    <dd className="mt-1 text-gray-900">Indian</dd>
                  </div>
                </dl>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Professional Details
                  </h3>
                </div>
                <dl className="grid grid-cols-1 gap-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Years of Experience</dt>
                      <dd className="mt-1 text-gray-900">11+ years</dd>
                    </div>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Subjects Handled</dt>
                    <dd className="mt-1 text-gray-900">
                      Data Structures, Machine Learning, Operating Systems
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Current Courses Teaching</dt>
                    <dd className="mt-1 text-gray-900">
                      B.Tech CSE (3rd Year) – Machine Learning<br />
                      B.Tech IT (2nd Year) – Data Structures
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-gray-400">Previous Institutions Worked</dt>
                    <dd className="mt-1 text-gray-900">
                      ABC Institute of Technology (2013–2017)<br />
                      XYZ College of Engineering (2017–2020)
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Account Settings
                  </h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Manage your login credentials and security preferences.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="rounded-full bg-[#8F113B] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-[#751036]"
                    >
                      Change Password
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-[#8F113B] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#8F113B] transition hover:bg-[#8F113B]/5"
                    >
                      Upload Profile Picture
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  Academic Qualifications
                </h3>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  { degree: "PhD – Artificial Intelligence", university: "IIT Madras", year: "2018" },
                  { degree: "M.Tech – Computer Science", university: "Anna University", year: "2013" },
                  { degree: "B.Tech – Information Technology", university: "ABC University", year: "2011" }
                ].map((item) => (
                  <li
                    key={item.degree}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{item.degree}</p>
                      <p className="text-xs text-gray-500">
                        {item.university} · {item.year}
                      </p>
                    </div>
                    <Badge label="Verified" variant="approved" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  Achievements & Awards
                </h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="rounded-xl border border-[#8F113B]/20 bg-[#8F113B]/5 px-3 py-3">
                  <p className="font-semibold text-[#8F113B]">Best Faculty Award – 2022</p>
                  <p className="text-xs text-gray-600">
                    Recognized for outstanding teaching and student mentoring in the Department of Computer Science.
                  </p>
                </li>
                <li className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3">
                  <p className="font-semibold text-gray-900">Research Grant – AI for Education</p>
                  <p className="text-xs text-gray-600">
                    Principal Investigator for a funded research project on AI-based learning analytics.
                  </p>
                </li>
                <li className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3">
                  <p className="font-semibold text-gray-900">Academic Excellence</p>
                  <p className="text-xs text-gray-600">
                    Consistent 95%+ course feedback scores over the last 5 academic years.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  Research & Publications
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <details className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-900">
                    Research Papers
                  </summary>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-gray-600">
                    <li>Deep Learning Approaches for Student Performance Prediction – IEEE Transactions, 2022.</li>
                    <li>Fairness in Educational Recommendation Systems – ACM Conference, 2021.</li>
                  </ul>
                </details>
                <details className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-900">
                    Journals & Conferences
                  </summary>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-gray-600">
                    <li>10+ papers in Scopus and WoS indexed journals.</li>
                    <li>Regular reviewer for leading AI in Education conferences.</li>
                  </ul>
                </details>
                <details className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-900">
                    Patents
                  </summary>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-gray-600">
                    <li>Patent filed for Adaptive Rewarding Engine for Academic Performance Tracking, 2023.</li>
                  </ul>
                </details>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  Documents & Attachments
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center">
                  <p className="text-xs font-semibold text-gray-700">Upload Supporting Documents</p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Resume, certificates, publications and other verified documents.
                  </p>
                  <button
                    type="button"
                    className="mt-3 rounded-full bg-[#8F113B] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-[#751036]"
                  >
                    Upload Files
                  </button>
                </div>

                <ul className="space-y-2 text-xs">
                  <li className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
                    <div>
                      <p className="font-semibold text-gray-900">Resume_CV.pdf</p>
                      <p className="text-[11px] text-gray-500">Updated: 02 Feb 2025 · 1.2 MB</p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#8F113B]">View</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
                    <div>
                      <p className="font-semibold text-gray-900">PhD_Certificate.pdf</p>
                      <p className="text-[11px] text-gray-500">Updated: 15 Jan 2024 · 800 KB</p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#8F113B]">View</span>
                  </li>
                  <li className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
                    <div>
                      <p className="font-semibold text-gray-900">Publications_List.pdf</p>
                      <p className="text-[11px] text-gray-500">Updated: 10 Dec 2023 · 650 KB</p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#8F113B]">View</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

