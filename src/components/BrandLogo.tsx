type BrandLogoKind = 'symbol' | 'wordmark';
type BrandLogoTone = 'dark' | 'light' | 'theme';

interface BrandLogoProps {
  className?: string;
  kind?: BrandLogoKind;
  label?: string;
  tone?: BrandLogoTone;
}

export default function BrandLogo({
  className = '',
  kind = 'wordmark',
  label = '迅雷实验室 / THUNDER LAB',
  tone = 'theme',
}: BrandLogoProps) {
  return (
    <span aria-label={label} className={`lab-brand lab-brand-tone-${tone} ${kind === 'symbol' ? 'lab-brand-symbol-only' : ''} ${className}`.trim()} role="img">
      <span className="lab-brand-mark" aria-hidden="true">
        <img src="/favicon.ico" alt="" />
      </span>
      {kind === 'wordmark' ? (
        <span className="lab-brand-copy">
          <strong>迅雷实验室</strong>
          <small>THUNDER LAB / SDTBU</small>
        </span>
      ) : null}
    </span>
  );
}
