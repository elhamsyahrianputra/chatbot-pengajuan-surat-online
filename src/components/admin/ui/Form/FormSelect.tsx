import { useState, useEffect, useRef } from "react";

interface FormSelectProps {
    className: string;
    value?: string;
    children: React.ReactNode;
}

export default function FormSelect({ className, value, children }: FormSelectProps) {
    const [isShow, setIsShow] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    function handleSelectList() {
        setIsShow((prev) => !prev);
    }

    function handleChildClick() {
        setIsShow(false);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsShow(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className={`form-select ${className}`}>
            <span className="form-input" onClick={handleSelectList}>
                {value || "Select one"}
            </span>
            <div className={`select-list ${isShow ? "show" : ""}`} onClick={handleChildClick}>
                {children}
            </div>
        </div>
    );
}
