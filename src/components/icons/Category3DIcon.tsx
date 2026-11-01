import React from 'react';
import { QRType } from '../../types';

interface Category3DIconProps {
  type: QRType;
  size?: number;
  className?: string;
  animateHover?: boolean;
}

/**
 * 3D-Styled Vector Icons for QR Genius Categories
 * Crafted with multi-layered dimensional shading, isometric geometry,
 * specular reflections, and ambient occlusion drop shadows.
 */

// 1. URL - 3D Glass Globe with Floating Golden Link Ring
export const Url3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="url-globe-grad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="45%" stopColor="#4F46E5" />
        <stop offset="85%" stopColor="#3730A3" />
        <stop offset="100%" stopColor="#1E1B4B" />
      </radialGradient>
      <linearGradient id="url-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="url-specular" x1="20%" y1="10%" x2="50%" y2="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <filter id="url-shadow" x="4" y="44" width="56" height="18" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
    {/* Base Ambient Occlusion Shadow */}
    <ellipse cx="32" cy="54" rx="20" ry="5" fill="#1E1B4B" fillOpacity="0.25" filter="url(#url-shadow)" />
    
    {/* 3D Sphere Body */}
    <circle cx="32" cy="30" r="22" fill="url(#url-globe-grad)" />
    
    {/* Dimensional Longitude & Latitude Rings */}
    <ellipse cx="32" cy="30" rx="9" ry="22" stroke="#A5B4FC" strokeWidth="1.75" strokeOpacity="0.65" strokeDasharray="3 1" />
    <ellipse cx="32" cy="30" rx="22" ry="7" stroke="#A5B4FC" strokeWidth="1.75" strokeOpacity="0.6" />
    <path d="M12 23C18 27 46 27 52 23" stroke="#A5B4FC" strokeWidth="1.5" strokeOpacity="0.45" />
    <path d="M12 37C18 33 46 33 52 37" stroke="#A5B4FC" strokeWidth="1.5" strokeOpacity="0.45" />
    
    {/* Floating 3D Diagonal Link Ring */}
    <ellipse cx="32" cy="30" rx="26" ry="10" transform="rotate(-30 32 30)" stroke="url(#url-ring-grad)" strokeWidth="4" strokeLinecap="round" />
    
    {/* Top Specular Gloss Highlight */}
    <ellipse cx="26" cy="18" rx="8" ry="4" transform="rotate(-25 26 18)" fill="url(#url-specular)" />
  </svg>
);

// 2. Wi-Fi - 3D Floating Signal Beacon & Emitting Waves
export const Wifi3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="wifi-dot-grad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="50%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="#581C87" />
      </radialGradient>
      <linearGradient id="wifi-wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E9D5FF" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#7E22CE" />
      </linearGradient>
      <linearGradient id="wifi-wave-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DDD6FE" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
    </defs>
    {/* Ambient Shadow */}
    <ellipse cx="32" cy="55" rx="16" ry="4" fill="#3B0764" fillOpacity="0.25" />
    
    {/* Outer Dimensional Wave */}
    <path 
      d="M10 20C22 7 42 7 54 20" 
      stroke="url(#wifi-wave-grad-1)" 
      strokeWidth="5.5" 
      strokeLinecap="round" 
    />
    <path 
      d="M12 18.5C23 6 41 6 52 18.5" 
      stroke="#FFFFFF" 
      strokeWidth="1.2" 
      strokeOpacity="0.7" 
      strokeLinecap="round" 
    />

    {/* Middle Dimensional Wave */}
    <path 
      d="M17 28C25 19 39 19 47 28" 
      stroke="url(#wifi-wave-grad-2)" 
      strokeWidth="5.5" 
      strokeLinecap="round" 
    />
    <path 
      d="M18.5 27C26 18.5 38 18.5 45.5 27" 
      stroke="#FFFFFF" 
      strokeWidth="1.2" 
      strokeOpacity="0.7" 
      strokeLinecap="round" 
    />

    {/* Inner Dimensional Wave */}
    <path 
      d="M24 36C28 31 36 31 40 36" 
      stroke="url(#wifi-wave-grad-1)" 
      strokeWidth="5" 
      strokeLinecap="round" 
    />

    {/* 3D Center Sphere Beacon */}
    <circle cx="32" cy="46" r="6.5" fill="url(#wifi-dot-grad)" />
    <circle cx="30" cy="44" r="2.2" fill="#FFFFFF" fillOpacity="0.8" />
  </svg>
);

