<!--福豆后台充值-->
<template>
    <div style="position:relative;">
        <searchPanel :title="title"
                     @search="onSearch(filter_form)"
                     ref="filterBase"
                     @reset="resetConditions"
                     :isReset="true">
            <Form slot="formContent" inline class="ivu-row">
                <FormItem label="用户昵称:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Input v-model="filter_form.nickname" type="text"
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
import addRecharge from './components/addRecharge'
import { formatDate } from '@/libs/util'
import exportConponents from '../comontents/exportConponents'
export default {
  name: 'fudouRecharge',
  mixins: [packageTableMixins],
  data () {
    return {
      title: '福豆后台充值过滤',
      startDate: null,
      endDate: null,
      getStatus: [
        {
          value: 1,
          label: '充值'
        },
        {
          value: 2,
          label: '扣款'
        }
      ],
      getType: [
        {
          value: 1,
          label: '随身福袋'
        },
        {
          value: 2,
          label: '福报福袋'
        },
        {
          value: 3,
          label: '社区福袋'
        },
        {
          value: 4,
          label: '法币福袋'
        },
        {
          value: 5,
          label: '可解锁福豆'
        },
        {
          value: 6,
          label: '福利值'
        },
        {
          value: 7,
          label: '活跃度'
        }
      ],
      headBtnList: [
        {
          mothod: this.add,
          type: 'primary',
          icon: '',
          text: '充值'
        }
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
          title: '数量',
          key: 'amount',
          align: 'center'
        },
        {
          title: '充值类型',
          key: 'type',
          align: 'center',
          render: (h, { row }) => {
            let result = ''
            for (let i = 0; i < this.getType.length; i++) {
              let list = this.getType[i]
              if (row.type === list.value) {
                result = list.label
                break
              }
            }
            return h('div', result)
          }
        },
        {
          title: '充值/扣款',
          key: 'status',
          align: 'center',
          render: (h, { row }) => {
            let vm = this
            let result = ''
            for (let i = 0; i < vm.getStatus.length; i++) {
              let list = vm.getStatus[i]
              if (row.status == list.value) {
                result = list.label
                break
              }
            }
            return h('div', result)
          }
        },
        {
          title: '操作时间',
          key: 'createDate',
          align: 'center',
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d H:i:s', row.createDate))
          }
        }
      ],
      filter_form: {
        phone: null,
        startDate: null,
        endDate: null,
        nickname: null
      }
    }
  },
  methods: {
    ...mapActions([
      'handlequerySystemFobBeanRecords',
      'handleoperUserFobBean'// 充值
    ]),
    add () {
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '充值'),
            h(addRecharge, {
              ref: 'addRecharge',
              props: {
                getType: vm.getType,
                getStatus: vm.getStatus
              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.addRecharge
          obj.checkForm().then(res => {
            if (res) {
              let getData = obj.getData
              // 发送请求
              vm.handleoperUserFobBean({
                ...getData
              }).then(res => {
                if (res.code === 20000) {
                  vm.$Message.success('充值成功！')
                  vm.$Modal.remove()
                  vm.init()
                } else {
                  vm.$Message.error(res.msg)
                  _this.buttonLoading = false
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
    // 是否上架
    changeBannerStatus (row, title) {
      let vm = this
      let config = {
        title: title,
        loading: true,
        content: '您确定要' + title + '此轮播图吗？',
        onOk: function () {
          let _this = this
          // 发送请求
          vm.handleisHideShopImage({
            shopImageId: row.shopImageId
          }).then(res => {
            if (res.code === 20000) {
              vm.$Message.success(title + '成功！')
              vm.$Modal.remove()
              vm.init()
            } else {
              vm.$Message.error(res.message)
              _this.buttonLoading = false
            }
          })
        }
      }
      this.$Modal.confirm(config)
    },
    edit (row) {
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '修改轮播图'),
            h(addBannerManage, {
              ref: 'addBannerManage',
              props: {
                setData: row
              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.addBannerManage
          obj.checkForm().then(res => {
            if (res) {
              let getData = obj.getData
              // 发送请求
              vm.handleInsertUser({
                ...getData
              }).then(res => {
                if (res.code === 20000) {
                  vm.$Message.success('添加成功！')
                  vm.$Modal.remove()
                  vm.init()
                } else {
                  vm.$Message.error(res.msg)
                  _this.buttonLoading = false
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
    del (row) {
      let vm = this
      let config = {
        title: '删除轮播图',
        loading: true,
        content: '您确定要删除此轮播图吗？',
        onOk: function () {
          let _this = this
          // 发送请求
          vm.handledeleteShopImage({
            shopImageId: row.shopImageId
          }).then(res => {
            if (res.code === 20000) {
              vm.$Message.success('删除成功！')
              vm.$Modal.remove()
              vm.init()
            } else {
              vm.$Message.error(res.message)
              _this.buttonLoading = false
            }
          })
        }
      }
      this.$Modal.confirm(config)
    },
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
        nickname: null
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
              vm.handlequerySystemFobBeanRecords({
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
                      amount: list.amount,
                      type: vm.getTypeLabel(list.type),
                      status: vm.getStatusLabel(list.status),
                      createDate: formatDate('Y-m-d', list.createDate)
                    })
                  }
                  vm.$Message.success('导出成功！')
                  vm.$Modal.remove()
                  vm.$refs.contentBaseRef.$refs.packageTable.exportCsv({
                    filename: 'fudouRecharge',
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
    getTypeLabel (value) {
      let result = ''
      for (let i = 0; i < this.getType.length; i++) {
        let list = this.getType[i]
        if (value === list.value) {
          result = list.label
          break
        }
      }
      return result
    },
    getStatusLabel (value) {
      let vm = this
      let result = ''
      for (let i = 0; i < vm.getStatus.length; i++) {
        let list = vm.getStatus[i]
        if (value == list.value) {
          result = list.label
          break
        }
      }
      return result
    },
    init () {
      this.tableLoading = true
      this.handlequerySystemFobBeanRecords({ ...this.reqBase }).then(res => {
        this.tableLoading = false
        if (res.code === 20000) {
          debugger
          this.tableDataList = res.data.data || []
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
