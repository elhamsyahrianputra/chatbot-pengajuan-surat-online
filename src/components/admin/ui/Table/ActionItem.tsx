import Icon from "../Icon/Icon";

interface ActionItemProps {
    icon: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

export default function ActionItem({ icon, onSubmit, children }: ActionItemProps) {
    return (
        <li className="popup-item">
            <form onSubmit={onSubmit} className="popup-form">
                <button type="submit">
                    <Icon icon={icon} />
                    {children}
                </button>
            </form>
        </li>
    );
}
