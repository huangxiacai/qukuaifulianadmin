<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="12" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card v-if="infor.title!='系统回收的总数量'" shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
        <infor-card v-else shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" :decimals="decimals" :simplify='true' :unit="unitList" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row>
    <Card shadow>
      <ChartBarHeng ref="ChartBarHeng" style="height: 500px;" :label="barLabel" :value="barData" text="用户各个分类的总钱包福豆"/>
    </Card>
  </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar ,ChartBarHeng} from '_c/charts'
import Example from './example.vue'
import {mapActions} from 'vuex'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example,
    ChartBarHeng
  },
  data () {
    return {
      decimals:4,
      unitList:[[9, 'B+']],
      inforCardData: [
        { title: '每日新增用户', icon: 'md-person-add', count: 0, color: '#2d8cf0' },
        { title: '每日新增业绩(元)', icon: 'md-locate', count: 0, color: '#19be6b' },
        { title: '所有提现的IMTOKEN钱包总数量', icon: 'md-chatbubbles', count: 0, color: '#ff9900' },
        { title: '系统回收的总数量', icon: 'md-map', count: 0, color: '#ed3f14' },
      ],
      pieData: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1548, name: '搜索引擎'}
      ],
      barLabel:['系统的福袋总数量','随身福袋总数量','福报福袋总数量','社区福袋总数量','原始福袋总数量','法币福袋总数量'],
      barData: [0,0,0,0,0,0]
    }
  },
  methods:{
    ...mapActions([
      'handlequerySomeConstants',//每日新增用户量、每日新增业绩
      'handlequerySystemTotalBean',
      'handlequeryIMSuccessTotalBean',
      'handlequerySystemRecoryTotalBean'
    ])
  },
  mounted () {
    let vm=this;
    //每日新增用户量、每日新增业绩
    this.handlequerySomeConstants({}).then(res=>{
      if(res.code===20000){
        this.inforCardData[0].count=res.data.everyAddUsers;//每日新增用户量
        this.inforCardData[1].count=res.data.everyAddSales;//每日新增用户量
      }
    });
    //获取查询系统回收的总数量
    this.handlequerySystemRecoryTotalBean({}).then(res=>{
      if(res.code===20000){
        this.inforCardData[3].count=res.data;//每日新增用户量
      }
    });
    this.handlequeryIMSuccessTotalBean().then(res=>{
      if(res.code===20000){
        this.inforCardData[2].count=res.data;//每日新增用户量
      }
    });
    this.handlequerySystemTotalBean({}).then(res=>{
      this.barData=[];
      if(res.code===20000){
        debugger
        this.barData.push(res.data.totalBean);
        this.barData.push(res.data.suishenBean);
        this.barData.push(res.data.fubaoBean);
        this.barData.push(res.data.commuityBean);
        this.barData.push(res.data.originBean);
        this.barData.push(res.data.legalBean);
        this.$refs.ChartBarHeng.init();
        // this.$set(vm.barData,"系统的福袋总数量",res.data.totalBean);
        // this.$set(vm.barData,"随身福袋总数量",res.data.suishenBean);
        // this.$set(vm.barData,"福报福袋总数量",res.data.fubaoBean);
        // this.$set(vm.barData,"社区福袋总数量",res.data.commuityBean);
        // this.$set(vm.barData,"原始福袋总数量",res.data.originBean);
        // this.$set(vm.barData,"法币福袋总数量",res.data.legalBean);
      }
    })

  },
  created(){

  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
