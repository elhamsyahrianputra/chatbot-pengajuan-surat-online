import SidebarSection from "./SidebarSection";
import DropdownItem from "./DropdownItem";
import SimpleBar from "simplebar-react";
import SidebarItem from "./SidebarItem";

export default function SidebarMain() {

  // const router = useRouter();

  return (
    <nav>
      <SimpleBar className="sidebar-main">
        <ul className="sidebar-nav">
          <SidebarSection>
            <SidebarItem title="Dashboard" icon="dashboard" href="/admin" />
          </SidebarSection>
          <SidebarSection title="Surat">
            <SidebarItem title="Jenis Surat" icon="mail" href="/admin/letter-types" />
          </SidebarSection>
          <SidebarSection title="Pengajuan">
            <SidebarItem title="Pengajuan Surat" icon="file" href="/admin/letter-submissions" />
          </SidebarSection>
          <SidebarSection title="User Management">
            <SidebarItem title="User" icon="user" href="/admin/users"/>
          </SidebarSection>
        </ul>
      </SimpleBar>
    </nav>
  );
}
