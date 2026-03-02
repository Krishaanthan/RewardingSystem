import { AuthLayout } from "@/components/auth/AuthLayout";

export default function StudentLoginPage() {
  return (
    <AuthLayout
      title="Student Login"
      subtitle="Login with your registration number and password."
      fields={["Registration Number", "Password"]}
      buttonLabel="Login"
      links={[
        { label: "New Student? Register Here", href: "/student-register" },
        { label: "Faculty Member? Faculty Login", href: "/faculty-login" },
        { label: "System Admin? Admin Login", href: "/admin-login" }
      ]}
    />
  );
}
