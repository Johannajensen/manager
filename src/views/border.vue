<script setup>
import tianshui from '../views/echarts/tianshui.json'
import * as echarts from 'echarts';
import "echarts-gl" //3D地图插件
import { onMounted } from 'vue';
import { ref } from 'vue';

onMounted(() => {
  chartMap();
  init_map();
  secondmap();
})
const chartMap = () => {
  var myChart = echarts.init(document.getElementById("mapEchart"));
  echarts.registerMap("tianshui", tianshui);
  myChart.hideLoading();
  // 图表配置项
  let option = {
    geo3D: {
      map: "tianshui",
      roam: true,
      itemStyle: {
        color: "#007aff",
        opacity: 0.8,
        borderWidth: 0.4,
        borderColor: "#000"
        // areaColor: '#fff'
      },
      viewControl: {
        autoRotate: true,
        autoRotateAfterStill: 3,
        distance: 120,
        minAlpha: 5, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
        maxAlpha: 90, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
        minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
        maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
        animation: true, // 是否开启动画。[ default: true ]
        animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
        animationEasingUpdate: "cubicInOut" // 过渡动画的缓动效果。[ default: cubicInOut ]
      },

      emphasis: {
        disabled: true, //是否可以被选中
        label: {
          //移入时的高亮文本
          show: true,
          color: "#333", //显示字体颜色变淡
          fontSize: 18 //显示字体变大
        },
        itemStyle: {
          color: "#ff7aff" //显示移入的区块变粉色
        }
      },
      label: {
        show: true,
        position: "top",
        color: "#111", //地图初始化区域字体颜色
        fontSize: 14,
        lineHeight: 16
      },
      shading: "lambert",
      light: {
        //光照阴影
        main: {
          // color: "#fff", //光照颜色
          intensity: 1, //光照强度
          //shadowQuality: 'high', //阴影亮度
          shadow: true, //是否显示阴影
          shadowQuality: "medium", //阴影质量 ultra //阴影亮度
          alpha: 55,
          beta: 10
        },
        ambient: {
          intensity: 0.7
        }
      }
    },
  };
  myChart.setOption(option);
}

const init_map = () => {
  const people_map = document.querySelector('.people')
  const map_tianshui = echarts.init(people_map);
  let option;
  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        top: '15%',
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };
  option && map_tianshui.setOption(option);
}

const message = ref(null)
const secondmap = () => {
  let second = message.value
  var myChart = echarts.init(second);
  var option;
  option = {
    title: {
      text: '天水市一周天气情况展示'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: 'Highest',
        type: 'line',
        data: [10, 11, 13, 11, 12, 12, 9],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: 'Lowest',
        type: 'line',
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
        },
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max'
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: 'Max'
                },
                type: 'max',
                name: '最高点'
              }
            ]
          ]
        }
      }
    ]
  };

  option && myChart.setOption(option);

}
</script>
<template>
  <div class="map">
    <div class="map-container">
      <div class="map-container-title">天水市3D视图</div>
      <div class="map-chart" id="mapEchart"></div>
    </div>
    <div class="people" ref="people_map">

    </div>
  </div>
  <div ref="message" class="message"></div>
  <div style="height: 100px;"></div>
</template>
<style scoped>
.map {
  display: flex;
  justify-content: center;
  width: 1200px;
  height: 400px;

  .map-container {
    border-radius: 30px;
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;

    .map-container-title {
      margin: 56px 0 16px;
      font-size: 24px;
      font-weight: 700;
      color: #333;
      line-height: 30px;
      display: flex;
      justify-content: center;
    }

    .map-chart {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      height: 100%;
      width: 100%;

    }
  }
}

canvas {
  width: 1200px;
  height: 400px;
  position: absolute;
  left: 0px;
  top: 0px;
}

.people {
  border-radius: 30px;
  width: 500px;
  height: 400px;
  margin-left: 20px;
  background-color: white;
  padding: 20px;
}

.message {
  width: 1200px;
  border-radius: 30px;
  height: 500px;
  margin-top: 20px;
  background-color: white;
  border-radius: 30px;
  padding: 10px;
  height: 500px;
  overflow: hidden;
}
</style>