// 3. WhatsApp - 3D Glossy Chat Sphere with Dimensional Handset
export const Whatsapp3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="wa-bubble-grad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="45%" stopColor="#22C55E" />
        <stop offset="85%" stopColor="#16A34A" />
        <stop offset="100%" stopColor="#14532D" />
      </radialGradient>
      <linearGradient id="wa-phone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DCFCE7" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="32" cy="56" rx="18" ry="4.5" fill="#14532D" fillOpacity="0.28" />

    {/* 3D Chat Bubble */}
    <path
      d="M32 10C19.85 10 10 19.85 10 32C10 36.2 11.2 40.1 13.2 43.5L11 53L20.8 50.9C24.1 52.9 27.9 54 32 54C44.15 54 54 44.15 54 32C54 19.85 44.15 10 32 10Z"
      fill="url(#wa-bubble-grad)"
    />

    {/* Glossy Rim Highlight */}
    <path
      d="M14 28C16 18 24 13 34 12"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />

    {/* 3D Phone Handset Icon */}
    <path
      d="M41 38.5C40.3 40.4 37.8 41.9 35.8 42.4C34.4 42.7 32.6 42.9 26.6 40.4C18.9 37.2 13.9 29.4 13.5 28.9C13.1 28.4 10.4 24.7 10.4 20.9C10.4 17.1 12.3 15.2 13.1 14.4C13.7 13.8 14.5 13.6 15 13.6C15.4 13.6 15.8 13.6 16.1 13.6C16.9 13.7 17.3 13.8 17.8 15C18.4 16.5 19.9 20.2 20.1 20.6C20.3 21 20.4 21.4 20.2 21.9C20 22.4 19.8 22.6 19.4 23.1C19 23.5 18.7 23.8 18.3 24.3C17.9 24.8 17.5 25.3 18 26.1C18.5 26.9 20.1 29.6 22.5 31.8C25.7 34.6 28.3 35.5 29.2 35.9C30 36.2 30.8 36.1 31.4 35.5C32.1 34.7 33 33.4 33.9 32.2C34.5 31.3 35.3 31.4 36.2 31.8C37.1 32.1 42 34.5 43 35C44 35.5 44.7 35.7 44.9 36.1C45.1 36.5 45.1 38.6 44.2 39.5L41 38.5Z"
      transform="scale(0.8) translate(7, 5)"
      fill="url(#wa-phone-grad)"
    />
  </svg>
);

// 4. vCard - 3D Isometric ID Card with Lanyard & Avatar
export const VCard3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="vcard-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="vcard-badge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="32" cy="57" rx="18" ry="4" fill="#0C4A6E" fillOpacity="0.25" />

    {/* Lanyard Top Clip */}
    <path d="M26 6H38V12H26V6Z" rx="2" fill="#64748B" />
    <path d="M30 6L32 2L34 6" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

    {/* 3D Main Card Body */}
    <rect x="14" y="10" width="36" height="46" rx="6" fill="url(#vcard-body)" />

    {/* Bevel Edge */}
    <rect x="14.75" y="10.75" width="34.5" height="44.5" rx="5.25" stroke="#BAE6FD" strokeWidth="1.2" strokeOpacity="0.8" />

    {/* Photo Badge */}
    <rect x="23" y="18" width="18" height="18" rx="4" fill="url(#vcard-badge)" />
    <circle cx="32" cy="24" r="4.5" fill="#0284C7" />
    <path d="M26 34C26 30.5 28.5 29 32 29C35.5 29 38 30.5 38 34" fill="#0284C7" />

    {/* Data Strip Lines */}
    <rect x="20" y="40" width="24" height="2.5" rx="1.25" fill="#E0F2FE" />
    <rect x="23" y="45" width="18" height="2.5" rx="1.25" fill="#BAE6FD" />
    <rect x="26" y="50" width="12" height="2" rx="1" fill="#BAE6FD" fillOpacity="0.8" />
  </svg>
);

