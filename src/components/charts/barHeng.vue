<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBarHeng',
  props: {
    label:Array,
    value: Array,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    init(){
      this.$nextTick(() => {
        debugger
        let yAxisData = this.label;
        let seriesData = this.value;
        let option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['2011年']
          },
          toolbox: {
            show : false,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis: {
            type: 'value',
            boundaryGap:  [0, 0.1]
          },
          yAxis: {
            type: 'category',
            data:yAxisData
          },
          series: [{
            data: seriesData,
            type: 'bar'
          }]
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  mounted () {

  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
