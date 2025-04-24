import { letterTypeService } from "@/api";
import RequirementItem from "@/components/landing/Home/PengajuanSuratOnline/JenisSurat/RequirementItem";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  const letterType = await letterTypeService.getBySlug(slug, {
    include: "requirements",
  });

  return (
    <main id="jenis-surat">
      <div className="container">
        <div className="letter-type-header">
          <h1 className="letter-type-title">Surat {letterType.name}</h1>
        </div>
        <section id="download-section">
          <h3>Download Format Surat {letterType.name}</h3>
          <div>
            <a href="#">Format Surat {letterType.name}</a>
          </div>
        </section>
        <section id="recruitment-section">
          <h3 className="recruitment-title">Persyaratan</h3>
          <ul className="recruitment-list">
            {letterType.requirements?.map((item) => (
              <RequirementItem key={item.id} text={item.name} />
            ))}
          </ul>
        </section>
        <section id="submission-section">
          <h3 className="submission-title">Ajukan melalui form</h3>
          <div>
            <a href="#" className="submission-link">
              Form Pengajuan Surat {letterType.name}
            </a>
          </div>
        </section>
        <section id="track-section">
          <h3 className="track-title">Tunggu dan Lacak Suart</h3>
          <div>
            <a href="#" className="track-link">
              Lacak Surat
            </a>
          </div>
        </section>
        <section id="note-section">
          <h2 className="note-title">Catatan:</h2>
          <ul className="note-list">
            <li className="note-item">
              <p className="note-text">
                Jika ada pertanyaan/kurang jelas, bisa kontak melalui email <a href="mailto:akademik@fkip.uns.ac.id">akademik@fkip.uns.ac.id</a>
              </p>
            </li>
            <li className="note-item">
              <p className="note-text">
                Pengajuan Surat akan segera diproses dan diverifikasi, jika
                telah selesai, surat akan dikirimkan melalui email, mohon untuk
                selalu mengecek di <b>Inbox reguler/SPAM email</b>
              </p>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
