<template>
  <div class="container">
    <Breadcrumb :items="['功能示例', '分析页']" />
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card class="general-card stat-card">
          <a-statistic
            title="用户数"
            :value="overview.users"
            :value-from="0"
            animation
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="general-card stat-card">
          <a-statistic
            title="访问量"
            :value="overview.visits"
            :value-from="0"
            animation
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="general-card stat-card">
          <a-statistic
            title="支付订单数"
            :value="overview.payments"
            :value-from="0"
            animation
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="general-card stat-card">
          <a-statistic
            title="转化率"
            :value="overview.conversion"
            :precision="2"
            :value-from="0"
            animation
          >
            <template #suffix>%</template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
    <a-card class="general-card" title="访问趋势" style="margin-top: 16px">
      <Chart height="360px" :option="chartOption" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import {
    queryAnalysisOverview,
    queryVisitTrend,
    type AnalysisOverview,
  } from '@/api/visualization';
  import useChartOption from '@/hooks/chart-option';
  import type { GeneralChart } from '@/types/global';

  const overview = reactive<AnalysisOverview>({
    users: 0,
    visits: 0,
    payments: 0,
    conversion: 0,
  });

  const xAxis = ref<string[]>([]);
  const chartData = ref<number[]>([]);

  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxis.value,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '访问量',
          type: 'line',
          smooth: true,
          symbolSize: 8,
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            opacity: 0.15,
          },
          data: chartData.value,
        },
      ],
    };
  });

  const fetchData = async () => {
    try {
      const [overviewRes, trendRes] = await Promise.all([
        queryAnalysisOverview(),
        queryVisitTrend(),
      ]);
      Object.assign(overview, overviewRes.data);
      const trend = trendRes.data as GeneralChart;
      xAxis.value = trend.xAxis;
      chartData.value = trend.data[0]?.value ?? [];
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'Analysis',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .stat-card {
    :deep(.arco-statistic-title) {
      font-size: 13px;
      color: var(--color-text-3);
    }
    :deep(.arco-statistic-value) {
      font-size: 24px;
      font-weight: 500;
    }
  }
</style>
