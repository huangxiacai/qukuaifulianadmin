<!--订单管理-->
<template>
  <div style="position:relative;">
    <searchPanel :title="title"
                 @search="onSearch(filter_form)"
                 ref="filterBase"
                 @reset="resetConditions"
                 :isReset="true">
      <Form slot="formContent" inline class="ivu-row">
        <FormItem label="用户手机号:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.phone" type="text" icon="iphone"
                 placeholder="请填写用户手机号"></Input>
        </FormItem>
        <FormItem label="状态:" class="ivu-col ivu-col-span-6 m-b-10">
          <Select v-model="filter_form.status" placeholder="请选择状态">
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
      :showSlotHeader="false"
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
  </div>
</template>

<script>
import packageTableMixins from '../mixins/packageTableMixins'
import { formatDate } from '../../../libs/util'
import { mapActions } from 'vuex'
import changeOrderStatus from './component/changeOrderStatus'
export default {
  name: 'orderManage',
  mixins: [packageTableMixins],
  data () {
    return {
      title: '订单管理过滤',
      deliverGoodsStatus: [
        {
          label: '待发货',
          value: 1
        },
        {
          label: '待收货',
          value: 2
        },
        {
          label: '已发货',
          value: 3
        }
      ],
      getStatus: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '福豆',
          value: 1
        },
        {
          label: '微信',
          value: 2
        }
      ],
      reqBase: {// 请求的base参数
        currentPage: 1,
        length: 15,
        status:-1,
        payType:-1
      },
      filter_form: {
        phone: null,
        status: -1
      },
      headBtnList: [
      ],
      columnsheader: [
        {
          title: '订单号',
          key: 'orderId',
          align: 'center',
          fixed: 'left',
          width: 150
        },
        {
          title: '用户昵称',
          key: 'nickname',
          align: 'center',
          width: 100,
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
          title: '手机号',
          key: 'phone',
          width: 100,
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.postUser.phone)
          }
        },
        {
          title: '支付类型',
          key: 'payType',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            let result = ''
            let vm = this
            debugger
            for (let i = 0; i < vm.getStatus.length; i++) {
              let list = vm.getStatus[i]
              if (list.value == row.payType) {
                result = list.label
                break
              }
            }
            return h('div', result)
          }
        },
        {
          title: '订单总价格',
          key: 'orderAmmount',
          width: 100,
          align: 'center'
        },
        {
          title: '快递单号',
          width: 100,
          key: 'expressNo',
          align: 'center'
        },
        {
          title: '发货状态',
          key: 'status',
          width: 100,
          align: 'center',
          render: (h, { row }) => {
            let vm = this
            let result = ''
            for (let i = 0; i < vm.deliverGoodsStatus.length; i++) {
              let list = vm.deliverGoodsStatus[i]
              if (list.value == row.payType) {
                result = list.label
                break
              }
            }
            return h('div', result)
          }
        },
        {
          title: '收货地址',
          key: 'deliveryAddress',
          width: 100,
          align: 'center'
        },
        {
          title: '收货时间',
          key: 'deliveryDate',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d', row.deliveryDate))
          }
        },
        {
          title: '订单创建时间',
          key: 'createDate',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d', row.createDate))
          }
        },
        {
          title: '快递费',
          width: 100,
          key: 'freightAmmount',
          align: 'center'
        },
        {
          title: '购买的商品数量',
          key: 'num',
          width: 100,
          align: 'center'
        },
        {
          title: '收货人姓名',
          key: 'name',
          width: 100,
          align: 'center'
        },
        {
          title: '收货人手机号',
          key: 'phone',
          width: 100,
          align: 'center'
        },
        {
          title: '商品名称',
          key: 'productName',
          width: 100,
          align: 'center'
        },
        {
          title: '商品Logo',
          key: 'logo',
          width: 100,
          align: 'center',
          render: (h, { row }) => {
            return h('img', {
              attr: {
                src: row.logo,
                style: 'width:50px;height:50px'
              }
            })
          }
        },
        {
          title: '购买商品添加的福利值',
          key: 'addWelfare',
          width: 100,
          align: 'center'
        },
        {
          title: '单个商品价格',
          key: 'productAmount',
          width: 100,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 120,
          render: (h, { row }) => {
            let vm = this
            return h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: function () {
                  vm.editOrderStatus(row)
                }
              }
            }, '修改订单状态')
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handlequeryOrders',
      'handleupdateOrderStatus'
    ]),

    showSearchPanel () {
      this.$refs.filterBase.init()
    },

    // 重置搜索条件
    resetConditions () {
      this.filter_form = {
        phone: null,
        status: -1
      }
    },
    /**
       * 改变订单状态
       * @param userid
       * @param state
       */
    editOrderStatus (row) {
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '修改订单状态'),
            h(changeOrderStatus, {
              ref: 'changeOrderStatus',
              props: {
                setData: { status: row.status, orderId: row.orderId }
              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.changeOrderStatus
          obj.checkForm().then(res => {
            if (res) {
              let getData = obj.getData
              // 发送请求
              vm.handleupdateOrderStatus({
                ...getData
              }).then(res => {
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
      this.handlequeryOrders({ ...this.reqBase }).then(res => {
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
