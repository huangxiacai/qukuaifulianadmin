
/***用户转账记录****/
<template>
  <div style="position:relative;">
    <searchPanel :title="title"
                 @search="onSearch(filter_form)"
                 ref="filterBase"
                 @reset="resetConditions"
                 :isReset="true">
      <Form slot="formContent" inline class="ivu-row">
        <FormItem label="转账者昵称:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.sendNickName" type="text"
                 placeholder="请填写转账者昵称"></Input>
        </FormItem>
        <FormItem label="转账者手机号:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.sendPhone" :maxlength="11" type="text" icon="iphone"
                 placeholder="请填写转账者手机号"></Input>
        </FormItem>
        <FormItem label="接收者昵称:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.receiverNickName" type="text"
                 placeholder="请填写接收者昵称"></Input>
        </FormItem>
        <FormItem label="接收者手机号:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.receiverPhone" :maxlength="11" type="text" icon="iphone"
                 placeholder="请填写接收者手机号"></Input>
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
import { formatDate } from '@/libs/util'
import addAngelInvestFudou from './components/addAngelInvestFudou'
import exportConponents from '../comontents/exportConponents'
export default {
  name: 'angelInvestFudouManage',
  mixins: [packageTableMixins],
  data () {
    return {
      reqBase: {
        currentPage: 1,
        length: 15
      },
      title: 'transferRecord过滤',
      getRuleType: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '到期一次释放',
          value: 0
        },
        {
          label: '每个月释放',
          value: 1
        },
        {
          label: '到期后每个月释放',
          value: 2
        }
      ],
      getType: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '天使投资',
          value: 1
        },
        {
          label: '奖励福豆',
          value: 2
        }
      ],
      getStatus: [
        {
          label: '正常锁仓',
          value: 0
        },
        {
          label: '被后台撤销',
          value: 1
        }
      ],
      startDate: null,
      endDate: null,
      filter_form: {
        sendPhone: null,
        startDate: null,
        endDate: null,
        sendNickName: null,
        receiverPhone: null,
        receiverNickName: null
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
          title: '转账者昵称',
          key: 'sendUser.nickname',
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.sendUser.nickname)
          }
        },
        {
          title: '转账者id',
          key: 'sendUser.userId',
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.sendUser.userId)
          }
        },
        {
          title: '转账者手机号',
          key: 'sendUser.phone',
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.sendUser.phone)
          }
        },
        {
          title: '接收者昵称',
          key: 'receiverUser.nickname',
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.receiverUser.nickname)
          }
        },
        {
          title: '接收者id',
          key: 'receiverUser.userId',
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.receiverUser.userId)
          }
        },
        {
          title: '接收者手机号',
          key: 'receiverUser.phone',
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.receiverUser.phone)
          }
        },
        {
          title: '转账金额 ',
          key: 'account',
          align: 'center'
        },
        {
          title: '转账时间',
          key: 'createDate',
          align: 'center',
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d H:i:s', row.createDate))
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handlequeryAccountTransferRecords'
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
    add () {
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '添加锁仓记录'),
            h(addAngelInvestFudou, {
              ref: 'addAngelInvestFudou',
              props: {
                getRuleType: vm.getRuleType,
                getType: vm.getType
              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.addAngelInvestFudou
          obj.checkForm().then(res => {
            if (res) {
              let getData = obj.getData
              let ruleValue = ''
              if (getData.ruleType === 2) {
                ruleValue = getData.ruleValue0 + ',' + getData.ruleValue1
              } else {
                ruleValue = getData.ruleValue
              }
              // 发送请求
              vm.handlesaveBeanLock({
                userId: getData.userId,
                amount: getData.amount,
                ruleType: getData.ruleType,
                ruleValue: ruleValue,
                type: getData.type
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
    // 重置搜索条件
    resetConditions () {
      this.startDate = null
      this.endDate = null
      this.filter_form = {
        sendPhone: null,
        startDate: null,
        endDate: null,
        sendNickName: null,
        receiverPhone: null,
        receiverNickName: null
      }
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
              vm.handlequeryAccountTransferRecords({
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
                      'sendUser.nickname': list.sendUser.nickname,
                      'sendUser.userId': list.sendUser.userId,
                      'sendUser.phone': list.sendUser.phone,
                      'receiverUser.nickname': list.receiverUser.nickname,
                      'receiverUser.userId': list.receiverUser.userId,
                      'receiverUser.phone': list.receiverUser.phone,
                      account: list.account,
                      createDate: formatDate('Y-m-d H:i:s', list.createDate)
                    })
                  }
                  vm.$Message.success('导出成功！')
                  vm.$Modal.remove()
                  vm.$refs.contentBaseRef.$refs.packageTable.exportCsv({
                    filename: 'transferRecord',
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
      this.handlequeryAccountTransferRecords({ ...this.reqBase }).then(res => {
        this.tableLoading = false
        if (res.code === 20000) {
          this.tableDataList = res.data.data
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
    this.init()
  },
  created () {

  }
}
</script>

<style scoped>

</style>
