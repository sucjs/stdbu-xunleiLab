import { MotionConfig, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

import type { MissionCardProps } from '../data/site';
import { aeonEase, fadeUpTransition, inViewViewport } from './motion';

interface MissionsSectionProps {
  missions: MissionCardProps[];
}

function AreaRow({ description, href, status, title, index }: MissionCardProps & { index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 'some', margin: '0px 0px -8% 0px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: aeonEase }}
      className="group grid gap-4 border-b border-lab-line py-8 transition-colors duration-300 md:grid-cols-[minmax(0,1fr)_170px_28px] md:items-baseline md:gap-8"
    >
      <div>
        <h3 className="font-display text-[1.75rem] leading-tight tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-lab-accent sm:text-[2.1rem]">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-[1rem] leading-7 text-white/60">{description}</p>
      </div>
      <span className="font-mono text-[10px] tracking-[0.08em] text-white/45">{status}</span>
      <a
        href={href}
        aria-label={`查看${title}详情`}
        className="text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-lab-accent"
      >
        <ArrowUpRight size={20} strokeWidth={1.4} />
      </a>
    </motion.article>
  );
}

export default function MissionsSection({ missions }: MissionsSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="areas" className="lab-ground lab-ground-raised">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
            className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end"
          >
            <div>
              <p className="lab-pad">研究方向</p>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.95] tracking-[-0.05em] text-lab-ink">
                把知识，变成能被验证的工程。
              </h2>
            </div>
            <p className="max-w-xl text-[1.05rem] leading-8 text-lab-ink/60 md:justify-self-end">
              以智能车竞赛、电子设计竞赛为主线，从基础训练进入真实项目。每位成员都要经历设计、焊接、调试和赛场反馈的完整闭环。
            </p>
          </motion.div>

          <div className="mt-14 border-t border-lab-line">
            {missions.map((mission, index) => (
              <AreaRow key={mission.title} index={index} {...mission} />
            ))}
          </div>

          <a
            href="/missions/"
            className="mt-10 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.1em] text-lab-ink/60 transition-colors duration-300 hover:text-lab-accent"
          >
            查看全部研究方向 <ArrowUpRight size={15} />
          </a>
        </div>
      </section>
    </MotionConfig>
  );
}
