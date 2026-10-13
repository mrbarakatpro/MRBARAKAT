import React from 'react';
import { useFrisca } from '../context/FriscaContext';

interface FriscaLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textClassName?: string;
}

export const FriscaLogo: React.FC<FriscaLogoProps> = ({
  className = '',
  size = 32,
  showText = false,
  textClassName = '',
}) => {
  const { siteTexts } = useFrisca();
  const logo = siteTexts.logoUrl || '';

  const renderBadge = () => {
    // 1. If user uploaded a custom logo (Base64 data URL or external URL)
    if (logo && (logo.startsWith('data:image') || logo.startsWith('http') || logo.startsWith('/'))) {
      return (
        <div
          className={`relative rounded-xl overflow-hidden flex items-center justify-center shrink-0 ${className}`}
          style={{ width: size, height: size }}
        >
          <img
            src={logo}
            alt="FRISCA Restaurant Logo"
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    // 2. Preset 1: Modern Monogram (مونوغرام عصري نبيتي فاخر مع تاج مصغر)
    if (logo === 'preset:modern-monogram') {
      return (
        <div
          className={`relative shrink-0 flex items-center justify-center ${className}`}
          style={{ width: size, height: size }}
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect width="96" height="96" x="2" y="2" rx="24" fill="#64161f" stroke="#d4a373" strokeWidth="2.5" />
            {/* Small golden crown */}
            <path
              d="M32 30 L40 37 L50 25 L60 37 L68 30 L64 42 L36 42 Z"
              fill="#d4a373"
            />
            {/* Elegant Monogram F */}
            <path
              d="M38 48 H62 M38 60 H54 M38 48 V76"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="25" r="2" fill="#FFFFFF" />
          </svg>
        </div>
      );
    }

    // 3. Preset 2: Italian Culinary Seal (الختم الإيطالي مع قبعة الطهي وسنابل القمح)
    if (logo === 'preset:chef-culinary') {
      return (
        <div
          className={`relative shrink-0 flex items-center justify-center ${className}`}
          style={{ width: size, height: size }}
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#1e0508" stroke="#782229" strokeWidth="4" />
            <circle cx="50" cy="50" r="40" fill="#782229" stroke="#d4a373" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Chef Hat outline */}
            <path
              d="M40 38 C35 38 34 32 39 30 C41 24 48 24 50 27 C53 23 60 24 61 30 C66 31 65 38 60 38 Z"
              fill="#FFFFFF"
            />
            <rect x="41" y="39" width="18" height="4" rx="1" fill="#d4a373" />
            {/* F letter */}
            <text
              x="50"
              y="68"
              fill="#FFFFFF"
              fontSize="26"
              fontWeight="900"
              fontFamily="serif"
              textAnchor="middle"
            >
              F
            </text>
          </svg>
        </div>
      );
    }

    // 4. Default / Preset 'badge-crest': Classic Imperial Burgundy Crest
    return (
      <div
        className={`relative shrink-0 flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="50" cy="50" r="47" fill="#782229" stroke="#9b2c35" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="41" stroke="#d4a373" strokeWidth="1" strokeOpacity="0.8" />
          {/* White Stylized F */}
          <path
            d="M 32 26
               L 68 26
               C 71 26, 73 28, 73 31
               C 73 34, 71 36, 68 36
               L 42 36
               L 42 46
               L 62 46
               C 65 46, 67 48, 67 51
               C 67 54, 65 56, 62 56
               L 42 56
               L 42 74
               C 42 77, 40 79, 37 79
               C 34 79, 32 77, 32 74
               Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2.5">
      {renderBadge()}

      {showText && (
        <div className={`flex flex-col text-right ${textClassName}`}>
          <span className="font-extrabold text-xl tracking-wider text-white font-serif leading-none">
            FRISCA
          </span>
          <span className="text-[10px] text-[#e0b4b8] font-medium mt-1">
            البحرين · تجربة طهي فاخرة
          </span>
        </div>
      )}
    </div>
  );
};
