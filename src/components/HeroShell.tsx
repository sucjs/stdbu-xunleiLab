import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import type { HeroContent, NavLink } from '../data/site';
import BrandLogo from './BrandLogo';
import ThemeToggle from './ThemeToggle';
import { aeonEase } from './motion';

interface HeroShellProps {
  content: HeroContent;
  leftNav: NavLink[];
  mobileNav: NavLink[];
  rightNav: NavLink[];
}

/**
 * 探针光斑：把指针位置写成 CSS 变量，标题的铜色层由圆形遮罩揭开。
 * 用 rAF 合并指针事件，避免频繁写样式。
 * 无指针设备 / 减少动效时直接不启用，由 CSS 兜底显示完整亮度。
 */
function useProbeLayer<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      node.style.setProperty('--probe-x', `${pending.x}px`);
      node.style.setProperty('--probe-y', `${pending.y}px`);
      pending = null;
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      pending = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      node.classList.remove('probe-idle');
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const onLeave = () => node.classList.add('probe-idle');

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

export default function HeroShell({
  content,
  leftNav,
  mobileNav,
  rightNav,
}: HeroShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const probeRef = useProbeLayer<HTMLDivElement>();

  return (
    <MotionConfig reducedMotion="user">
      <section className="lab-hero relative min-h-[100svh] overflow-hidden">
        <img
          src="/images/lab-hero.svg"
          alt=""
          aria-hidden="true"
          className="lab-hero-image absolute inset-0 h-full w-full object-cover"
        />
        <div className="lab-hero-scrim absolute inset-0" />
        <div className="lab-hero-grid absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 flex min-h-[100svh] flex-col px-5 py-5 sm:px-8 lg:px-12">
          <header className="hero-rise flex items-center justify-between border-b border-white/15 pb-5" style={{ animationDelay: '40ms' }}>
            <a href="/" className="inline-flex min-h-11 items-center transition-opacity duration-300 hover:opacity-75">
              <BrandLogo tone="light" className="w-[190px] sm:w-[220px]" />
            </a>
            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[10px] tracking-[0.14em] text-white/50 lg:inline">
                {content.utilityLabel}
              </span>
              <ThemeToggle variant="hero" />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors duration-300 hover:border-lab-accent hover:text-lab-accent lg:hidden"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                {isMenuOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
              </button>
            </div>
          </header>

          <nav className="hero-rise hidden items-center justify-between py-5 lg:flex" style={{ animationDelay: '120ms' }} aria-label="主导航">
              <ul className="flex items-center gap-7 font-mono text-[12px] tracking-[0.06em] text-white/60 xl:gap-10">
              {leftNav.map((item) => (
                <li key={item.label}>
                  <a className="transition-colors duration-300 hover:text-lab-accent" href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
              <ul className="flex items-center gap-7 font-mono text-[12px] tracking-[0.06em] text-white/60 xl:gap-10">
              {rightNav.map((item) => (
                <li key={item.label}>
                  <a className="transition-colors duration-300 hover:text-lab-accent" href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <AnimatePresence>
            {isMenuOpen ? (
              <motion.nav
                id="mobile-navigation"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: aeonEase }}
                className="absolute inset-x-5 top-[5.75rem] z-30 border border-white/15 bg-lab-panel/96 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:inset-x-8 lg:hidden"
              >
                <ul className="grid gap-4 font-mono text-[13px] tracking-[0.06em] text-white/72">
                  {mobileNav.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="block border-b border-white/10 pb-3 transition-colors duration-300 hover:text-lab-accent"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ) : null}
          </AnimatePresence>

          <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.5fr)] lg:gap-20 lg:py-20">
            <div className="max-w-4xl">
              <p className="hero-rise font-mono text-[10px] tracking-[0.16em] text-lab-accent sm:text-xs" style={{ animationDelay: '200ms' }}>
                {content.eyebrow}
              </p>

              {/* 鼠标划过时，被"探针"点亮的那一行 */}
              <div
                ref={probeRef}
                className="probe-stack probe-idle hero-rise mt-6"
                style={{ animationDelay: '280ms' }}
              >
                <h1 className="font-display text-[clamp(3.2rem,8.5vw,9rem)] leading-[0.9] tracking-[-0.06em]">
                  <span className="probe-layer probe-dim">{content.title}</span>
                  <span className="probe-layer probe-lit" aria-hidden="true">{content.title}</span>
                </h1>
              </div>

              <p
                className="hero-rise mt-8 max-w-2xl text-[1.05rem] leading-8 text-white/68 sm:text-[1.14rem] sm:leading-9"
                style={{ animationDelay: '400ms' }}
              >
                {content.paragraph}
              </p>

              <div className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '500ms' }}>
                <a
                  href={content.primaryCta.href}
                  className="hero-cta inline-flex min-h-12 items-center justify-center px-7 font-mono text-[11px] tracking-[0.1em]"
                >
                  {content.primaryCta.label}
                </a>
                <a
                  href={content.secondaryCta.href}
                  className="inline-flex min-h-12 items-center justify-center border border-white/25 px-7 font-mono text-[11px] tracking-[0.1em] text-white transition-colors duration-300 hover:border-lab-accent hover:text-lab-accent"
                >
                  {content.secondaryCta.label}
                </a>
              </div>
            </div>

            <aside className="hero-rise hidden justify-self-end lg:block lg:w-full" style={{ animationDelay: '580ms' }}>
              <div className="lab-waveform h-16" aria-hidden="true" />
              <dl className="mt-7 grid gap-4 font-mono text-[11px]">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/12 pb-3">
                  <dt className="text-white/40">实验室</dt>
                  <dd className="text-white/86">西校区 5401</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-white/12 pb-3">
                  <dt className="text-white/40">归属</dt>
                  <dd className="text-white/86">信电学院</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-white/40">起于</dt>
                  <dd className="text-white/86">2010</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="hero-rise flex items-end justify-between border-t border-white/15 pt-5 font-mono text-[10px] tracking-[0.14em] text-white/40" style={{ animationDelay: '660ms' }}>
            <span>迅雷实验室</span>
            <a href="#areas" className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-lab-accent">
              向下看 <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
