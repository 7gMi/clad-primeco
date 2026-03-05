interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 130"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(56, 0)">

        {/* ====== BATIMENT 2 (petit, a gauche) - 2x plus petit ====== */}
        <g transform="translate(0, 40)">
          {/* Gris incline 45deg - largeur 6 (plus fin que bleu) */}
          <path d="M 22,0 L 22,20 L 16,26 L 16,6 Z" fill="#8C9DAB" />
          {/* Bleu vertical - largeur 12 (plus large que gris) */}
          <rect x="22" y="0" width="12" height="40" fill="#1B3564" />
        </g>

        {/* ====== BATIMENT 1 (grand, a droite) ====== */}
        {/* Gris incline 45deg - largeur 12 (plus fin que bleu) */}
        <path d="M 48,0 L 48,40 L 36,52 L 36,12 Z" fill="#8C9DAB" />
        {/* Bleu vertical - largeur 24 (plus large que gris) */}
        <rect x="48" y="0" width="24" height="80" fill="#1B3564" />

      </g>

      {/* Texte CladPrime&Co */}
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        fontSize="18"
        fontWeight="600"
        fill="#2C3E50"
        letterSpacing="0.3"
      >
        CladPrime&amp;Co
      </text>
    </svg>
  );
}
