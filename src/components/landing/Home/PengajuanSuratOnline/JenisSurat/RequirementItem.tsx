import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RequirementItem({text}: {text: string}) {
  return (
    <li className="recruitment-item">
      <span className="recruitment-icon">
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <p className="recruitment-text">
        {text}
      </p>
    </li>
  );
}
