export interface TimelineItem {
  year: string;
  title: string;
  detail: string;
  verified: boolean;
}

export interface MentorItem {
  name: string;
  role: string;
  note: string;
}

export interface FacilityItem {
  label: string;
  value: string;
}

export interface SourceItem {
  label: string;
  href: string;
}

export const labTimeline: TimelineItem[] = [
  {
    year: '2010',
    title: '迅雷队首次参赛',
    detail: '山东工商学院最早的智能车参赛队伍之一，以"迅雷队"名义参加第五届"飞思卡尔"杯智能汽车竞赛。',
    verified: false,
  },
  {
    year: '2011',
    title: '山东赛区崭露头角',
    detail: '第六届竞赛中取得山东赛区第三名，队伍开始形成稳定的备赛节奏。',
    verified: false,
  },
  {
    year: '2014',
    title: '电磁组国家一等奖',
    detail: '第九届"飞思卡尔"杯，刘伟、高群老师指导的"迅雷队"以全国第 11 名获电磁组国家一等奖。',
    verified: true,
  },
  {
    year: '2020',
    title: '独立科创实验室成立',
    detail: '西校区实验楼建成、院系实验室搬迁后，独立科创实验室正式定名"迅雷实验室"，房间为西校区实验楼 5401。',
    verified: false,
  },
  {
    year: '2021',
    title: '单车拉力组全国二等奖',
    detail: '第十六届全国大学生智能车竞赛，"迅雷双轮"队以直立平衡单车设计获全国二等奖。',
    verified: true,
  },
  {
    year: '2025',
    title: '首次参加 RoboMaster',
    detail: '"疾风"团队首次组队参加机甲大师高校联盟赛（山东站）1V1 步兵机器人对抗赛，获季军。',
    verified: true,
  },
  {
    year: '2026',
    title: '国赛成绩历史性突破',
    detail: '第二十一届智能车竞赛，"迅雷卡丁一队"获卡丁快跑组全国一等奖，国赛 3 支队伍全部获奖。',
    verified: true,
  },
];

export const labMentors: MentorItem[] = [
  
  {
    name: '高群',
    role: '迅雷实验室 / 迅雷队指导老师',
    note: '长期负责智能车队伍训练与赛事组织，多篇竞赛成果报道作者。',
  },
  
 
];

export const labFacilities: FacilityItem[] = [
  { label: '实验室位置', value: '西校区实验楼 5401' },
  { label: '同层空间', value: '深蓝实验室（5409）、电子实验室（5404）' },
  { label: '加工设备', value: '3D 打印机、CNC 雕刻机' },
  { label: '焊接工具', value: '恒温焊台、热风枪、烙铁' },
  { label: '测试仪器', value: '示波器、直流电源、常用测量仪表' },
  { label: '开发平台', value: 'STM32 开发板、智能车车模、传感器模块' },
];

export const labSources: SourceItem[] = [
  {
    label: '山东工商学院：第二十一届智能汽车竞赛全国总决赛再创佳绩（2026-09-02）',
    href: 'https://www.sdtbu.edu.cn/info/1043/292751.htm',
  },
  {
    label: '信电学院：第二十一届智能汽车竞赛全国总决赛取得佳绩（2026-09-02）',
    href: 'https://xd.sdtbu.edu.cn/info/1126/6151.htm',
  },
  {
    label: '信电学院：第二十一届智能汽车竞赛山东赛区比赛获佳绩（2026-08-31）',
    href: 'https://xd.sdtbu.edu.cn/info/1126/6141.htm',
  },
  {
    label: '山东工商学院：学校团队获 RoboMaster（山东站）季军（2025-03-24）',
    href: 'https://www.sdtbu.edu.cn/info/1044/35433.htm',
  },
  {
    label: '信电学院：RoboMaster 机甲大师高校联盟赛（山东站）获季军（2025-03-26）',
    href: 'https://xd.sdtbu.edu.cn/info/1121/4274.htm',
  },
  {
    label: '山东工商学院：第九届"飞思卡尔"杯智能汽车竞赛国家一等奖（2014-09-01）',
    href: 'https://www.sdtbu.edu.cn/info/1043/6744.htm',
  },
  {
    label: '山东工商学院：第十六届智能车全国总决赛获 2 项全国二等奖（2021-08-27）',
    href: 'https://www.sdtbu.edu.cn/info/1044/33309.htm',
  },
  {
    label: '信电学院：2024 睿抗机器人开发者大赛（RAICOM）全国总决赛获佳绩（2024-08-30）',
    href: 'https://xd.sdtbu.edu.cn/info/1121/3936.htm',
  },
  {
    label: '信电学院：第十五届智能汽车校内赛暨省赛选拔赛（2026-05-26）',
    href: 'https://xd.sdtbu.edu.cn/info/1121/5720.htm',
  },
  {
    label: '信电学院：第十六届大学生电子设计竞赛圆满落幕（2026-06-18）',
    href: 'https://xd.sdtbu.edu.cn/info/1126/5823.htm',
  },
  {
    label: '立创开源硬件平台：迅雷实验室 2025 纳新进行时（2025-10-11）',
    href: 'https://oshwhub.com/article/thunder-lab-thunderbolt-laboratory-2025-new-enduring',
  },
  {
    label: '立创开源硬件平台：迅雷实验室 2024 级新生纳新反馈（2024-09-13）',
    href: 'https://oshwhub.com/article/feedback-on-freshmen-of-grade-2024-in-xunlei-laboratory',
  },
  {
    label: '信息与电子工程学院官网',
    href: 'https://xd.sdtbu.edu.cn/',
  },
];
