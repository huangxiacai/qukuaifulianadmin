/***天使投资福豆管理****/
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
                <FormItem label="锁仓规则:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Select v-model="filter_form.ruleType" placeholder="请选择锁仓规则">
                        <Option v-for="item in getRuleType" :value="item.value"
                                :key="item.label">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="类型:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Select v-model="filter_form.type" placeholder="请选择类型">
                        <Option v-for="item in getType" :value="item.value"
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
import addAngelInvestFudou from './components/addAngelInvestFudou'
import exportConponents from '../comontents/exportConponents'
export default {
  name: 'angelInvestFudouManage',
  mixins: [packageTableMixins],
  data () {
    return {
      reqBase: {
        type: -1,
        currentPage: 1,
        length: 15,
        ruleType: -1
      },
      title: '天使投资福豆管理过滤',
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
        phone: null,
        startDate: null,
        endDate: null,
        nickName: null,
        ruleType: -1,
        type: -1
      },
      headBtnList: [
        {
          mothod: this.add,
          type: 'primary',
          icon: '',
          text: '添加锁仓'
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
          title: '正在锁仓的数量 ',
          key: 'amount',
          align: 'center'
        },
        {
          title: '冻结的数量 ',
          key: 'freezeAmount',
          align: 'center'
        },
        {
          title: '已经释放的数量 ',
          key: 'finishAmount',
          align: 'center'
        },
        {
          title: '产生时间',
          key: 'createDate',
          align: 'center',
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d H:i:s', row.createDate))
          }
        },
        {
          title: '锁仓类型',
          key: 'ruleType',
          align: 'center',
          render: (h, { row }) => {
            let result = ''
            for (let i = 0; i < this.getRuleType.length; i++) {
              let list = this.getRuleType[i]
              if (list.value === row.ruleType) {
                result = list.label
                break
              }
            }
            return h('div', result)
          }
        },
        {
          title: '释放规则',
          key: 'ruleValue',
          align: 'center',
          render: (h, { row }) => {
            let result = ''
            if (row.ruleType == 0) {
              result = row.ruleValue + '天后一次性释放'
            } else if (row.ruleType == 1) {
              result = row.ruleValue + '个月释放'
            } else if (row.ruleType == 2) {
              let temp = row.ruleValue.split(',')
              result = temp[0] + '天到期，' + temp[1] + '个月释放完'
            }
            return h('div', result)
          }
        },
        {
          title: '类型',
          key: 'type',
          align: 'center',
          render: (h, { row }) => {
            let result = ''
            for (let i = 0; i < this.getType.length; i++) {
              let list = this.getType[i]
              if (list.value === row.type) {
                result = list.label
                break
              }
            }
            return h('div', result)
          }
        },
        {
          title: '状态',
          key: 'status',
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
          title: '操作',
          key: '',
          align: 'center',
          width: 100,
          fixed: 'right',
          render: (h, { row }) => {
            let vm = this
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: function () {
                    vm.del(row)
                  }
                }
              }, '撤销锁仓')
            ])
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handlequeryBeanLocks',
      'handlesaveBeanLock', // 添加锁仓
      'handlecancelBeanLock'// 撤销锁仓
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
        phone: null,
        startDate: null,
        endDate: null,
        nickName: null,
        ruleType: -1,
        type: -1
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
      let temp=[55,56,57,58,59,60,61,62,64];
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
              vm.handlequeryBeanLocks({
                type: -1,
                ruleType: -1,
                currentPage: 1,
                length: vm.getPageTotal+temp.length,
                startDate,
                endDate
              }).then(res => {
                if (res.code === 20000) {
                  let allData = res.data.data
                  let _arr = [];

                  for (let i in allData) {
                    let list = allData[i];
                    if(temp.indexOf(list.beanLockId)>-1){
                      console.log(list);
                    }else{
                      _arr.push({
                        nickname: list.postUser.nickname,
                        userId: list.userId,
                        phone: list.postUser.phone,
                        amount: list.amount,
                        freezeAmount: list.freezeAmount,
                        finishAmount: list.finishAmount,
                        createDate: formatDate('Y-m-d H:i:s', list.createDate),
                        ruleType: vm.getRuleTypeLabel(list.ruleType),
                        ruleValue: vm.getRuleValueLabel(list.ruleType, list.ruleValue),
                        type: vm.getTypeLabel(list.type)
                      })
                    }
                  }
                  vm.$Message.success('导出成功！');
                  vm.$Modal.remove()
                  vm.$refs.contentBaseRef.$refs.packageTable.exportCsv({
                    filename: 'angelInvestFudouManage',
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
      this.handlequeryBeanLocks({ ...this.reqBase }).then(res => {
        this.tableLoading = false;
        this.tableDataList=[];
        if (res.code === 20000) {
          let arr=[];
          let temp=[55,56,57,58,59,60,61,62,64];
          for(let i in res.data.data||[]){
            let list=res.data.data[i];
            if(temp.indexOf(list.beanLockId)>-1){
            }else{
              arr.push(list);
            }
          }
          this.tableDataList = arr;
          this.getPageTotal = res.data.totalCount-temp.length;
        } else {
          this.tableDataList = [];
          this.getPageTotal = 0
        }
      })
    },
    getRuleTypeLabel (value) {
      let result = ''
      for (let i = 0; i < this.getRuleType.length; i++) {
        let list = this.getRuleType[i]
        if (list.value === value) {
          result = list.label
          break
        }
      }
      return result
    },
    getTypeLabel (value) {
      let result = ''
      for (let i = 0; i < this.getType.length; i++) {
        let list = this.getType[i]
        if (list.value === value) {
          result = list.label
          break
        }
      }
      return result
    },
    getRuleValueLabel (ruleType, ruleValue) {
      let result = ''
      if (ruleType == 0) {
        result = ruleValue + '天后一次性释放'
      } else if (ruleType == 1) {
        result = ruleValue + '个月释放'
      } else if (ruleType == 2) {
        let temp = ruleValue.split(',')
        result = temp[0] + '天到期，' + temp[1] + '个月释放完'
      }
      return result
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
