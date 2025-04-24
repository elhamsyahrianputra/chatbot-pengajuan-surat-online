interface NavbarMenuProps {
  rightPopup?: boolean;
  children: React.ReactNode;
}

export default function NavbarMenu({ rightPopup = false, children }: NavbarMenuProps) {
  return (
    <ul className={`navbar-menu ${rightPopup ? "right-pop-up" : ""}`}>
      {children}
    </ul>
  );
}
