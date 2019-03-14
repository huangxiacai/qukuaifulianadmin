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
        <FormItem label="状态:" class="ivu-col ivu-col-span-6 m-b-10">
          <Select v-model="filter_form.type" placeholder="请选择状态">
            <Option v-for="item in getStatus" :value="item.value"
                    :key="item.label">{{ item.label }}
            </Option>
          </Select>
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
import { formatDate } from '@/libs/util'
import exportConponents from '../comontents/exportConponents'
export default {
  name: 'welfareRecord',
  mixins: [packageTableMixins],
  data () {
    return {
      reqBase: {
        type: -1,
        currentPage: 1,
        length: 15
      },
      title: '福利值记录过滤',
      getStatus: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '注册认证',
          value: 0
        },
        {
          label: '邀请',
          value: 1
        },
        {
          label: '功德捐赠',
          value: 2
        },
        {
          label: '购买商品',
          value: 3
        },
        {
          label: '活跃度转换',
          value: 4
        },
        {
          label: '购买道具',
          value: 5
        }
      ],
      startDate: null,
      endDate: null,
      filter_form: {
        phone: null,
        type: -1,
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
          render: (h, { row }) => {
            return h('div', row.postUser.nickname)
          }
        },
        {
          title: '用户id',
          key: 'userId',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.postUser.phone)
          }
        },
        {
          title: '福利值',
          key: 'welfareValue',
          align: 'center'
        },
        {
          title: '福利值来源',
          key: 'type',
          align: 'center',
          render: (h, { row }) => {
            let vm = this
            let result = ''
            for (let s = 0; s < vm.getStatus.length; s++) {
              let list = vm.getStatus[s]
              if (list.value === row.type) {
                result = list.label
                break
              }
            }
            return h('div', result)
          }
        },
        {
          title: '福利值获得时间',
          key: 'createDate',
          align: 'center',
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d H:i:s', row.createDate))
          }
        },
        {
          title: '备注',
          key: 'desc',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handleQueryWelfareRecords'
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
        type: -1,
        startDate: null,
        endDate: null,
        nickName: null
      }
    },
    getTypeLabel (value) {
      let vm = this
      let result = ''
      for (let s = 0; s < vm.getStatus.length; s++) {
        let list = vm.getStatus[s]
        if (list.value === value) {
          result = list.label
          break
        }
      }
      return result
    },
    exprotData () {
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
              vm.handleQueryWelfareRecords({
                type: -1,
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
                      welfareValue: list.welfareValue,
                      type: vm.getTypeLabel(list.type),
                      createDate: formatDate('Y-m-d H:i:s', list.createDate),
                      desc: list.desc
                    })
                  }
                  vm.$Message.success('导出成功！')
                  vm.$Modal.remove()
                  vm.$refs.contentBaseRef.$refs.packageTable.exportCsv({
                    filename: 'welfare',
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
      this.handleQueryWelfareRecords({ ...this.reqBase }).then(res => {
        this.tableLoading = false
        if (res.code === 20000) {
          this.tableDataList = res.data.data
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
