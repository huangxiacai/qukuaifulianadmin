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
                <FormItem label="领取状态:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Select v-model="filter_form.status" placeholder="请选择领取状态">
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
  import { mapActions } from 'vuex'
  import { formatDate } from '@/libs/util'
  export default {
    name: 'angelInvestFudouManage',
    mixins: [packageTableMixins],
    data () {
      return {
        reqBase: {
          type: -1,
          currentPage: 1,
          length: 15
        },
        title: '天使投资福豆管理过滤',
        getRuleType:[
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
          },
        ],
        getType:[
          {
            label: '天使投资',
            value: 1
          },
          {
            label: '奖励福豆',
            value: 2
          },
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
          status: -1,
          startDate: null,
          endDate: null,
          nickName: null
        },
        headBtnList: [

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
              return h('div', formatDate('Y-m-d h:m:s', row.createDate))
            }
          },
          {
            title: '锁仓类型',
            key: 'ruleType',
            align: 'center',
            render:(h,{row})=>{
              let result="";
              for(let i=0;i<this.getRuleType.length;i++){
                let list=this.getRuleType[i];
                if(list.value===row.ruleType){
                  result=list.label;
                  break;
                }
              }
              return h('div',result);
            }
          },
          {
            title: '类型',
            key: 'type',
            align: 'center',
            render:(h,{row})=>{
              let result="";
              for(let i=0;i<this.getType.length;i++){
                let list=this.getType[i];
                if(list.value===row.type){
                  result=list.label;
                  break;
                }
              }
              return h('div',result);
            }
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
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
          }
        ]
      }
    },
    methods: {
      ...mapActions([
        'handlequeryBeanLocks'
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
              h('h3', '添加福利值道具'),
              h(suWelfareTool, {
                ref: 'suWelfareTool',
                props: {

                }
              })
            ])
          },
          onOk: function () {
            let _this = this
            let obj = this.$refs.suWelfareTool
            obj.checkForm().then(res => {
              if (res) {
                let getData = obj.getData
                // 发送请求
                vm.handleSaveOrUpdateWelfareTool({
                  ...getData
                }).then(res => {
                  debugger
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
      // 重置搜索条件
      resetConditions () {
        this.startDate = null
        this.endDate = null
        this.filter_form = {
          phone: null,
          status: -1,
          startDate: null,
          endDate: null,
          nickName: null
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
        };
        this.$Modal.confirm(config)
      },
      init () {
        this.tableLoading = true;
        this.handlequeryBeanLocks({ ...this.reqBase }).then(res => {
          this.tableLoading = false;
          if (res.code === 20000) {
            this.tableDataList = res.data.data;
            this.getPageTotal = res.data.totalCount;
          } else {
            this.tableDataList = [];
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

