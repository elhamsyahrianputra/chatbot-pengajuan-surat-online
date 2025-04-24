import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ContactItemProps {
  icon: IconDefinition;
  children: React.ReactNode;
}

export default function ContactItem({ icon, children }: ContactItemProps) {
  return (
    <li className="contact-item">
      <FontAwesomeIcon icon={icon} />
      <span>{children}</span>
    </li>
  );
}
