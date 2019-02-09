<template>
  <Card class='ac_card' :style="{height:getTableHeight+'px'}">
    <Layout class="ac_layout">
      <Header>hander</Header>
      <Content>content</Content>
    </Layout>
  </Card>
</template>

<script>
    export default {
        name: "flowList",
        mixins: [],
        data() {
            return {
              reduceheight:140
            }
        },
        components: {},
        computed: {
          getTableHeight() {
            return this.$store.state.wh.innerHeight - this.reduceheight;
          }
        },
        methods: {},
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped>
  .ac_layout{
    height: 100%;
  }
  .ac_card .ivu-card-body{
    height: 100%;
  }
</style>
