import Icon from "@/components/Icon/Icon";

interface ContactItemProps {
  icon: string;
  children: React.ReactNode;
}

export default function ContactItem({ icon, children }: ContactItemProps) {

  return (
    <li className="contact-item flex items-center gap-2">
      <Icon name={icon} />
      <span>{children}</span>
    </li>
  );
}
