export interface LabMember {
  name: string;
  role: string;
  note: string;
}

/**
 * 成员名单：新增成员时在这里复制一项并修改内容即可。
 */
export const labMembers: LabMember[] = [
  {
    name: '高群',
    role: '迅雷实验室 / 迅雷队指导老师',
    note: '长期负责智能车队伍训练与赛事组织，多篇竞赛成果报道作者。',
  },
];
