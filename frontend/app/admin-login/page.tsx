import { AuthLayout } from "@/components/auth/AuthLayout";

export default function AdminLoginPage() {
  return (
    <AuthLayout
      title="Admin Login"
      subtitle="High-security login with 2FA / Google Auth integration."
      fields={["Admin Email", "Password", "One-Time Code"]}
      buttonLabel="Secure Login"
      links={[
        { label: "Faculty Member? Faculty Login", href: "/faculty-login" },
        { label: "Go to Student Portal", href: "/student-login" }
      ]}
    />
  );
}
