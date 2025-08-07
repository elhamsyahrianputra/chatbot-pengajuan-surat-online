import Icon from "@/components/Icon/Icon";

export default function RequirementItem({text}: {text: string}) {
  return (
    <li className="recruitment-item">
      <span className="recruitment-icon">
        <Icon name='CheckIcon' />
      </span>
      <p className="recruitment-text">
        {text}
      </p>
    </li>
  );
}
