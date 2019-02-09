<!--操作日志-->
<template>
  <Timeline pending>
    <TimelineItem v-for="(item,index) in TimelineLog" :key="index">
      <Row>
        <Col span="4">{{item.time}}</Col>
        <Col span="4">{{item.person}}</Col>
        <Col span="4">{{item.type}}</Col>
      </Row>
      <p class="content">{{item.content}}</p>
    </TimelineItem>
    <TimelineItem><a href="#">查看更多</a></TimelineItem>
  </Timeline>
</template>

<script>
  export default {
    name: 'detailsLog',
    mixins: [],
    data () {
      return {
        TimelineLog:[
          {
            time:'2018-01-02',
            person:'王小二',
            type:'打卡',
            content:'添加一个客户',
          },
          {
            time:'2018-01-04',
            person:'王小二',
            type:'打卡',
            content:'删除一个客户',
          },
          {
            time:'2018-01-05',
            person:'王小二',
            type:'打卡',
            content:'删除一个客户',
          }
        ],
      }
    },
    components: {},
    computed: {},
    methods: {},
    mounted () {
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