// 5. Plain Text - 3D Layered Isometric Notepad
export const Text3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="text-pad-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F1F5F9" />
      </linearGradient>
      <linearGradient id="text-cover-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#4338CA" />
      </linearGradient>
      <linearGradient id="text-pencil-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="32" cy="56" rx="18" ry="4" fill="#312E81" fillOpacity="0.2" />

    {/* Bottom Cover Sheet */}
    <rect x="15" y="14" width="34" height="42" rx="5" fill="url(#text-cover-grad)" />

    {/* Top Paper Sheet */}
    <rect x="18" y="11" width="34" height="42" rx="5" fill="url(#text-pad-grad)" stroke="#E2E8F0" strokeWidth="1" />

    {/* Text Lines */}
    <rect x="23" y="19" width="14" height="3" rx="1.5" fill="#6366F1" />
    <rect x="23" y="26" width="24" height="2.5" rx="1.25" fill="#94A3B8" />
    <rect x="23" y="32" width="22" height="2.5" rx="1.25" fill="#CBD5E1" />
    <rect x="23" y="38" width="18" height="2.5" rx="1.25" fill="#CBD5E1" />

    {/* 3D Isometric Stylus / Pencil */}
    <g transform="rotate(-35 48 36)">
      <rect x="42" y="22" width="6" height="22" rx="2" fill="url(#text-pencil-grad)" />
      <polygon points="42,44 48,44 45,50" fill="#FDE68A" />
      <polygon points="44,48 46,48 45,50" fill="#1E293B" />
      <rect x="42" y="20" width="6" height="3" rx="1" fill="#F43F5E" />
    </g>
  </svg>
);

// 6. Email - 3D Glossy Floating Mail Envelope with Letter
export const Email3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="email-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="60%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#5B21B6" />
      </linearGradient>
      <linearGradient id="email-letter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#EDE9FE" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="32" cy="54" rx="20" ry="4.5" fill="#4C1D95" fillOpacity="0.25" />

    {/* Back Envelope Base */}
    <rect x="10" y="22" width="44" height="28" rx="6" fill="#6D28D9" />

    {/* Floating Crisp Letter */}
    <rect x="16" y="12" width="32" height="22" rx="4" fill="url(#email-letter)" stroke="#DDD6FE" strokeWidth="1" />
    <rect x="21" y="17" width="14" height="2.5" rx="1.25" fill="#7C3AED" />
    <rect x="21" y="22" width="22" height="2" rx="1" fill="#C4B5FD" />
    <rect x="21" y="26" width="16" height="2" rx="1" fill="#C4B5FD" />

    {/* Front Envelope Pocket */}
    <path d="M10 24L32 38L54 24V44C54 47.3 51.3 50 48 50H16C12.7 50 10 47.3 10 44V24Z" fill="url(#email-body)" />

    {/* Flap Outline */}
    <path d="M10 24L32 38L54 24" stroke="#DDD6FE" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
  </svg>
);

// 7. Phone - 3D Isometric Handset with Signal Rings
export const Phone3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="phone-pill-grad" cx="30%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064E3B" />
      </radialGradient>
      <linearGradient id="phone-ring" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="32" cy="55" rx="17" ry="4" fill="#064E3B" fillOpacity="0.25" />

    {/* 3D Round Base Shield */}
    <rect x="12" y="10" width="40" height="42" rx="12" fill="url(#phone-pill-grad)" />

    {/* Top Bevel Highlight */}
    <rect x="13" y="11" width="38" height="40" rx="11" stroke="#A7F3D0" strokeWidth="1.5" strokeOpacity="0.6" />

    {/* Handset Glyph in 3D Relief */}
    <path
      d="M24 20C24 18.9 24.9 18 26 18H29C29.6 18 30.1 18.4 30.2 19L31.2 23C31.3 23.5 31.1 24.1 30.7 24.4L29 25.7C30.2 28.5 32.5 30.8 35.3 32L36.6 30.3C36.9 29.9 37.5 29.7 38 29.8L42 30.8C42.6 30.9 43 31.4 43 32V35C43 36.1 42.1 37 41 37C29.4 37 20 27.6 20 16"
      transform="translate(1.5, 2)"
      fill="white"
    />

    {/* Radio Calling Waves */}
    <path d="M38 18C42 20 44 24 44 28" stroke="url(#phone-ring)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M42 14C48 18 50 24 50 30" stroke="url(#phone-ring)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
  </svg>
);

