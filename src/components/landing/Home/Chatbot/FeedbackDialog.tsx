export default function FeedbackDialog() {
    return (
        <div className="feedback-dialog">
            <div className="feedback-row">
                <button className="feedback-button">👍 Ya, sangat membantu</button>
                <button className="feedback-button">🧩 Tidak Lengkap</button>
            </div>
            <div className="feedback-row">
                <button className="feedback-button">🚫 Tidak Relevant</button>
                <button className="feedback-button">⚠️ Tidak Sesuai Kondisi</button>
            </div>
        </div>
    );
}
