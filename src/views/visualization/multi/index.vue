<template>
  <div class="container">
    <Breadcrumb :items="['功能示例', '多维图表']" />
    <a-row :gutter="16">
      <a-col :span="10">
        <a-card class="general-card" title="流量来源">
          <Chart height="320px" :option="pieOption" />
        </a-card>
      </a-col>
      <a-col :span="7">
        <a-card class="general-card" title="目标完成率">
          <Chart height="320px" :option="gaugeOption" />
        </a-card>
      </a-col>
      <a-col :span="7">
        <a-card class="general-card" title="转化漏斗">
          <Chart height="320px" :option="funnelOption" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { queryChannelPie } from '@/api/visualization';
  import useChartOption from '@/hooks/chart-option';

  const channelData = ref<{ name: string; value: number }[]>([]);

  const { chartOption: pieOption } = useChartOption(() => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        bottom: 0,
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '65%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 6,
            borderColor: 'transparent',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          data: channelData.value,
        },
      ],
    };
  });

  const { chartOption: gaugeOption } = useChartOption(() => {
    return {
      series: [
        {
          type: 'gauge',
          startAngle: 210,
          endAngle: -30,
          min: 0,
          max: 100,
          progress: {
            show: true,
            width: 14,
          },
          axisLine: {
            lineStyle: {
              width: 14,
            },
          },
          axisTick: {
            distance: -20,
            length: 4,
          },
          splitLine: {
            distance: -24,
            length: 8,
          },
          axisLabel: {
            distance: -8,
            fontSize: 10,
          },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 C2092.89671,624.004421 2093.10292,630.497059 2093.10292,636.780807 C2093.10292,643.064554 2092.89671,649.557192 2092.44859,656.248658 C2092.40383,657.367585 2091.48372,658.251653 2090.36389,658.251653 L2090.36389,658.251653 C2089.24353,658.251653 2088.32365,657.367585 2088.27887,656.248658 C2087.83075,649.557192 2087.62454,643.064554 2087.62454,636.780807 C2087.62454,630.497059 2087.83075,624.004421 2088.27887,617.312956 C2088.32365,616.194028 2089.24353,615.30999 2090.36389,615.30999 Z',
            length: '60%',
            width: 8,
            offsetCenter: [0, '5%'],
          },
          anchor: {
            show: false,
          },
          title: {
            offsetCenter: [0, '30%'],
            fontSize: 12,
          },
          detail: {
            valueAnimation: true,
            fontSize: 24,
            offsetCenter: [0, '-5%'],
            formatter: '{value}%',
          },
          data: [{ value: 72, name: '完成率' }],
        },
      ],
    };
  });

  const { chartOption: funnelOption } = useChartOption(() => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}',
      },
      series: [
        {
          type: 'funnel',
          left: '10%',
          width: '80%',
          top: 20,
          bottom: 10,
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside',
          },
          itemStyle: {
            borderRadius: 2,
          },
          data: [
            { name: '曝光', value: 10000 },
            { name: '点击', value: 6200 },
            { name: '加购', value: 3800 },
            { name: '下单', value: 2100 },
            { name: '支付', value: 1400 },
          ],
        },
      ],
    };
  });

  const fetchData = async () => {
    try {
      const { data } = await queryChannelPie();
      channelData.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'MultiChart',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