// 8. SMS - 3D Dual Overlapping Chat Pill Bubbles
export const Sms3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="sms-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="sms-indigo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
    </defs>
    {/* Shadows */}
    <ellipse cx="28" cy="54" rx="14" ry="3.5" fill="#0C4A6E" fillOpacity="0.25" />
    <ellipse cx="40" cy="53" rx="12" ry="3.5" fill="#312E81" fillOpacity="0.25" />

    {/* Back Cyan Message */}
    <path
      d="M16 14C23.7 14 30 20.3 30 28C30 31.2 28.9 34.2 27.1 36.6L29 43L22.6 41.3C20.6 41.8 18.3 42 16 42C8.3 42 2 35.7 2 28C2 20.3 8.3 14 16 14Z"
      transform="translate(8, 2)"
      fill="url(#sms-cyan-grad)"
    />

    {/* Front Indigo Message Bubble */}
    <path
      d="M40 22C47.7 22 54 28.3 54 36C54 43.7 47.7 50 40 50C37.8 50 35.7 49.5 33.7 48.6L28 51L29.6 45.4C27.3 43.1 26 39.7 26 36C26 28.3 32.3 22 40 22Z"
      fill="url(#sms-indigo-grad)"
    />

    {/* Front Dots */}
    <circle cx="35" cy="36" r="2.2" fill="white" />
    <circle cx="40" cy="36" r="2.2" fill="white" />
    <circle cx="45" cy="36" r="2.2" fill="white" />
  </svg>
);

// 9. Instagram - 3D Isometric Gradient Camera Lens Badge
export const Instagram3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="insta-3d-bg" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="35%" stopColor="#F43F5E" />
        <stop offset="70%" stopColor="#D946EF" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <radialGradient id="insta-lens" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="45%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#881337" />
      </radialGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="32" cy="56" rx="18" ry="4" fill="#881337" fillOpacity="0.25" />

    {/* 3D Curved Squircle Body */}
    <rect x="12" y="10" width="40" height="42" rx="14" fill="url(#insta-3d-bg)" />

    {/* Specular Rim */}
    <rect x="13" y="11" width="38" height="40" rx="13" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.5" />

    {/* Inner Rounded Frame */}
    <rect x="20" y="18" width="24" height="24" rx="7" stroke="white" strokeWidth="2.5" />

    {/* Center 3D Lens */}
    <circle cx="32" cy="30" r="6" stroke="white" strokeWidth="2.5" />
    <circle cx="32" cy="30" r="3" fill="url(#insta-lens)" />

    {/* Flash Dot */}
    <circle cx="39.5" cy="23.5" r="1.8" fill="white" />
  </svg>
);

// 10. Facebook - 3D Isometric Social Cube with Beveled 'f'
export const Facebook3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="fb-3d-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="40%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="32" cy="56" rx="18" ry="4" fill="#1E3A8A" fillOpacity="0.25" />

    {/* 3D Rounded Cube */}
    <rect x="12" y="10" width="40" height="42" rx="12" fill="url(#fb-3d-grad)" />

    {/* Specular Top-Left Bevel */}
    <rect x="13" y="11" width="38" height="40" rx="11" stroke="#BFDBFE" strokeWidth="1.5" strokeOpacity="0.6" />

    {/* Embossed 'f' */}
    <path
      d="M37 26H33C31.9 26 31 26.9 31 28V32H36.5L35.7 37H31V52H25V37H21V32H25V27C25 22.6 28.6 19 33 19H37V26Z"
      fill="white"
    />
  </svg>
);

