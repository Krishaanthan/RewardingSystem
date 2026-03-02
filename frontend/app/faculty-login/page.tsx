import { AuthLayout } from "@/components/auth/AuthLayout";

export default function FacultyLoginPage() {
  return (
    <AuthLayout
      title="Faculty Login"
      subtitle="Login with faculty ID or email."
      fields={["Faculty ID / Email", "Password"]}
      buttonLabel="Login"
      links={[
        { label: "Are you a Student? Student Login", href: "/student-login" },
        { label: "System Admin? Admin Login", href: "/admin-login" }
      ]}
    />
  );
}
