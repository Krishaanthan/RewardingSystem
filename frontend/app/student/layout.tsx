import StudentNavbar from "@/components/ui/StudentNavbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <StudentNavbar />
            {children}
        </ProtectedRoute>
    );
}
