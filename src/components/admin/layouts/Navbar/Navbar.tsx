"use client";

import Link from "next/link";
import Avatar from "../../ui/Avatar/Avatar";
import Icon from "../../ui/Icon/Icon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/api/services/auth.services";

export default function Navbar() {
    const router = useRouter();

    const [isShowPopup, setIsShowPopUp] = useState(false);

    function handleShowPopup(value: boolean) {
        setIsShowPopUp(value);
    }

    async function handleLogout() {
        await authService.logout();
        localStorage.removeItem('token');
        router.push('/login')
    }

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
                    <button className="profile-button" onClick={() => handleShowPopup(true)}>
                        <Avatar gender="male" className="profile-avatar" />
                        <span className="ring"></span>
                    </button>

                    <div className={`profile-popup ${!isShowPopup ? "close" : ""}`}>
                        <div className="popup-close">
                            <button onClick={() => handleShowPopup(false)}>
                                <Icon icon="close-black" />
                            </button>
                        </div>
                        <div className="popup-header">
                            <Avatar gender="male" className="profile-avatar" />

                            <div className="profile-data">
                                <h4 className="profile-name">Elham Syahrian Putra</h4>
                                <span className="profile-email">elhamsyahrianputra@student.uns.ac.id</span>
                            </div>
                        </div>
                        <ul className="popup-list">
                            <li className="popup-item">
                                <Link href={``} className="popup-link">
                                    <Icon icon="dashboard" />
                                    Dashboard
                                </Link>
                            </li>
                            <li className="popup-item">
                                <Link href={``} className="popup-link">
                                    <Icon icon="user" />
                                    Profile
                                </Link>
                            </li>
                        </ul>
                        <div className="popup-footer">
                            <button className="button-logout" onClick={() => handleLogout()}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
