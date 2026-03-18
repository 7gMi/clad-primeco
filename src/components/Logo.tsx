interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src="/images/logo/logo-cladprimeco.webp"
      alt="CladPrime&Co logo"
      className={className}
      width="200"
      height="194"
      decoding="async"
    />
  );
}
