<template>
  <div class="flex-col flex justify-center items-center">
    <span class="iii mt-[10%] text-center mx-auto font-bold text-2xl">
      七天阅读趋势
    </span>
    <div ref="lineChart" style="width: 400px; height: 400px;" class="ml-[60%] mt-[20px]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { getReadingTime } from "@/api/api.js";
import Cookies from "js-cookie";

const lineChart = ref(null);
const lineChartData = ref([0,0,0,0,0,0,0]);
const data = ref([]);
const username = Cookies.get("username");
onMounted(async () => {
  let res = await getReadingTime(username);
  data.value = res.data;

  if (Object.keys(data.value).length < 7) {
    const missingCount = 7 - Object.keys(data.value).length;
    for (let i = 0; i < missingCount; i++) {
      lineChartData.value[i] = 0;
    }
    for (let j = missingCount; j < 7; j++) {
      lineChartData.value[j] = data.value[j - missingCount] / 60000;
    }
  } else {
    for (let i = 0; i < 7; i++) {
      lineChartData.value[i] = data.value[i] / 60000;
    }
  }

  initCharts();
});

const initCharts = () => {
  const myLineChart = echarts.init(lineChart.value);
  const lineOption = {
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: lineChartData.value,
      type: 'line'
    }]
  };
  myLineChart.setOption(lineOption);
};
</script>
