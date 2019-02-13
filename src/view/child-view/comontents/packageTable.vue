<!--封装带有header和footer的table
提供二个插槽
slot=headLeft   如操作按钮组
slot=headRight  如排序字段 操作
-->
<template>
  <Table :data="tableData"
         :columns="columnsData"
         :ref="tableRef"
         :stripe="stripe"
         :border="border"
         :show-header="showHeader"
         :height="getTableHeight"
         @on-selection-change="selectChange"
         :class="{'packageTable':packageTableClass && showSlotHeader,'packageTableTdPadding':packageTableTdPadding}"
         :loading="loading">
    <div slot="header" class="headerWrapper"  v-if="showSlotHeader">
      <div class="headLeft">
        <slot name="headLeft"></slot>
      </div>
      <div class="headRight">
        <slot name="headRight"></slot>
        <Button v-show="showSearchBtn" class="leftBtn" icon="ios-search" @click="showSearchPanel">高级搜索</Button>
        <!--<Button v-show="showRefreshBtn" class="leftBtn" icon="ios-refresh" @click="showRefreshParel">刷新</Button>-->
      </div>
    </div>
    <div slot="footer"
         class="content_base_page"
         v-show="showFooter">
      <Page
        :total="tabletotallen"
        ref="pageRef"
        :page-size="tablePageSize"
        :current="tablePageIndex"
        size="small"
        @on-change="pageOnchange"
        @on-page-size-change="pageSizeChange"
        show-total show-elevator></Page>
    </div>
  </Table>
</template>

<script>
export default {
  name: 'packageTable',
  data () {
    return {
      tableRef: 'packageTable'
    }
  },
  props: {
    packageTableClass: {// packageTable基本样式
      type: Boolean,
      default: true
    },
    packageTableTdPadding: {// packageTdPadding 单元格之间padding的样式
      type: Boolean,
      default: false
    },
    showRefreshBtn: {
      type: Boolean,
      default: true
    },
    showSearchBtn: {// 是否显示高级搜索
      type: Boolean,
      default: true
    },
    headBtnList: {// 头部操作按钮list
      type: Array,
      default: function () {
        return []
      }
    },
    tableData: {// 表格数据
      type: Array,
      default: function () {
        return []
      }
    },
    columnsData: {// 表格列数据
      type: Array,
      default: function () {
        return []
      }
    },
    stripe: {// 是否显示间隔斑马纹
      type: Boolean,
      default: false
    },
    border: {// 是否显示纵向边框
      type: Boolean,
      default: false
    },
    showHeader: {// 是否显示 表头
      type: Boolean,
      default: true
    },
    showSlotHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {// 是否显示footer
      type: Boolean,
      default: true
    },
    height: {// 表格高度
      type: Number
    },
    loading: {// 表格loading
      type: Boolean,
      default: false
    },
    tabletotallen: {// 分页总数
      type: Number,
      default: 0
    },
    tablePageSize: {// 分页尺寸
      type: Number,
      default: 15
    },
    tablePageIndex: {// 分页index
      type: Number,
      default: 1
    },
    reduceheight: {// 默认需要减去的高度
      type: Number,
      default: 140
    }

  },
  components: {},
  computed: {
    getTableHeight () {
      return this.$store.state.wh.innerHeight - this.reduceheight
    }
  },
  methods: {
    pageOnchange (index) {
      this.$emit('pageonChange', index)
    },
    pageSizeChange () {

    },
    initcurrentPage () {
      // 重置当前currentpage
      this.$refs.pageRef.currentPage = 1
    },
    /**
       * 显示面板btn操作
       */
    showRefreshParel () {
      // location.reload();//刷新整个页面
      this.$emit('refreshBtn')
    },
    showSearchPanel () {
      this.$emit('showSearchPanel')
    },
    // 选择改变时触发
    selectChange (selection) {
      this.$emit('getSelect', selection)
    }
  }
}
</script>

<style scoped>
  .content_base_page {
    display: flex;
    justify-content: center;
    border-top: 1px solid #e9eaec;
  }

  .base_btn_item {
    margin-left: 5px;
  }

  .leftBtn {
    margin-right: 5px;
  }
  .headerWrapper{
    margin:0 16px 0 10px;
    display: flex;
    justify-content: space-between;
    height: 100%;
    overflow: auto;
  }
  .headLeft{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .headRight{
    display: flex;
    align-items: center;
    justify-content:flex-end;

  }
</style>
