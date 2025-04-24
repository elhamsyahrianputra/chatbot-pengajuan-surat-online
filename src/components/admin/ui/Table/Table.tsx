import Avatar from "../Avatar/Avatar";
import Badge from "../Badge/Badge";
import Icon from "../Icon/Icon";
import TabButton from "./TabButton";

interface TableProps {
    colGroup?: string[];
    tabButtons?:
        | React.ReactElement<typeof TabButton>
        | React.ReactElement<typeof TabButton>[];
    tableHeaders: React.ReactElement | React.ReactElement[];
    children: React.ReactNode;
}

export default function Table({
    colGroup,
    tabButtons,
    tableHeaders,
    children,
}: TableProps) {
    return (
        <div className="table-wrapper">
            {tabButtons && (
                <div className="table-header">
                    <div className="tab-wrapper">{tabButtons}</div>
                </div>
            )}
            <div className="table-search">
                <form action="" className="table-form">
                    <label className="search-label">
                        <Icon icon="magnifying" className="search-icon" />
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Cari data pengajuan surat..."
                        />
                    </label>
                </form>
                <Icon icon="ellipsis" className="search-menu" />
            </div>
            <div className="table-list">
                <table>
                    {colGroup && (
                        <colgroup>
                            {colGroup.map((colWidth, index) => (
                                <col key={index} style={{ width: colWidth }} />
                            ))}
                        </colgroup>
                    )}
                    <thead className="list-header">
                        <tr>{tableHeaders}</tr>
                    </thead>
                    <tbody className="list-body">{children}</tbody>
                </table>
            </div>
            <div className="table-footer">
                {/* <div className="footer-amount">
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
                </nav> */}
            </div>
        </div>
    );
}
