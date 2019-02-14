/***申请提前退出列表管理****/
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

            </template>
        </packageTable>
    </div>
</template>

<script>
  import packageTableMixins from '../mixins/packageTableMixins'
  import { mapActions } from 'vuex'
  import { formatDate } from '@/libs/util'
  import addAngelInvestFudou from './components/addAngelInvestFudou'
  export default {
    name: 'logoutListManage',
    mixins: [packageTableMixins],
    data () {
      return {
        reqBase: {
          type: -1,
          currentPage: 1,
          length: 15
        },
        title: '申请提前退出列表过滤',
        getRuleType:[
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
          },
        ],
        getType:[
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
          },
        ],
        getStatus: [
          {
            label: '审核中',
            value: 0
          },
          {
            label: '审核完成',
            value: 1
          },
          {
            label: '审核失败',
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
          // {
          //   mothod: this.add,
          //   type: 'primary',
          //   icon: '',
          //   text: '添加锁仓'
          // }
        ],
        columnsheader: [
          {
            title: '用户昵称',
            key: 'nickname',
            align: 'center',
            render: (h, { row }) => {
              return h('div', row.beanLock.postUser.nickname)
            }
          },
          {
            title: '用户id',
            key: 'userId',
            align: 'center',
            render: (h, { row }) => {
              return h('div', row.beanLock.userId)
            }
          },
          {
            title: '手机号',
            key: 'phone',
            align: 'center',
            render: (h, { row }) => {
              return h('div', row.beanLock.postUser.phone)
            }
          },
          {
            title: '申请提前退出的数量 ',
            key: 'amount',
            align: 'center'
          },
          {
            title: '申请时间 ',
            key: 'createDate',
            align: 'center',
            render: (h, { row }) => {
              return h('div', formatDate('Y-m-d h:m:s', row.createDate))
            }
          },
          {
            title: '申请状态',
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
          },
          {
            title: '锁仓的数量 ',
            key: 'beanLock.amount',
            align: 'center',
            render: (h, { row }) => {
              return h('div', row.beanLock.amount);
            }
          },
          {
            title: '冻结的数量 ',
            key: 'beanLock.freezeAmount',
            align: 'center',
            render: (h, { row }) => {
              return h('div', row.beanLock.freezeAmount);
            }
          },
          {
            title: '完成锁仓的数量 ',
            key: 'beanLock.finishAmount',
            align: 'center',
            render: (h, { row }) => {
              return h('div', row.beanLock.finishAmount);
            }
          },
          {
            title: '锁仓时间',
            key: 'beanLock.createDate',
            align: 'center',
            render: (h, { row }) => {
              return h('div', formatDate('Y-m-d h:m:s', row.beanLock.createDate))
            }
          },
          {
            title: '锁仓类型',
            key: 'beanLock.ruleType',
            align: 'center',
            render:(h,{row})=>{
              let result="";
              for(let i=0;i<this.getRuleType.length;i++){
                let list=this.getRuleType[i];
                if(list.value===row.beanLock.ruleType){
                  result=list.label;
                  break;
                }
              }
              return h('div',result);
            }
          },
          {
            title: '释放规则',
            key: 'beanLock.ruleValue',
            align: 'center',
            render:(h,{row})=>{
              let result="";
              if(row.beanLock.ruleValue==0){
                result=row.beanLock.ruleValue+"天后一次性释放";
              }else if(row.beanLock.ruleValue==1){
                result=row.beanLock.ruleValue+"个月释放";
              }else if(row.beanLock.ruleValue==2){
                let temp=row.beanLock.ruleValue.split(",");
                result=temp[0]+"天到期，"+temp[1]+"个月释放完";
              }
              return h('div',result);
            }
          },
          {
            title: '类型',
            key: 'beanLock.type',
            align: 'center',
            render:(h,{row})=>{
              let result="";
              for(let i=0;i<this.getType.length;i++){
                let list=this.getType[i];
                if(list.value===row.beanLock.type){
                  result=list.label;
                  break;
                }
              }
              return h('div',result);
            }
          },
          {
            title: '状态',
            key: 'beanLock.status',
            align: 'center',
            render:(h,{row})=>{
              let result="";
              for(let i=0;i<this.getStatus.length;i++){
                let list=this.getStatus[i];
                if(list.value===row.beanLock.status){
                  result=list.label;
                  break;
                }
              }
              return h('div',result);
            }
          },
          {
            title: '操作',
            key: '',
            align: 'center',
            width:100,
            fixed: 'right',
            render: (h, { row }) => {
              let vm = this;
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: function () {
                      vm.update(row)
                    }
                  }
                }, '更新')
              ])
            }
          }
        ]
      }
    },
    methods: {
      ...mapActions([
        'handlequeryAngelQuitRecords',
        "handleupdateAngelQuitRecord",//添加锁仓
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
        let vm = this;
        let config = {
          loading: true,
          render: (h) => {
            return h('div', [
              h('h3', '添加锁仓记录'),
              h(addAngelInvestFudou, {
                ref: 'addAngelInvestFudou',
                props: {
                  getRuleType:vm.getRuleType,
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addAngelInvestFudou;
            obj.checkForm().then(res => {
              if (res) {
                let getData = obj.getData;
                // 发送请求
                vm.handlesaveBeanLock({
                  ...getData
                }).then(res => {
                  if (res.code === 20000) {
                    vm.$Message.success('添加锁仓记录成功！');
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
      resetConditions () {
        this.startDate = null
        this.endDate = null
        this.filter_form = {
          phone: null,
          startDate: null,
          endDate: null,
          nickName: null,
          ruleType:-1,
          type:-1
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
        this.handlequeryAngelQuitRecords({ ...this.reqBase }).then(res => {
          this.tableLoading = false;
          if (res.code === 20000) {
            this.tableDataList = res.data.data;
            this.getPageTotal = res.data.totalCount;
          } else {
            this.tableDataList = [];
            this.getPageTotal = 0
          }
        })
      },
      /**
       * 更新提前退出审核状态
       * @param row
       */
      update(row){
        let vm=this;
        let config={
          title:'更新提前退出审核状态',
          content:"您确定更新提前退出审核状态吗？",
          loading:true,
          onOk:function(){
            let _this=this;
            vm.handleupdateAngelQuitRecord({
              recordId:row.beanLockId,
              status:row.status
            }).then(res=>{
              if (res.code === 20000) {
                vm.$Message.success('更新成功！');
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
    mounted () {
      this.init()
    },
    created () {

    }
  }
</script>

<style scoped>

</style>

