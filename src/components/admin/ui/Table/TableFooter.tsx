import Icon from "../Icon/Icon";

export default function TableFooter() {
    return (
        <div className="table-footer">
            <div className="footer-amount">
                <span>1-5</span>
                <span>of</span>
                <span>20</span>
            </div>
            <nav className="footer-nav">
                <button type="button" className="nav-button">
                    <Icon icon="angle-left" />
                </button>
                <button type="button" className="nav-button">
                    <Icon icon="angle-right" />
                </button>
            </nav>
        </div>
    );
}
