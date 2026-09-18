import { MotionConfig, motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import type { FooterMeta, NavLink } from '../data/site';
import BrandLogo from './BrandLogo';
import { aeonEase } from './motion';

interface FooterSectionProps {
  directory: NavLink[];
  meta: FooterMeta;
  policies: string[];
}

export default function FooterSection({ directory, meta, policies }: FooterSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.footer
        ref={ref}
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.7, ease: aeonEase }}
        className="lab-footer py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)_minmax(0,0.85fr)]">
            <div>
              <BrandLogo className="w-[210px] sm:w-[240px]" />
              <p className="mt-7 max-w-md text-[1.02rem] leading-8 text-white/55">{meta.description}</p>
            </div>

            <nav aria-label="页脚导航">
              <h3 className="font-mono text-[10px] tracking-[0.1em] text-white/40">站内导航</h3>
              <ul className="mt-5 grid gap-3 text-[0.98rem] text-white/66 sm:grid-cols-2">
                {directory.map((item) => (
                  <li key={item.label}>
                    <a className="transition-colors duration-300 hover:text-lab-accent" href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="font-mono text-[10px] tracking-[0.1em] text-white/40">实验室地址</h3>
              <address className="mt-5 space-y-2 text-[0.98rem] not-italic leading-7 text-white/62">
                <p className="text-white/82">西校区实验楼 5401</p>
                <p>山东工商学院信息与电子工程学院</p>
                <p>山东省烟台市莱山区滨海中路 191 号</p>
              </address>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[10px] tracking-[0.1em] text-white/32 md:flex-row md:items-center md:justify-between">
            <p>© 2026 迅雷实验室 · 山东工商学院信息与电子工程学院</p>
            <div className="flex flex-wrap gap-5">
              {policies.map((policy) => <span key={policy}>{policy}</span>)}
            </div>
          </div>
        </div>
      </motion.footer>
    </MotionConfig>
  );
}
