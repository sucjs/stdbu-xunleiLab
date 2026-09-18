export interface NavLink {
  href: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  paragraph: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  utilityLabel: string;
}

export interface MissionCardProps {
  description: string;
  href: string;
  icon: 'satellite' | 'rocket' | 'star';
  status: string;
  statusTone: 'green' | 'blue' | 'gold';
  title: string;
}

export interface SpectrumBarProps {
  value: number;
}

export interface LaunchRowProps {
  date: string;
  detail: string;
  href: string;
  time: string;
  title: string;
}

export interface DiscoveryContent {
  archiveHref: string;
  archiveLabel: string;
  body: string;
  cta: NavLink;
  image: string;
  label: string;
  rangeEnd: string;
  rangeStart: string;
  title: string;
}

export interface NextDepartureContent {
  allHref: string;
  image: string;
  label: string;
  title: string;
}

export interface FooterMeta {
  description: string;
  title: string;
}

export const siteSettings = {
  recruitmentGroupLabel: '加入纳新群',
  recruitmentGroupUrl: 'https://qm.qq.com/q/fxcBD1NNeg',
};

export const siteNav: NavLink[] = [
  { label: '研究方向', href: '/missions/' },
  { label: '竞赛成果', href: '/reports/' },
  { label: '技术专题', href: '/notes/' },
  { label: '实验室动态', href: '/news/' },
  { label: '加入我们', href: '/departures/' },
  { label: '设备与技术', href: '/technology/' },
  { label: '培养体系', href: '/science/' },
  { label: '关于迅雷', href: '/about/' },
];

export const heroLeftNav: NavLink[] = [
  { label: '研究方向', href: '/missions/' },
  { label: '竞赛成果', href: '/reports/' },
  { label: '技术专题', href: '/notes/' },
];

export const heroRightNav: NavLink[] = [
  { label: '实验室动态', href: '/news/' },
  { label: '培养体系', href: '/science/' },
  { label: '关于迅雷', href: '/about/' },
];

export const mobileNav: NavLink[] = [...heroLeftNav, ...heroRightNav];

export const heroContent: HeroContent = {
  eyebrow: '把想法，做成会跑的工程。',
  title: '迅雷实验室',
  paragraph:
    '山东工商学院信息与电子工程学院的科创实践平台，位于西校区实验楼 5401。名字来自学校最早的智能车参赛队伍"迅雷队"——我们从 C 语言、单片机和电路基础出发，把原理图、代码与机械结构，反复打磨成能在赛道上稳定运行的作品。',
  primaryCta: {
    href: '/missions/',
    label: '查看研究方向',
  },
  secondaryCta: {
    href: '/about/',
    label: '了解实验室',
  },
  utilityLabel: 'SDTBU —— ThunderLab',
};

export const footerMeta: FooterMeta = {
  title: '迅雷实验室',
  description:
    '山东工商学院信息与电子工程学院学生科创开放实验室。以智能车竞赛、电子设计竞赛和机器人项目为主线，训练嵌入式开发、电路设计、控制算法与结构研发能力。',
};

export const footerDirectory: NavLink[] = [...siteNav];

export const footerPolicies: string[] = ['公开课报名', '招新说明', '信电学院官网'];
