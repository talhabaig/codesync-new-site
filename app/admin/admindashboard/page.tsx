"use client";

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Admin APIs first. Module management screens come next.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Blogs", "Jobs", "Team", "Services", "Portfolio", "Testimonials"].map(
          (module) => (
            <div
              key={module}
              className="rounded-2xl border border-dashed border-gray-300 bg-white p-5"
            >
              <h2 className="font-semibold text-gray-800">{module}</h2>
              <p className="mt-1 text-sm text-gray-500">Coming soon</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
