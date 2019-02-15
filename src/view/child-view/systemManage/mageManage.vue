/***法师管理****/
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
                    <Input v-model="filter_form.phone" :maxlength="11" type="text" icon="iphone"
                           placeholder="请填写用户手机号"></Input>
                </FormItem>
                <FormItem label="开始时间:" class="ivu-col ivu-col-span-6 m-b-10">
                    <DatePicker v-model="startDate" :transfer="true" type="date" placeholder="请选择开始时间"
                                @on-change="startDateChange" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem label="结束时间:" class="ivu-col ivu-col-span-6 m-b-10">
                    <DatePicker v-model="endDate" :transfer="true" type="date" placeholder="请选择结束时间"
                                @on-change="endDateChange" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem label="状态:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Select v-model="filter_form.status" :transfer="true" placeholder="请选择状态">
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

            </template>
        </packageTable>
    </div>
</template>

<script>
  import packageTableMixins from '../mixins/packageTableMixins'
  import {mapActions} from 'vuex'
  import {formatDate} from '@/libs/util'
  import addMage from './components/addMage'

  export default {
    name: 'mageManage',
    mixins: [packageTableMixins],
    data() {
      return {
        reqBase: {},
        title: '法师管理过滤',
        getStatus: [
          {
            value: -1,
            label: '全部',
          },
          {
            value: 0,
            label: '审核中',
          },
          {
            value: 1,
            label: '提现完成',
          },
          {
            value: 2,
            label: '审核失败',
          }
        ],
        getType: [
          {
            value: 1,
            label: '支付宝',
          },
          {
            value: 2,
            label: '银行卡',
          }
        ],
        startDate: null,
        endDate: null,
        filter_form: {
          startDate: null,
          endDate: null,
          phone: null,
          nickName: null,
          status: -1
        },
        headBtnList: [
          {
            mothod: this.add,
            type: 'primary',
            icon: '',
            text: '添加法师'
          }
        ],
        columnsheader: [
          {
            title: '法师昵称',
            key: 'rabbiName',
            align: 'center',
            width: 150,
          },
          {
            title: '法师周期',
            key: 'time',
            align: 'center',
          },
          {
            title: '法师价格',
            key: 'price',
            align: 'center',
          },
          {
            title: '法师LOGO图',
            key: 'logo',
            align: 'center',
          },
          {
            title: '是否上架',
            key: 'isSell',
            align: 'center',
            render: (h, {row}) => {
              let result = "";
              if (row.isSell === 1) {
                result = "是"
              } else if (row.isSell === 2) {
                result = "否"
              }
              return h('div', result);
            }
          },
          {
            title: '时间',
            key: 'createDate',
            align: 'center',
            render: (h, {row}) => {
              return h('div', formatDate('Y-m-d', row.createDate))
            }
          },
          {
            title: '最终回馈的福豆',
            key: 'finalFeedback',
            align: 'center',
          },
          {
            title: '一级分销福豆',
            key: 'oneGenerateBean',
            align: 'center',
          },
          {
            title: '二级分销福豆',
            key: 'twoGenerateBean',
            align: 'center',
          },
          {
            title: '操作',
            key: '',
            align: 'center',
            fixed: 'right',
            width: 150,
            render: (h, {row}) => {
              let vm = this;
              let result = "";
              if (row.isSell === 1) {
                result = "下架"
              } else if (row.isSell === 2) {
                result = "上架"
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: function () {
                      vm.changeMageStatus(row, result)
                    }
                  }
                }, result),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: function () {
                      vm.edit(row)
                    }
                  }
                }, '修改')
              ]);
            }
          }
        ]
      }
    },
    methods: {
      ...mapActions([
        'handlequeryRabbis',//分页
        'handlesaveOrUpdateRabbi',//修改提现记录
        'handleisSellRabbi'//上下架
      ]),
      //
      showSearchPanel() {
        this.$refs.filterBase.init()
      },
      startDateChange(value) {
        this.$set(this.filter_form, 'startDate', value)
      },
      endDateChange(value) {
        this.$set(this.filter_form, 'endDate', value)
      },
      add() {
        let vm = this;
        let config = {
          loading: true,
          width:500,
          render: (h) => {
            return h('div', [
              h('h3', '添加法师'),
              h(addMage, {
                ref: 'addMage',
                props: {
                  _vm:vm
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addMage;
            obj.checkForm().then(res => {
              if (res) {
                let getData = obj.getData;
                // 发送请求
                vm.handlesaveOrUpdateRabbi({
                  ...getData
                }).then(res => {
                  if (res.code === 20000) {
                    vm.$Message.success('添加法师成功！');
                    vm.$Modal.remove();
                    vm.init()
                  } else {
                    vm.$Message.error(res.msg);
                    _this.buttonLoading = false
                  }
                })
              } else {
                _this.buttonLoading = false
              }
            })
          }
        };
        this.$Modal.confirm(config)
      },
      edit(row) {
        let vm = this;
        let config = {
          loading: true,
          width:500,
          render: (h) => {
            return h('div', [
              h('h3', '修改法师'),
              h(addMage, {
                ref: 'addMage',
                props: {
                  _vm: vm,
                  setData: row,
                  getType: vm.getType,
                  getStatus: vm.getStatus
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addMage;
            obj.checkForm().then(res => {
              if (res) {
                let {withdrawId, withdrawMoney, transferMoney, status, walletAddress} = obj.getData;
                // 发送请求
                vm.handlesaveOrUpdateRabbi({
                  withdrawId,
                  withdrawMoney,
                  transferMoney,
                  status,
                  walletAddress
                }).then(res => {
                  if (res.code === 20000) {
                    vm.$Message.success('修改法师成功！');
                    vm.$Modal.remove();
                    vm.init()
                  } else {
                    vm.$Message.error(res.msg);
                    _this.buttonLoading = false
                  }
                })
              } else {
                _this.buttonLoading = false
              }
            })
          }
        };
        this.$Modal.confirm(config)
      },
      // 重置搜索条件
      resetConditions() {
        this.startDate = null;
        this.endDate = null;
        this.filter_form = {
          startDate: null,
          endDate: null,
          phone: null,
          nickName: null,
          status: -1
        }
      },

      init() {
        this.tableLoading = true;
        this.handlequeryRabbis({...this.reqBase}).then(res => {
          this.tableLoading = false;
          if (res.code === 20000) {
            this.tableDataList = res.data;
            //this.getPageTotal = res.data.totalCount;
          } else {
            this.tableDataList = [];
            this.getPageTotal = 0
          }
        })
      },
      //上架或者下载
      changeMageStatus(row, title) {
        debugger
        let vm = this;
        let config = {
          title: title + '法师',
          content: "您确定要" + title + "法师吗？",
          loading: true,
          onOk: function () {
            let _this = this;
            vm.handleisSellRabbi(
              {
                rabbiId: row.rabbiId,
                isSell: row.isSell
              }
            ).then(res => {
              if (res.code === 20000) {
                vm.$Message.success(title + '法师成功！');
                vm.$Modal.remove();
                vm.init()
              } else {
                vm.$Message.error(res.msg);
                _this.buttonLoading = false
              }
            });
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 撤销锁仓
       * @param row
       */
      del(row) {
        let vm = this;
        let config = {
          title: '撤销锁仓',
          content: "您确定要撤销这边锁仓吗？",
          loading: true,
          onOk: function () {
            let _this = this;
            vm.handlecancelBeanLock({
              beanLockId: row.beanLockId
            }).then(res => {
              if (res.code === 20000) {
                vm.$Message.success('撤销锁仓成功！');
                vm.$Modal.remove();
                vm.init()
              } else {
                vm.$Message.error(res.msg)
                _this.buttonLoading = false
              }
            });
          }
        };
        this.$Modal.confirm(config);
      }

    },
    mounted() {
      this.init()
    },
    created() {

    }
  }
</script>

<style scoped>

</style>

