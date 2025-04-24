interface DropdownItemProps {
    title: string;
}

export default function DropdownItem({title}: DropdownItemProps) {
    return (
        <li className="dropdown-item">
            <a href="" className="dropdown-link">{title}</a>
        </li>
    );
}