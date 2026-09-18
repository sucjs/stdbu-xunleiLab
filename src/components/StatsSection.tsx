import { MotionConfig, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import type { StatBlockProps } from '../data/site';
import { aeonEase } from './motion';

interface StatsSectionProps {
  stats: StatBlockProps[];
}

function parseStatValue(value: string) {
  const normalizedValue = value.replace(/,/g, '');
  const match = normalizedValue.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { decimals: 0, suffix: '', target: 0, useGrouping: false };
  return {
    decimals: match[1].includes('.') ? match[1].split('.')[1].length : 0,
    suffix: match[2],
    target: Number(match[1]),
    useGrouping: value.includes(','),
  };
}

function formatStatValue(value: number, originalValue: string) {
  const { decimals, suffix, useGrouping } = parseStatValue(originalValue);
  const numericValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('zh-CN', { useGrouping });
  return `${numericValue}${suffix}`;
}

function StatBlock({ index, label, value }: StatBlockProps & { index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [displayValue, setDisplayValue] = useState(() => formatStatValue(0, value));

  useEffect(() => {
    if (!isInView) return;
    const { target } = parseStatValue(value);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }
    let frameId = 0;
    const start = performance.now();
    const animateValue = (time: number) => {
      const progress = Math.min((time - start) / 1100, 1);
      setDisplayValue(formatStatValue(target * (1 - Math.pow(1 - progress, 3)), value));
      if (progress < 1) frameId = window.requestAnimationFrame(animateValue);
      else setDisplayValue(value);
    };
    frameId = window.requestAnimationFrame(animateValue);
    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: aeonEase }}
      className={index > 0 ? 'border-t border-lab-line pt-6 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0' : ''}
    >
      <div className="font-display text-[clamp(2.6rem,4.5vw,4.4rem)] leading-none tracking-[-0.05em] text-white">
        {displayValue}
      </div>
      <div className="mt-4 font-mono text-[10px] tracking-[0.1em] text-white/50">{label}</div>
    </motion.div>
  );
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="record" className="lab-ground">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4 border-b border-lab-line pb-5">
            <p className="lab-pad">一直在记录</p>
            <span className="font-mono text-[10px] tracking-[0.1em] text-white/38">截至 2026 年</span>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {stats.map((stat, index) => (
              <StatBlock key={stat.label} index={index} {...stat} />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
