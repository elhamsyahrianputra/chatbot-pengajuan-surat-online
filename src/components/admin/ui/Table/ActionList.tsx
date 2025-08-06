"use client";

interface ActionListProp {
    href: string;
    children: React.ReactNode;
}

import Link from "next/link";
import Icon from "../Icon/Icon";
import { useEffect, useRef, useState } from "react";

export default function ActionList({ href, children }: ActionListProp) {
    const [isShow, setIsShow] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    function handleShow() {
        setIsShow(!isShow);
    }

    useEffect(() => {
        // Function to handle clicks outside the popup
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsShow(false);
            }
        }

        // Add event listener when popup is shown
        if (isShow) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShow]);

    return (
        <div className="action-list">
            <Link href={href} className="action-button">
                <Icon icon="pencil" />
            </Link>
            <div className="action-popup" ref={popupRef}>
                <button className="popup-button" onClick={handleShow}>
                    <Icon icon="ellipsis" />
                </button>
                <ul className={`popup-list ${isShow ? "show" : ""}`}>
                    {children}
                </ul>
            </div>
        </div>
    );
}
