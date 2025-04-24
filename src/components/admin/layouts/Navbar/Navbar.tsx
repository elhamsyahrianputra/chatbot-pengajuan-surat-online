import Avatar from "../../ui/Avatar/Avatar";
import Icon from "../../ui/Icon/Icon";

export default function Navbar() {
    return (
        <header className="navbar">
            <div></div>
            <nav className="navbar-nav">
                <button>
                    <Icon icon="bell" />
                </button>
                <button>
                    <Icon icon="users" />
                </button>
                <button className="spinning">
                    <Icon icon="gear" />
                </button>
                <div className="nav-profile">
                    <Avatar gender="male" className="profile-avatar" />
                    <span className="ring"></span>
                </div>
            </nav>
        </header>
    );
}
