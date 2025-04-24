import Badge from "../../ui/Badge/Badge";

interface StatusBadgeProps {
    status:
        | "submitted"
        | "approved"
        | "revision"
        | "rejected"
        | "completed"
        | "canceled";
}

const statusColorMap = {
    submitted: "blue",
    approved: "green",
    revision: "orange",
    rejected: "red",
    completed: "purple",
    canceled: "grey",
} as const;

export default function StatusBadge({ status }: StatusBadgeProps) {
    return <Badge color={statusColorMap[status]}>{status}</Badge>;
}
