import { MotionConfig, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

import type { LaunchRowProps, NextDepartureContent } from '../data/site';
import { aeonEase, fadeUpTransition, inViewViewport } from './motion';

interface DepartureSectionProps {
  content: NextDepartureContent;
  launches: LaunchRowProps[];
}

function IntakeStep({ date, detail, href, index, time, title }: LaunchRowProps & { index: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 'some', margin: '0px 0px -8% 0px' });

  return (
    <motion.a
      ref={ref}
      href={href}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: aeonEase }}
      className="group grid gap-3 border-b border-lab-line py-6 transition-colors duration-300 md:grid-cols-[110px_minmax(0,1fr)_28px] md:items-baseline md:gap-8"
    >
      <span className="font-mono text-[10px] tracking-[0.08em] text-lab-accent">{date}</span>
      <div>
        <h3 className="font-display text-[1.4rem] leading-tight tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-lab-accent sm:text-[1.6rem]">
          {title}
        </h3>
        <p className="mt-2 max-w-2xl text-[0.98rem] leading-7 text-white/58">{detail}</p>
        <span className="mt-2 inline-block font-mono text-[10px] tracking-[0.08em] text-white/40">{time}</span>
      </div>
      <span aria-hidden="true" className="font-mono text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-lab-accent">
        <ArrowUpRight size={19} strokeWidth={1.4} />
      </span>
    </motion.a>
  );
}

export default function DepartureSection({ content, launches }: DepartureSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="join" className="lab-ground lab-ground-raised">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(300px,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-20 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
          >
            <p className="lab-pad">{content.label}</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.95] tracking-[-0.05em] text-white">
              {content.title}
            </h2>
            <p className="mt-6 max-w-lg text-[1.05rem] leading-8 text-white/62">
              公开课、笔试、面试、阶段培训，一共四步。我们想看的是你愿不愿意把一件事做完，而不是你现在会多少。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
            className="border-t border-lab-line"
          >
            {launches.map((launch, index) => (
              <IntakeStep key={`${launch.date}-${launch.title}`} index={index} {...launch} />
            ))}
            <a
              href={content.allHref}
              className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.1em] text-white/58 transition-colors duration-300 hover:text-lab-accent"
            >
              查看完整招新流程 <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
