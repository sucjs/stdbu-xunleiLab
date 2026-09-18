import { MotionConfig, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

import type { DiscoveryContent, SpectrumBarProps } from '../data/site';
import { aeonEase, fadeUpTransition, inViewViewport } from './motion';

interface DiscoverySectionProps {
  bars: SpectrumBarProps[];
  content: DiscoveryContent;
}

/**
 * 频谱柱：这是真实的实验数据形态，所以保留图表本身，
 * 但去掉玻璃卡片和渐变，让数据直接站在地面上。
 */
function SpectrumBar({ index, value }: SpectrumBarProps & { index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 'some', margin: '0px 0px -8% 0px' });

  return (
    <div ref={ref} className="flex h-full items-end">
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.5, delay: index * 0.035, ease: aeonEase }}
        className="w-full origin-bottom bg-lab-accent/70"
        style={{ height: `${value}%` }}
      />
    </div>
  );
}

function renderTitleLines(title: string) {
  return title.split('/').map((part) => part.trim()).filter(Boolean);
}

export default function DiscoverySection({ bars, content }: DiscoverySectionProps) {
  const titleLines = renderTitleLines(content.title);

  return (
    <MotionConfig reducedMotion="user">
      <section id="evidence" className="lab-ground lab-ground-raised">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] lg:items-start lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewViewport}
              transition={fadeUpTransition}
            >
              <p className="lab-pad">{content.label}</p>
              <h2 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,5.6rem)] leading-[0.93] tracking-[-0.055em] text-lab-ink">
                {titleLines.map((line) => (
                  <span className="block" key={line}>{line}</span>
                ))}
              </h2>
              <p className="mt-7 max-w-2xl text-[1.05rem] leading-8 text-lab-ink/62 sm:text-[1.1rem] sm:leading-9">
                {content.body}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href={content.cta.href}
                  className="inline-flex min-h-12 items-center gap-3 bg-lab-ink px-7 font-mono text-[11px] tracking-[0.1em] text-[#e6e8de] transition-colors duration-300 hover:bg-lab-accent hover:text-[#0c100f]"
                >
                  {content.cta.label} <ArrowUpRight size={15} />
                </a>
                <a
                  href={content.archiveHref}
                  className="font-mono text-[11px] tracking-[0.1em] text-lab-ink/55 underline decoration-lab-ink/25 underline-offset-4 transition-colors duration-300 hover:text-lab-accent"
                >
                  {content.archiveLabel}
                </a>
              </div>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewViewport}
              transition={fadeUpTransition}
              className="border-t border-lab-line pt-5"
            >
              <figcaption className="flex items-baseline justify-between font-mono text-[10px] tracking-[0.08em]">
                <span className="text-lab-ink/45">奖级构成示意</span>
                <span className="text-lab-ink/40">示意图，非逐届实测</span>
              </figcaption>
              <div className="mt-6 grid h-44 grid-cols-12 items-end gap-1.5 sm:h-56 sm:gap-2" role="img" aria-label="竞赛奖级构成示意图">
                {bars.map((bar, index) => (
                  <SpectrumBar key={`${bar.value}-${index}`} index={index} value={bar.value} />
                ))}
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-lab-line pt-3 font-mono text-[10px] tracking-[0.08em] text-lab-ink/45">
                <span>{content.rangeStart}</span>
                <span>{content.rangeEnd}</span>
              </div>
            </motion.figure>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
