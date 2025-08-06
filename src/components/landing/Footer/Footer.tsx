import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBuilding,
  faEnvelope,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import ContactItem from "./ContactItem";
import NewsItem from "./NewsItem";
import AcademicItem from "./AcademicItem";
import SocmedItem from "./SocmedItem";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-seperator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          viewBox="0 -0.5 1024 182"
          preserveAspectRatio="none"
          fill="rgba(16,83,120,1)"
        >
          <path
            style={{ opacity: 0.12 }}
            d="M0 182.086h1024V41.593c-28.058-21.504-60.109-37.581-97.075-37.581-112.845 0-198.144 93.798-289.792 93.798S437.658 6.777 351.846 6.777s-142.234 82.125-238.49 82.125c-63.078 0-75.776-31.744-113.357-53.658L0 182.086z"
          ></path>
          <path
            style={{ opacity: 0.18 }}
            d="M1024 181.062v-75.878c-39.731 15.872-80.794 27.341-117.658 25.805-110.387-4.506-191.795-109.773-325.53-116.224-109.158-5.12-344.166 120.115-429.466 166.298H1024v-.001z"
          ></path>
          <path
            style={{ opacity: 0.24 }}
            d="M0 182.086h1024V90.028C966.451 59.103 907.059 16.3 824.115 15.071 690.278 13.023 665.19 102.93 482.099 102.93S202.138-1.62 74.24.019C46.49.326 21.811 4.217 0 9.849v172.237z"
          ></path>
          <path
            style={{ opacity: 0.3 }}
            d="M0 182.086h1024V80.505c-37.171 19.558-80.691 35.328-139.571 36.25-151.142 2.355-141.619-28.57-298.496-29.184s-138.854 47.002-305.459 43.725C132.813 128.428 91.238 44.563 0 28.179v153.907z"
          ></path>
          <path d="M0 182.086h1024v-77.312c-49.05 20.07-120.525 42.394-193.229 42.086-128.922-.512-159.846-72.294-255.795-72.294-89.088 0-134.656 80.179-245.043 82.022S169.063 99.346 49.971 97.401C32.768 97.094 16.077 99.244 0 103.135v78.951z"></path>
        </svg>
      </div>
      <div className="footer-wrapper">
        <div className="container">
          <div className="footer-main">
            <div className="footer-contact">
              <h4 className="contact-title">Kontak</h4>
              <ul className="contact-list">
                <ContactItem icon={faBuilding}>
                  Jalan Ir. Sutami 36A Surakarta 57126
                </ContactItem>
                <ContactItem icon={faPhone}>(0271) 669124 / 648939</ContactItem>
                <ContactItem icon={faEnvelope}>
                  akademik@fkip.uns.ac.id
                </ContactItem>
                <ContactItem icon={faGlobe}>
                  akademik@fkip.uns.ac.id
                </ContactItem>
              </ul>
            </div>
            <div className="footer-news">
              <h4 className="news-title">Berita UNS</h4>
              <ul className="news-list">
                <NewsItem href="#">
                  PPKG LPPM UNS Gelar Sosialisasi Pencegahan Pekerjaan terburuk
                  Anak di Kelurahan Gilingan, Surakarta
                </NewsItem>
                <NewsItem href="#">
                  Sebanyak 761 Lulusan UNS Diwisuda oleh Rektor
                </NewsItem>
                <NewsItem href="#">
                  FK UNS Lepas 21 Dokter Spesialis Baru Periode Juni 2023
                </NewsItem>
                <NewsItem href="#">
                  UNS Gelar Sosialisasi Empat Pilar MPR RI dan Kuliah Umum
                  Dihadiri Ketua MPR RI
                </NewsItem>
                <NewsItem href="#">
                  Prodi D3 Pepustakaan SV UNS Gelar Pengabdian Masyarakat
                  tentang Direktori Elektronik di Ngarhoyoso, Karanganyar
                </NewsItem>
              </ul>
            </div>
            <div className="footer-academic">
              <h4 className="academic-title">Data Akademik</h4>
              <ul className="academic-list">
                <AcademicItem href="#">SIAKAD</AcademicItem>
                <AcademicItem href="#">SPADA</AcademicItem>
                <AcademicItem href="#">RUANG</AcademicItem>
                <AcademicItem href="#">LEGALISIR</AcademicItem>
                <AcademicItem href="#">WISUDA FKIP</AcademicItem>
                <AcademicItem href="#">WISUDA UNS</AcademicItem>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          <div className="copyright-wrapper">
            <div className="copyright-content">
              &copy; Copyright 2012 - 2025| Akademik FKIP UNS
            </div>
            <div className="copyright-socmed">
              <ul className="socmed-list">
                <SocmedItem icon={faFacebook} />
                <SocmedItem icon={faInstagram} />
                <SocmedItem icon={faYoutube} />
                <SocmedItem icon={faTwitter} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
