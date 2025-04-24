import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocmedItemProps {
  icon: IconDefinition;
}

export default function SocmedItem({ icon }: SocmedItemProps) {
  return (
    <li className="socmed-item">
      <FontAwesomeIcon icon={icon} />
    </li>
  );
}
