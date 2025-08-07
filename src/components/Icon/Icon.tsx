"use client";

import { useState, useEffect, FC, SVGProps } from "react";

// Tentukan tipe props untuk komponen Icon
interface IconProps extends SVGProps<SVGSVGElement> {
    name: string;
    variant?: "solid" | "outline" | "mini";
    className?: string;
}

// Definisikan tipe yang lebih spesifik untuk komponen ikon agar tidak menggunakan 'any'
type IconComponentType = FC<SVGProps<SVGSVGElement>>;

const Icon: FC<IconProps> = ({ name, variant = "solid", className, ...props }) => {
    // Gunakan tipe yang lebih spesifik untuk state untuk mengatasi error 'no-explicit-any'
    const [IconComponent, setIconComponent] = useState<IconComponentType | null>(null);

    useEffect(() => {
        // Reset komponen saat nama atau varian berubah untuk menghindari tampilan ikon lama
        setIconComponent(null);
        let isMounted = true; 

        const importIcon = async () => {
            if (!name) return;

            try {
                // Variabel ini tidak pernah diubah, jadi gunakan 'const'
                const library = 
                    variant === 'outline' 
                        ? await import('@heroicons/react/24/outline')
                    : variant === 'mini'
                        ? await import('@heroicons/react/20/solid')
                    : await import('@heroicons/react/24/solid');

                // Akses komponen ikon dari library berdasarkan 'name'
                const FetchedIcon = library[name as keyof typeof library];

                if (isMounted) {
                    if (FetchedIcon && typeof FetchedIcon === 'function') {
                        // Set komponen ikon ke dalam state
                        setIconComponent(() => FetchedIcon);
                    } else {
                        // Log error jika ikon tidak ditemukan
                        console.error(`Ikon "${name}" tidak ditemukan pada varian "${variant}"`);
                    }
                }
            } catch (err) {
                // Tangani error jika terjadi masalah saat impor
                console.error(`Gagal mengimpor ikon: ${name}`, err);
            }
        };

        importIcon();

        // Cleanup function untuk mencegah memory leak
        return () => {
            isMounted = false;
        };
    }, [name, variant]); // Jalankan effect setiap kali 'name' atau 'variant' berubah

    if (!IconComponent) {
        // Tampilkan placeholder atau null selagi ikon dimuat
        // Menggunakan span kosong dengan ukuran yang sama untuk mencegah pergeseran layout (CLS)
        return <span className={className} style={{ width: '20px', height: '20px', display: 'inline-block' }} />;
    }

    // Berikan style default dan gabungkan dengan className dari props
    const finalClassName = `inline-block ${className || ''}`.trim();

    return <IconComponent className={finalClassName} {...props} style={{ width: '20px', height: '20px', ...props.style }} />;
};

export default Icon;
