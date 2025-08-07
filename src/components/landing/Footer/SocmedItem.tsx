import Icon from "@/components/admin/ui/Icon/Icon";

interface SocmedItemProps {
  icon: string;
}

export default function SocmedItem({ icon }: SocmedItemProps) {
  return (
    <li className="socmed-item">
      <Icon icon={icon} />
    </li>
  );
}
