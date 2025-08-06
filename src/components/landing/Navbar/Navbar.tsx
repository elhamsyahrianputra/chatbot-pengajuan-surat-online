"use client";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import NavbarItem from "./NavbarItem"
import MenuItem from "./MenuItem";
import NavbarMenu from "./NavbarMenu";
import LoginAction from "./LoginAction";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-wrapper">
          <div className="navbar-brand">
            <Link href="/" className="nav-link">
              <Image
                src="/img/logo/akademik-fkip-logo.png"
                alt="Logo Akademik FKIP UNS"
                width={251}
                height={69}
              />
              <Image
                src="/img/logo/kampus-merdeka-logo.png"
                alt="Logo Kampus Merdeka"
                width={129}
                height={69}
              />
            </Link>
          </div>
          <nav>
            <ul className="navbar-nav">
              <NavbarItem title="Home" icon={faHome} href="/" />
              <NavbarItem title="Layanan Online">
                <NavbarMenu>
                  <MenuItem
                    title="Surat Online"
                    href="/pengajuan-surat-online"
                  />
                  <MenuItem
                    title="PDDIKTI Universitas"
                    href="/pddikti-niversitas"
                  />
                  <MenuItem title="Wisuda" href="/wisuda" />
                  <MenuItem title="Eksepsi" href="/eksepsi" />
                  <MenuItem title="Defer Studi" href="/defer-studi" />
                  <MenuItem title="Keringanan 100%" href="/keringanan" />
                </NavbarMenu>
              </NavbarItem>

              {/* <NavbarItem title="Program Studi" href="/program-studi"/> */}

              <NavbarItem title="Alur">
                <NavbarMenu>
                  <MenuItem title="Pembayaran" href="/pembayaran" />
                </NavbarMenu>
              </NavbarItem>

              {/* <NavbarItem title="Download">
                <NavbarMenu>
                  <MenuItem title="SK Mengajar" href="/sk-mengajar" />
                  <MenuItem title="Akreditasi" href="/akreditasi" />
                  <MenuItem title="Blanko Mahasiswa" href="/blanko-mahasiswa" />
                  <MenuItem title="Nilai KKN" href="/nilai-kkn" />
                  <MenuItem title="Panduan" href="/panduan" />
                  <MenuItem title="Peraturan" href="/peraturan" />
                  <MenuItem
                    title="Kalender Akademik"
                    href="/kalender-akademik"
                  />
                  <MenuItem title="SK Beasiswa" href="/sk-beasiswa" />
                </NavbarMenu>
              </NavbarItem>

              <NavbarItem title="Pantauan">
                <NavbarMenu rightPopup={true}>
                  <MenuItem title="Lacak Surat Online" href="/lacak-surat-online" />
                  <MenuItem title="Lacak Surat Offline" href="/lacak-surat-offline" />
                  <MenuItem title="Lacak Keringanan 100%" href="/lacak-keringanan" />
                  <MenuItem title="Lacak Verifikasi Berkas Wisuda" href="/lacak-verifikasi-berkas-wisuda" />
                  <MenuItem title="Lacak Transkrip Nilai" href="/lacak-transkrip-nilai" />
                  <MenuItem title="Lacak Perpanjangan, Penundaan, Cuti" href="/lacak-perpanjangan-penundaan-cuti" />
                  <MenuItem title="Lacak Defer Studi Pascasarjana" href="/lacak-defer-studi-pascasarjana" />
                </NavbarMenu>
              </NavbarItem> */}

              <LoginAction />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
