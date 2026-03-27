"use client";

export default function FacultyProfilePage() {
  return (
    <>
      <style>{`
        .card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 32px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          box-shadow: 0 8px 32px 0 rgba(131, 18, 56, 0.3);
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .card:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.45);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="min-h-screen bg-white font-primary">
        <main className="mx-auto max-w-6xl px-6 pb-12 pt-28 space-y-8">
          <div className="card flex flex-col gap-8 p-8 md:flex-row md:p-10">
            <aside className="flex w-full max-w-sm flex-col items-center border-b border-black/10 pb-6 text-center md:border-b-0 md:border-r md:pb-0 md:pr-8">
                <div className="relative mb-4">
                  <div className="h-28 w-28 rounded-full border-4 border-white shadow-md">
                    <img
                      src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Faculty profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white bg-green-500" />
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
                    className="w-full rounded-full bg-[#8F113B] px-4 py-2 text-xs font-secondary font-black uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-[#751036]"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-full border border-[#8F113B] bg-white px-4 py-2 text-xs font-secondary font-black uppercase tracking-[0.16em] text-[#8F113B] transition hover:bg-[#8F113B]/5"
                  >
                    Change Password
                  </button>
                </div>

                <div className="mt-6 w-full border-t border-black/10 pt-4 text-left">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
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
            </aside>

            <section className="flex-1 space-y-8">
              <header className="flex flex-col gap-3 border-b border-black/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Faculty Profile
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    View and manage your academic and professional information.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="rounded-full border border-[#8F113B] bg-white px-4 py-2 text-xs font-secondary font-black uppercase tracking-[0.16em] text-[#8F113B] transition hover:bg-[#8F113B]/5"
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-[#8F113B] px-4 py-2 text-xs font-secondary font-black uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-[#751036]"
                  >
                    Save Changes
                  </button>
                </div>
              </header>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                  <section className="card p-6">
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

                  <section className="card p-6">
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
                  <section className="card p-6">
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

                  <section className="card p-6">
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
                          className="rounded-full bg-[#8F113B] px-4 py-2 text-xs font-secondary font-black uppercase tracking-[0.16em] text-white shadow-sm transition hover:bg-[#751036]"
                        >
                          Change Password
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-[#8F113B] bg-white px-4 py-2 text-xs font-secondary font-black uppercase tracking-[0.16em] text-[#8F113B] transition hover:bg-[#8F113B]/5"
                        >
                          Upload Profile Picture
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

