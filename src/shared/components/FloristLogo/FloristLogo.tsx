import React from 'react'

interface FloristLogoProps {
  size?: number
  className?: string
}

export const FloristLogo = ({ size = 32, className }: FloristLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="100%" stopColor="#fce7f3" />
        </linearGradient>
        <linearGradient id="logoPetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
        <linearGradient id="logoCore" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#fda4af" />
        </linearGradient>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="logoLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Background circle badge */}
      <circle cx="50" cy="50" r="46" fill="url(#logoBg)" stroke="#fbcfe8" strokeWidth="2.5" />

      {/* Emerald leaves */}
      <path
        d="M50 68 C40 82 25 76 28 64 C35 60 45 62 50 68 Z"
        fill="url(#logoLeaf)"
        opacity="0.9"
      />
      <path
        d="M50 68 C60 82 75 76 72 64 C65 60 55 62 50 68 Z"
        fill="url(#logoLeaf)"
        opacity="0.9"
      />

      {/* Petals */}
      <g>
        <path d="M50 20 C42 32 45 46 50 50 C55 46 58 32 50 20 Z" fill="url(#logoPetal)" />
        <path
          d="M68 28 C56 36 52 48 50 50 C56 52 68 44 68 28 Z"
          fill="url(#logoPetal)"
          opacity="0.95"
        />
        <path
          d="M78 48 C66 48 56 52 50 50 C54 58 68 62 78 48 Z"
          fill="url(#logoPetal)"
          opacity="0.9"
        />
        <path
          d="M66 70 C58 60 52 54 50 50 C48 58 56 68 66 70 Z"
          fill="url(#logoPetal)"
          opacity="0.85"
        />
        <path
          d="M34 70 C42 60 48 54 50 50 C52 58 44 68 34 70 Z"
          fill="url(#logoPetal)"
          opacity="0.85"
        />
        <path
          d="M22 48 C34 48 44 52 50 50 C46 58 32 62 22 48 Z"
          fill="url(#logoPetal)"
          opacity="0.9"
        />
        <path
          d="M32 28 C44 36 48 48 50 50 C44 52 32 44 32 28 Z"
          fill="url(#logoPetal)"
          opacity="0.95"
        />
      </g>

      {/* Center Rose Core */}
      <circle cx="50" cy="50" r="14" fill="url(#logoCore)" />
      <path
        d="M44 48 C46 42 54 42 56 48 C56 54 48 56 46 52"
        fill="none"
        stroke="#be123c"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M47 53 C49 56 53 56 54 53"
        fill="none"
        stroke="#be123c"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Glimmer accents */}
      <circle cx="50" cy="49" r="3.5" fill="url(#logoGold)" />
      <circle cx="46" cy="45" r="1.5" fill="#fef08a" />
      <circle cx="54" cy="45" r="1.5" fill="#fef08a" />
    </svg>
  )
}