// 11. YouTube - 3D Dimensional Cinema Screen with Glowing Play Wedge
export const Youtube3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="yt-3d-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF4D4D" />
        <stop offset="45%" stopColor="#E11D48" />
        <stop offset="100%" stopColor="#9F1239" />
      </linearGradient>
      <linearGradient id="yt-play-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FFE4E6" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="32" cy="55" rx="19" ry="4.5" fill="#881337" fillOpacity="0.25" />

    {/* 3D Rounded Television / Screen Body */}
    <rect x="10" y="15" width="44" height="34" rx="11" fill="url(#yt-3d-body)" />

    {/* Specular Bevel */}
    <rect x="11" y="16" width="42" height="32" rx="10" stroke="#FECDD3" strokeWidth="1.5" strokeOpacity="0.6" />

    {/* Center 3D Play Triangle */}
    <polygon points="27,24 27,40 41,32" fill="url(#yt-play-grad)" />
    <polygon points="27,24 27,40 33,32" fill="#F43F5E" fillOpacity="0.2" />
  </svg>
);

// 12. Google Maps - 3D Isometric Map Tile with Glowing Red Pin Drop
export const Maps3DIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="maps-tile-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E0F2FE" />
        <stop offset="100%" stopColor="#BAE6FD" />
      </linearGradient>
      <radialGradient id="maps-pin-grad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="50%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#991B1B" />
      </radialGradient>
    </defs>
    {/* Base Isometric Map Floor */}
    <polygon points="32,44 54,34 32,24 10,34" fill="url(#maps-tile-top)" stroke="#7DD3FC" strokeWidth="1" />
    <polygon points="10,34 32,44 32,50 10,40" fill="#0284C7" />
    <polygon points="54,34 32,44 32,50 54,40" fill="#0369A1" />

    {/* Tile Roads */}
    <path d="M18 30L44 38" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 40L40 28" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />

    {/* Pin Shadow on Map */}
    <ellipse cx="32" cy="40" rx="4.5" ry="2" fill="#0C4A6E" fillOpacity="0.4" />

    {/* 3D Pin Drop Marker */}
    <path
      d="M32 10C26.5 10 22 14.5 22 20C22 27.5 32 37 32 37C32 37 42 27.5 42 20C42 14.5 37.5 10 32 10ZM32 23.5C29.8 23.5 28 21.7 28 19.5C28 17.3 29.8 15.5 32 15.5C34.2 15.5 36 17.3 36 19.5C36 21.7 34.2 23.5 32 23.5Z"
      fill="url(#maps-pin-grad)"
    />

    {/* Specular White Dot on Pin */}
    <circle cx="30" cy="15" r="1.8" fill="white" fillOpacity="0.8" />
  </svg>
);

// Map of all 12 Category Icons
export const CATEGORY_3D_ICONS: Record<QRType, React.FC<{ size?: number; className?: string }>> = {
  url: Url3DIcon,
  wifi: Wifi3DIcon,
  whatsapp: Whatsapp3DIcon,
  vcard: VCard3DIcon,
  text: Text3DIcon,
  email: Email3DIcon,
  phone: Phone3DIcon,
  sms: Sms3DIcon,
  instagram: Instagram3DIcon,
  facebook: Facebook3DIcon,
  youtube: Youtube3DIcon,
  maps: Maps3DIcon
};

// Unified Icon Component with optional hover interaction
export const Category3DIcon: React.FC<Category3DIconProps> = ({
  type,
  size = 48,
  className = '',
  animateHover = true
}) => {
  const IconComponent = CATEGORY_3D_ICONS[type] || Url3DIcon;

  return (
    <div 
      className={`inline-flex items-center justify-center shrink-0 ${
        animateHover ? 'transition-transform duration-200 hover:scale-110 active:scale-95' : ''
      } ${className}`}
    >
      <IconComponent size={size} />
    </div>
  );
};
