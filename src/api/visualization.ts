import axios from 'axios';
import type { GeneralChart } from '@/types/global';

export interface AnalysisOverview {
  users: number;
  visits: number;
  payments: number;
  conversion: number;
}

export function queryAnalysisOverview() {
  return axios.get<AnalysisOverview>('/api/visualization/overview');
}

export function queryVisitTrend() {
  return axios.get<GeneralChart>('/api/visualization/visit-trend');
}

export function queryChannelPie() {
  return axios.get<{ name: string; value: number }[]>(
    '/api/visualization/channel'
  );
}
