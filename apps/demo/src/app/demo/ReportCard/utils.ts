import { KeysConfig } from '@dilta/commonwebui/src/dynamic-datagrid';

export interface Card {
  id?: string;
  name: string;
  fa: number;
  sa: number;
  exam: number;
  class: string;
  subject: string;
}

export function remark(score: number) {
  console.log(score);
  if (score < 39) { return 'Fail' }
  if (score < 45) { return 'Pass' }
  if (score > 46 && score < 65) { return 'Good' }
  if (score < 69) { return 'Very Good' }
  if (score > 70) { return 'Excellent' }
}

const caSR = {  min: 0, max: 15 };
const examSR = {  min: 0, max: 70 };
const totalSR = {  min: 0, max: 100 };

const numberKg =  { editable: true, default: 0,  type: 'number'};

const fa = { key: 'fa', ...numberKg, title: 'First C.A', config: { ...caSR} };
const sa = { key: 'sa', ...numberKg, title: 'Second C.A', config: { ...caSR} };
const exam = { key: 'exam', title: 'Exam', ...numberKg, config: { ...examSR} };
const total = { key: 'total', ...numberKg, title: 'Total', config: { ...totalSR } };
const remarks = { key: 'total', editable: false, default: 0,
  title: 'Remark', type: 'number', config: {
    ...totalSR, map: remark } };

export const classKeyConfig: KeysConfig[] = [
  { key: 'name', editable: true, default: '',
  title: 'Student Name', type: 'string' },
  {...fa },
  {...sa },
  {...exam },
  {...total },
  {...remarks },
];
export const studentKeyConfig: KeysConfig[] = [
  { key: 'subject', editable: true, default: '',
  title: 'subject', type: 'string' },
  {...fa },
  {...sa },
  {...exam },
  { key: 'total', ...numberKg, title: 'Total', config: { ...totalSR } },
  { key: 'remark', editable: false, default: 0, title: 'Remark', type: 'string' }
];


export const subjectList: string[] = ['English', 'Mathematics', 'Social studies',
    'Agric Science', 'Basic Science'];
export const classList: string[] = ['pry 1', 'pry 2', 'nusery 1'];

export const format = ['Group', 'Single'];
