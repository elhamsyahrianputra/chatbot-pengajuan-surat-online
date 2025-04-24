import Icon from "../Icon/Icon";

interface ActionItemProps {
    icon: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

export default function ActionItem({ icon, onSubmit, children }: ActionItemProps) {
    return (
        <li className="popup-item">
            <form className="popup-form" method="post" onSubmit={onSubmit}>
                <button type="submit">
                    <Icon icon={icon} />
                    <span>{children}</span>
                </button>
            </form>
        </li>
    );
}
