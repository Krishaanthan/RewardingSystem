import StudentNavbar from "@/components/ui/StudentNavbar";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <StudentNavbar />
            {children}
        </>
    );
}
