<template>
  <div>
    <searchPanel :title="searchtitle"
                 @search="onSearch(filter_form)"
                 ref="filterBase1"
                 @reset="resetConditions"
                 :isReset="true">
      <Form slot="formContent" inline class="ivu-row">
        <FormItem label="用户昵称:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.nickName" type="text"
                 placeholder="请填写用户昵称"></Input>
        </FormItem>
        <FormItem label="用户手机号:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.phone" :maxlength="11" type="text" icon="iphone"
                 placeholder="请填写用户手机号"></Input>
        </FormItem>
        <FormItem label="开始时间:" class="ivu-col ivu-col-span-6 m-b-10">
          <DatePicker v-model="startDate" :transfer="true" type="date" placeholder="请选择开始时间"
                      @on-change="startDateChange" style="width: 100%"></DatePicker>
        </FormItem>
        <FormItem label="结束时间:" class="ivu-col ivu-col-span-6 m-b-10">
          <DatePicker v-model="endDate" :transfer="true" type="date" placeholder="请选择结束时间" @on-change="endDateChange"
                      style="width: 100%"></DatePicker>
        </FormItem>
        <FormItem label="状态:" class="ivu-col ivu-col-span-6 m-b-10">
          <Select v-model="filter_form.type" :transfer="true" placeholder="请选择状态">
            <Option v-for="item in getType" :value="item.value"
                    :key="item.label">{{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="订单Id:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.businessId" type="text"
                 placeholder="请填写订单Id"></Input>
        </FormItem>
      </Form>
    </searchPanel>
    <Modal
      :title="title"
      v-model="showModalStatus"
      :width="width"
      :styles="{top: '20px'}"
      @on-visible-change="visibleChange"
      :footer-hide="true"
      :mask-closable="false">
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

        </template>
      </packageTable>
    </Modal>
  </div>

</template>

<script>
import { modalTemplateMixins } from '../../mixins/modalTemplateMixins'
import packageTableMixins from '../../mixins/packageTableMixins'
import searchPanel from '../../comontents/searchPanel'
import { formatDate } from '@/libs/util'
import { mapActions } from 'vuex'

export default {
  name: 'searchPurchaseList',
  mixins: [modalTemplateMixins, packageTableMixins],
  data () {
    return {
      reduceheight: 150,
      width: 1000,
      reqBase: {
        currentPage: 1,
        length: 15,
        type: -1,
        businessId: null
      },
      title: '购入记录列表',
      searchtitle: '购入记录列表过滤',
      getType: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '未完成'
        },
        {
          value: 1,
          label: '完成'
        }
      ],
      getStatus: [
        {
          value: 1,
          label: '代付款'
        },
        {
          value: 2,
          label: '已付款'
        },
        {
          value: 3,
          label: '完成'
        },
        {
          value: 4,
          label: '拒绝'
        },
        {
          value: 5,
          label: '系统介入'
        },
        {
          value: 6,
          label: '退回至买家'
        },
        {
          value: 7,
          label: '退回至卖家'
        },
        {
          value: 8,
          label: '卖家撤销'
        },
        {
          value: 9,
          label: '卖家撤销'
        }
      ],
      startDate: null,
      endDate: null,
      filter_form: {
        startDate: null,
        endDate: null,
        phone: null,
        nickName: null,
        type: -1,
        businessId: null
      },
      headBtnList: [
        // {
        //   mothod: this.add,
        //   type: 'primary',
        //   icon: '',
        //   text: '添加福豆价格'
        // }
      ],
      columnsheader: [

        {
          title: '用户昵称',
          key: 'postUser.nickname',
          align: 'center',
          width: 150,
          render: (h, { row }) => {
            return h('div', row.postUser.nickname)
          }
        },
        {
          title: '用户id',
          key: 'userId',
          width: 100,
          align: 'center'
        },
        {
          title: '用户手机号',
          key: 'postUser.phone',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.postUser.phone)
          }
        },
        {
          title: '订单Id',
          key: 'businessId',
          align: 'center',
          width: 100
        },
        {
          title: '购买数量',
          key: 'amount',
          align: 'center',
          width: 100
        },
        {
          title: '支付凭证',
          key: 'payOrder',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            if (row.payOrder === null || row.payOrder === '') {

            } else {
              return h('div', {
                style: {
                  width: '70px',
                  height: '70px'
                }
              }, [
                h('img', {
                  style: {
                    width: '100%',
                    height: '100%'
                  },
                  attrs: {
                    src: this.fileImgPrefix + '' + row.payOrder
                  }
                })
              ])
            }
          }
        },
        {
          title: '状态',
          key: 'status',
          width: 100,
          align: 'center',
          render: (h, { row }) => {
            let result = ''
            for (let i = 0; i < this.getStatus.length; i++) {
              let list = this.getStatus[i]
              if (list.value === row.status) {
                result = list.label
                break
              }
            }
            return h('div', result)
          }
        },
        {
          title: '申述原因',
          key: 'appealDesc',
          align: 'center',
          width: 100
        },
        {
          title: '福豆价格',
          key: 'beanPrice',
          align: 'center',
          width: 100
        },
        {
          title: '出售者的支付宝',
          key: 'sellerUserDetail.alipayCode',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.sellerUserDetail.alipayCode)
          }
        },
        {
          title: '出售者的银行卡号',
          key: 'sellerUserDetail.bankcardCode',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.sellerUserDetail.bankcardCode)
          }
        },
        {
          title: '出售者的银行卡名称',
          key: 'sellerUserDetail.bankcardName',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.sellerUserDetail.bankcardName)
          }
        },
        {
          title: '出售者手机号',
          key: 'sellerUserDetail.phone',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.sellerUserDetail.phone)
          }
        },
        {
          title: '创建时间',
          key: 'createDate',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d H:i:s', row.createDate))
          }
        },
        {
          title: '拒绝原因',
          key: 'rejectDesc',
          align: 'center',
          width: 100
        },
        {
          title: '订单详情',
          key: 'detailNo',
          align: 'center',
          width: 100
        },
        {
          title: '操作',
          key: '',
          align: 'center',
          fixed: 'right',
          width: 180,
          render: (h, { row }) => {
            let vm = this
            let arr = []
            if (row.status == 1 || row.status == 2 || row.status == 4 || row.status == 5) {
              arr.push(h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: function () {
                    vm.backCustomer(row, '退回买家', 7)
                  }
                }
              }, '退回买家'))
              arr.push(h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: function () {
                    vm.backCustomer(row, '退回卖家', 7)
                  }
                }
              }, '退回卖家'))
            }
            return h('div', arr)
          }
        }
      ]
    }
  },
  computed: {
    // 文件前缀
    fileImgPrefix () {
      let root = this.$config.imgUrl.pro
      if (process.env.NODE_ENV !== 'production') {
        root = this.$config.imgUrl.dev
      }
      return root
    }
  },
  components: {
    searchPanel
  },
  methods: {
    ...mapActions([
      'handlequeryBusinessDetails',
      'handleupdateBusinessDetailStatus'// 更新购入订单详情状态
    ]),
    initParams (businessId) {
      this.reqBase.businessId = businessId
    },
    showSearchPanel () {
      debugger
      // this.$refs.filterBase1.init()
    },
    startDateChange (value) {
      this.$set(this.filter_form, 'startDate', value)
    },
    endDateChange (value) {
      this.$set(this.filter_form, 'endDate', value)
    },

    visibleChange (visible) {
      if (visible) {
        this.init()
      } else {
        this.tableDataList = []
      }
    },
    // 重置搜索条件
    resetConditions () {
      this.startDate = null
      this.endDate = null
      this.filter_form = {
        startDate: null,
        endDate: null,
        phone: null,
        nickName: null,
        type: -1,
        businessId: null
      }
    },
    add () {
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '添加福豆价格'),
            h(addfudouPrice, {
              ref: 'addfudouPrice',
              props: {}
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.addfudouPrice
          obj.checkForm().then(res => {
            if (res) {
              let { beanPrice, createDate } = obj.getData
              // 发送请求
              vm.handlesaveOrUpdateBeanPrice({
                beanPrice,
                createDate
              }).then(res => {
                if (res.code === 20000) {
                  vm.$Message.success('添加锁仓记录成功！')
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
    edit (row) {
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '修改福豆价格'),
            h(addfudouPrice, {
              ref: 'addfudouPrice',
              props: {
                setData: row
              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.addfudouPrice
          obj.checkForm().then(res => {
            if (res) {
              let { beanPrice, createDate, priceId } = obj.getData
              // 发送请求
              vm.handlesaveOrUpdateBeanPrice({
                beanPrice,
                createDate,
                priceId
              }).then(res => {
                if (res.code === 20000) {
                  vm.$Message.success('修改锁仓记录成功！')
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
    // 查看购入列表
    purchaseList (row) {
      this.$refs.searchPurchaseList.showModal(true)
      this.$refs.searchPurchaseList.initParams(row.row)
    },

    backCustomer (row, title, status) {
      let vm = this
      let config = {
        title: title,
        content: '您确定要' + title + '道具吗',
        loading: true,
        onOk: function () {
          let _this = this
          vm.handleupdateBusinessDetailStatus(
            {
              detailId: row.detailId,
              status: status
            }
          ).then(res => {
            if (res.code === 20000) {
              vm.$Message.success(title + '成功')
              vm.$Modal.remove()
              vm.init()
            } else {
              vm.$Message.error(res.msg)
              _this.buttonLoading = false
            }
          })
        }
      }
      this.$Modal.confirm(config)
    },

    sellWelfareTool (row, text) {
      let vm = this
      let config = {
        title: text + '道具',
        content: '您确定要' + text + '' + row.toolName + '道具吗',
        loading: true,
        onOk: function () {
          let _this = this
          vm.handleIsSellWelfareTool(
            {
              toolId: row.toolIdt,
              isSell: row.isSell
            }
          ).then(res => {
            if (res.code === 20000) {
              vm.$Message.success(text + '成功')
              vm.$Modal.remove()
              vm.init()
            } else {
              vm.$Message.error(res.msg)
              _this.buttonLoading = false
            }
          })
        }
      }
      this.$Modal.confirm(config)
    },
    // 修改道具
    editWelfareTool (row) {
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '修改福利值道具'),
            h(suWelfareTool, {
              ref: 'suWelfareTool',
              props: {
                setData: row
              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.suWelfareTool
          obj.checkForm().then(res => {
            if (res) {
              let { toolName, price, addWelfare, isSell, toolId } = obj.getData
              // 发送请求
              vm.handleSaveOrUpdateWelfareTool({
                toolName,
                price,
                addWelfare,
                isSell,
                toolId
              }).then(res => {
                debugger
                if (res.code === 20000) {
                  vm.$Message.success('修改成功！')
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
    init () {
      this.tableLoading = true
      this.tableDataList = []
      this.handlequeryBusinessDetails({ ...this.reqBase }).then(res => {
        this.tableLoading = false
        if (res.code === 20000) {
          this.tableDataList = res.data.data || []
          this.getPageTotal = res.data.totalCount
        } else {
          this.tableDataList = []
          this.getPageTotal = 0
        }
      })
    },
    /**
       * 撤销锁仓
       * @param row
       */
    del (row) {
      let vm = this
      let config = {
        title: '撤销锁仓',
        content: '您确定要撤销这边锁仓吗？',
        loading: true,
        onOk: function () {
          let _this = this
          vm.handlecancelBeanLock({
            beanLockId: row.beanLockId
          }).then(res => {
            if (res.code === 20000) {
              vm.$Message.success('撤销锁仓成功！')
              vm.$Modal.remove()
              vm.init()
            } else {
              vm.$Message.error(res.msg)
              _this.buttonLoading = false
            }
          })
        }
      }
      this.$Modal.confirm(config)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
