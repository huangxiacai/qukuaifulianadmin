<template>
  <div style="position:relative;">
    <searchPanel :title="title"
                 @search="onSearch(filter_form)"
                 ref="filterBase"
                 @reset="resetConditions"
                 :isReset="true">
      <Form slot="formContent" inline class="ivu-row">
        <FormItem label="用户昵称:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.nickName" type="text"
                 placeholder="请填写用户昵称"></Input>
        </FormItem>
        <FormItem label="用户手机号:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.phone" type="text" icon="iphone"
                 placeholder="请填写用户手机号"></Input>
        </FormItem>
        <FormItem label="开始时间:" class="ivu-col ivu-col-span-6 m-b-10">
          <DatePicker v-model="startDate" type="date" placeholder="请选择开始时间" @on-change="startDateChange" style="width: 100%"></DatePicker>
        </FormItem>
        <FormItem label="结束时间:" class="ivu-col ivu-col-span-6 m-b-10">
          <DatePicker v-model="endDate" type="date" placeholder="请选择结束时间" @on-change="endDateChange" style="width: 100%"></DatePicker>
        </FormItem>
      </Form>
    </searchPanel>
    <packageTable
      ref="contentBaseRef"
      :columnsData="columnsheader"
      :tableData="tableDataList"
      :reduceheight="reduceheight"
      :loading="tableLoading"
      :border="true"
      :tabletotallen="getPageTotal"
      @pageonChange="pageonChange"
      @showSearchPanel="showSearchPanel"
      @getSelect="getSelectList">
      <template slot="headLeft">
        <Button v-for="(item,index) in headBtnList" @click="item.mothod" :key="index" class="base_btn_item"
                :type="item.type" :icon="item.icon">
          {{item.text}}
        </Button>
      </template>
      <template slot="headRight">
          <Button v-for="(item,index) in headBtnRightList" @click="item.mothod" :key="index" class="base_btn_item"
                  :type="item.type" :icon="item.icon">
              {{item.text}}
          </Button>
      </template>
    </packageTable>
  </div>
</template>

<script>
import packageTableMixins from '../mixins/packageTableMixins'
import { mapActions } from 'vuex'
import { formatDate } from '../../../libs/util'
import exportConponents from '../comontents/exportConponents'
export default {
  name: 'userAchievement',
  mixins: [packageTableMixins],
  data () {
    return {
      title: '用户福豆过滤',
      getStatus: [
        {
          label: '待付款',
          value: 1
        },
        {
          label: '付款完成',
          value: 2
        }
      ],
      getType:[
        {
          label: '支付宝',
          value: 0
        },
        {
          label: '微信',
          value: 1
        },
        {
          label: '银行卡',
          value: 2
        }
      ],
      startDate: null,
      endDate: null,
      filter_form: {
        phone: null,
        startDate: null,
        endDate: null,
        nickName: null
      },
      headBtnList: [

      ],
      headBtnRightList: [
        {
          mothod: this.exprotData,
          type: 'primary',
          icon: '',
          text: '导出'
        }
      ],
      columnsheader: [
        {
          title: '用户昵称',
          key: 'nickname',
          align: 'center',
          fixed: 'left',
          width:100,
          render: (h, { row }) => {
            return h('div', row.postUser.nickname)
          }
        },
        {
          title: '用户id',
          key: 'userId',
          width:100,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center',
          width:100,
          render: (h, { row }) => {
            return h('div', row.postUser.phone)
          }
        },

        {
          title: '订单号',
          key: 'rechargeOrderNo',
          width:100,
          align: 'center'
        },
        {
          title: '付款方式',
          key: 'rechargeType',
          align: 'center',
          width:100,
          render:(h,{row})=>{
            let result="";
            for(let i=0;i<this.getType.length;i++){
              let list=this.getType[i];
              if(list.value===row.rechargeType){
                result=list.label;
                break;
              }
            }
            return h('div',result);
          }
        },
        {
          title: '付款状态',
          key: 'status',
          align: 'center',
          width:100,
          render:(h,{row})=>{
            let result="";
            for(let i=0;i<this.getStatus.length;i++){
              let list=this.getStatus[i];
              if(list.value===row.status){
                result=list.label;
                break;
              }
            }
            return h('div',result);
          }
        },
        {
          title: '支付时间',
          key: 'createDate',
          align: 'center',
          width: 150,
          render: (h, { row }) => {
            if(row.createDate){
              return h('div', formatDate('Y-m-d H:i:s', row.createDate))
            }
          }
        },
        {
          title: '支付金额(元)',
          key: 'money',
          width:100,
          align: 'center'
        },
        {
          title: '购买道具名称',
          key: 'welfareTool.toolName',
          align: 'center',
          render:(h,{row})=>{
            return h('div',row.welfareTool.toolName);
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handleQueryUserBeans',
      'handleQuerySales'
    ]),
    //
    showSearchPanel () {
      this.$refs.filterBase.init()
    },
    startDateChange (value) {
      this.$set(this.filter_form, 'startDate', value)
    },
    endDateChange (value) {
      this.$set(this.filter_form, 'endDate', value)
    },
    // 重置搜索条件
    resetConditions () {
      this.startDate = null
      this.endDate = null
      this.filter_form = {
        phone: null,
        startDate: null,
        endDate: null,
        nickName: null
      }
    },
    exprotData () {
      debugger
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '导出数据'),
            h(exportConponents, {
              ref: 'exportConponents',
              props: {

              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.exportConponents
          obj.checkForm().then(res => {
            if (res) {
              debugger
              let { startDate, endDate } = obj.formModel
              vm.handleQueryUserBeans({
                currentPage: 1,
                length: vm.getPageTotal,
                startDate,
                endDate
              }).then(res => {
                if (res.code === 20000) {
                  let allData = res.data.data
                  let _arr = []
                  for (let i in allData) {
                    let list = allData[i]
                    _arr.push({
                      nickname: list.postUser.nickname,
                      userId: list.userId,
                      phone: list.postUser.phone,
                      suishenBean: list.suishenBean,
                      fubaoBean: list.fubaoBean,
                      rewardBean: list.rewardBean,
                      angelBean: list.angelBean,
                      unlockBean: list.unlockBean,
                      commuityBean: list.commuityBean,
                      legalBean: list.legalBean,
                      freezeBean: list.freezeBean,
                      deductBean: list.deductBean
                    })
                  }
                  vm.$Message.success('导出成功！')
                  vm.$Modal.remove()
                  vm.$refs.contentBaseRef.$refs.packageTable.exportCsv({
                    filename: 'userFudou',
                    columns: vm.columnsheader,
                    data: _arr
                  })
                }
              })
            } else {
              _this.buttonLoading = false
            }
          })
        }
      }
      this.$Modal.confirm(config)
    },
    init () {
      this.tableLoading = true
      this.handleQuerySales({ ...this.reqBase }).then(res => {
        this.tableLoading = false
        if (res.code === 20000) {
          debugger
          this.tableDataList = res.data.data||[];
          this.getPageTotal = res.data.totalCount
        } else {
          this.tableDataList = []
          this.getPageTotal = 0
        }
      })
    }

  },
  mounted () {
    this.init()
  },
  created () {

  }
}
</script>

<style scoped>

</style>
