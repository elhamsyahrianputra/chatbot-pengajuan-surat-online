import OnlineServiceItem from "@/components/landing/Home/OnlineServiceItem";
import {
  faMailBulk,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  return (
    <main id="home">
      <section className="jumbotron">
        <div className="jumbotron-content">
          <h1 className="jumbotron-title">Akademik FKIP</h1>
          <span className="jumbotron-subtitle">
            Selamat datang di Web Akademik FKIP UNS
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          viewBox="0 0 1024 216"
          preserveAspectRatio="none"
          fill="rgba(255,255,255,1)"
        >
          <path
            style={{ opacity: 0.12 }}
            d="M1024.1 1.068c-19.4-.5-38.7-1.6-57.7-.3-206.6 15-248.5 126.6-455 143.8-184.8 15.5-285.7-60.9-464.3-41.3-16.9 1.8-32.5 4.4-47.1 7.6l.1 105.2h1024v-215z"
          ></path>
          <path
            style={{ opacity: 0.18 }}
            d="M1024.1 20.068c-30.2-1.6-59.6-1.6-86.8.4-206.6 15.1-197.3 122.6-403.9 139.8-184.9 15.5-278.5-58.2-457.1-38.4-28.3 3.2-53.5 8.2-76.2 14.6v79.744h1024V20.068z"
          ></path>
          <path
            style={{ opacity: 0.24 }}
            d="M1024.1 46.668c-22.2-.3-43.8.2-64.2 1.7-206.6 15-197.8 112.5-404.4 129.7-184.8 15.5-226.8-51.1-405.4-31.3-54.8 6-104.9 18.3-150 33.7v35.744h1024V46.668z"
          ></path>
          <path d="M1024.1 54.368c-4 .2-8 .4-11.9.7-206.5 15.1-227.9 124.4-434.5 141.6-184.9 15.5-226.3-41.1-404.9-21.3-64 7.2-121.9 20.8-172.7 37.9v3.044h1024V54.368z"></path>
        </svg>
      </section>

      <section id="online-service">
        <div className="online-service-header">
          <h2 className="online-service-title">Layanan Online</h2>
          <h3 className="online-service-subtitle">Akademik FKIP</h3>
        </div>

        <div className="container">
          <ul className="online-service-list">
            <OnlineServiceItem
              icon={faMailBulk}
              href="/pengajuan-surat-online"
              title="Layanan Surat Online"
              text="Guna Meningkatkan pelayanan, Akademik FKIP UNS memberikan pelayanan
            surat menyurat secara online yang dibuka setiap hari di jam kerja"
            />
            <OnlineServiceItem
              icon={faUserGraduate}
              href="#"
              title="Layanan Wisuda Online"
              text="Melayani pengumpulan berkas wisuda secara online"
            />
          </ul>
        </div>
      </section>
    </main>
  );
}
