import { AuthLayout } from "@/components/auth/AuthLayout";

export default function StudentRegisterPage() {
  return (
    <AuthLayout
      title="Student Register"
      subtitle="Create your account to start claiming reward points."
      fields={["Registration Number", "Name", "Year", "Department", "Section", "Password"]}
      buttonLabel="Create Account"
      links={[{ label: "Already have an account? Student Login", href: "/student-login" }]}
    />
  );
}
