<template>
  <Card
    v-show="showSearch"
    class="cardWrapper"
    :icon="icon"
    :title="title">
    <slot name="formContent"></slot>
    <Row type="flex" justify="center" class="code-row-bg">
      <Button type="primary" @click="search">确定</Button>
      <Button type="default" @click="reset">重置</Button>
      <Button type="default" @click="cancel">取消</Button>
    </Row>
  </Card>
</template>

<script>
  export default {
    name: "searchPanel",
    mixins: [],
    data() {
      return {
        showSearch: false,//是否显示搜索区域
      }
    },
    props: {
      title: {
        type: String,
        default: '过滤条件'
      },
      icon: {
        type: String,
        default: "ios-search"
      }
    },
    components: {},
    computed: {},
    methods: {
      init() {
        this.showSearch = true;
      },
      search() {
        this.showSearch = false;
        this.$emit("search");
      },
      reset() {
        this.$emit("reset");
      },
      cancel() {
        this.showSearch = false;
      }
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style scoped>
  .cardWrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5
  }

  .code-row-bg {
    margin-top: 5px;
  }

  .code-row-bg button {
    margin-right: 5px;
  }
</style>
