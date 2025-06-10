import CategoryItem from "@/components/landing/Home/PengajuanSuratOnline/CategoryItem";
import { faCalendarAlt, faCheck, faInfoCircle, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { letterTypeService } from "@/api";

export default async function Page() {
    const letterTypes = await letterTypeService.getAll({ include: "requirements" });

    return (
        <main id="pengajuan-surat-online">
            <div className="container">
                <section id="jumbotron">
                    <div className="jumbotron-title">
                        <h1>Pengajuan Surat Online</h1>
                    </div>
                    <div className="jumbotron-content">
                        <div className="jumbotron-schedule">
                            <ul className="schedule-list">
                                <li className="schedule-item">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="schedule-icon" />
                                    <span className="schedule-text">Jadwal Buka Surat Online</span>
                                </li>
                                <li className="schedule-item">
                                    <FontAwesomeIcon icon={faCheck} className="schedule-icon" />
                                    <span className="schedule-text">Setiap Senin s/d Jumat</span>
                                </li>
                                <li className="schedule-item">
                                    <FontAwesomeIcon icon={faCheck} className="schedule-icon" />
                                    <span className="schedule-text">Mulai 08.00 - 11.00 WIB</span>
                                </li>
                                <li className="schedule-item">
                                    <FontAwesomeIcon icon={faCheck} className="schedule-icon" />
                                    <span className="schedule-text">TUTUP Sabtu, Minggu & Libur Nasional</span>
                                </li>
                            </ul>
                        </div>
                        <div className="jumbotron-illustration">
                            <Image src="/img/illustration/pengajuan-surat-online-illustration.svg" alt="Pengajuan Surat Online Illustration" width={374} height={242} />
                        </div>
                        <div className="jumbotron-timeline">
                            <ul className="timeline-list">
                                <li className="timeline-item timeline-title">Timeline</li>
                                <li className="timeline-item">
                                    <FontAwesomeIcon icon={faMinus} className="timeline-icon" />
                                    <span className="timeline-text">08.00 - 11.00 : Form dibuka</span>
                                </li>
                                <li className="timeline-item">
                                    <FontAwesomeIcon icon={faMinus} className="timeline-icon" />
                                    <span className="timeline-text">11.00 - 14.00 : Verifikasi surat ajuan</span>
                                </li>
                                <li className="timeline-item">
                                    <FontAwesomeIcon icon={faMinus} className="timeline-icon" />
                                    <span className="timeline-text">14.00 - 15.00 : Pemberian Nomor Surat, Tanda tangan dan Cap digital</span>
                                </li>
                                <li className="timeline-item">
                                    <FontAwesomeIcon icon={faMinus} className="timeline-icon" />
                                    <span className="timeline-text">15.00 - 15.30 : Pengiriman surat melalui email terdaftar</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="information">
                    <div className="information-content">
                        <FontAwesomeIcon icon={faInfoCircle} className="information-icon" size="lg" />
                        <span>
                            Pengajuan Perpanjangan, Penundaan, Cuti dibuka setiap hari dan jam kerja mulai <strong>Pkl. 08.00 - 15.00 WIB</strong>
                        </span>
                    </div>
                </section>

                <section id="category">
                    <ul className="category-list">
                        {letterTypes.map((item) => (
                            <CategoryItem key={item.id} title={item.name} href={item.requirements?.length === 0 ? "#" : `/pengajuan-surat-online/${item.slug}`} />
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}
