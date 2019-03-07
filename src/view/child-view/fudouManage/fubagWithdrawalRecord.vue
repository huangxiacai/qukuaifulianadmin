/***法币福袋提现记录****/
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
          <DatePicker v-model="startDate" :transfer="true" type="date" placeholder="请选择开始时间" @on-change="startDateChange" style="width: 100%"></DatePicker>
        </FormItem>
        <FormItem label="结束时间:" class="ivu-col ivu-col-span-6 m-b-10">
          <DatePicker v-model="endDate" :transfer="true" type="date" placeholder="请选择结束时间" @on-change="endDateChange" style="width: 100%"></DatePicker>
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
  import { mapActions } from 'vuex'
  import { formatDate } from '@/libs/util'
  import editfubagWithdrawal from './components/editfubagWithdrawal'
  export default {
    name: 'fubagWithdrawalRecord',
    mixins: [packageTableMixins],
    data () {
      return {
        reqBase: {
          currentPage: 1,
          length: 15
        },
        title: '法币福袋提现记录过滤',
        getStatus:[
          {
            value:-1,
            label:'全部',
          },
          {
            value:0,
            label:'审核中',
          },
          {
            value:1,
            label:'提现完成',
          },
          {
            value:2,
            label:'审核失败',
          }
        ],
        getType:[
          {
            value:1,
            label:'支付宝',
          },
          {
            value:2,
            label:'银行卡',
          }
        ],
        startDate: null,
        endDate: null,
        filter_form: {
          startDate: null,
          endDate: null,
          phone:null,
          nickName:null,
          status:-1
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
            width:150,
            render:(h,{row})=>{
              return h('div',row.postUser.nickname)
            }
          },
          {
            title: '用户id',
            key: 'userId',
            align: 'center',
          },
          {
            title: '用户手机号',
            key: 'postUser.phone',
            align: 'center',
            render:(h,{row})=>{
              return h('div',row.postUser.phone)
            }
          },
          {
            title: '提现金额',
            key: 'withdrawMoney',
            align: 'center',
          },
          {
            title: '到账金额',
            key: 'transferMoney',
            align: 'center',
          },
          {
            title: '提现申请时间',
            key: 'createDate',
            align: 'center',
            render: (h, { row }) => {
              return h('div', formatDate('Y-m-d H:i:s', row.createDate))
            }
          },
          {
            title: '提现方式',
            key: 'type',
            align: 'center',
            render:(h,{row})=>{
              let vm=this;
              let result="";
              for(let i=0;i<this.getType.length;i++){
                let list=this.getType[i];
                if(row.type===list.value){
                  result=list.label;
                  break;
                }
              }
              return h('div',result)
            }
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render:(h,{row})=>{
              let vm=this;
              let result="";
              for(let i=0;i<this.getStatus.length;i++){
                let list=vm.getStatus[i];
                if(row.status===list.value){
                  result=list.label;
                  break;
                }
              }
              return h('div',result)
            }
          },
          {
            title: '操作',
            key: '',
            align: 'center',
            fixed:'right',
            width:100,
            render: (h, { row }) => {
              let vm = this;
              if(row.status!=1 ||row.status!=2){
                return h('Button', {
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
              }

            }
          }
        ]
      }
    },
    methods: {
      ...mapActions([
        'handlequeryWithdrawLegals',//分页
        'handleupdateWithdrawLegal'//修改提现记录
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
              h('h3', '添加福豆价格'),
              h(addfudouPrice, {
                ref: 'addfudouPrice',
                props: {
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addfudouPrice;
            obj.checkForm().then(res => {
              if (res) {
                let {beanPrice,createDate} = obj.getData;
                // 发送请求
                vm.handlesaveOrUpdateBeanPrice({
                  beanPrice,
                  createDate
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
      edit(row){
        let vm = this;
        let config = {
          loading: true,
          render: (h) => {
            return h('div', [
              h('h3', '修改法币提现'),
              h(editfubagWithdrawal, {
                ref: 'editfubagWithdrawal',
                props: {
                  _vm:vm,
                  setData:row,
                  getType:vm.getType,
                  getStatus:vm.getStatus
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.editfubagWithdrawal;
            obj.checkForm().then(res => {
              if (res) {
                let {withdrawId,withdrawMoney,transferMoney,status,type}= obj.getData;
                // 发送请求
                vm.handleupdateWithdrawLegal({
                  withdrawId,
                  withdrawMoney,
                  transferMoney,
                  status,
                  type
                }).then(res => {
                  if (res.code === 20000) {
                    vm.$Message.success('修改法币提现成功！');
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
        this.startDate = null;
        this.endDate = null;
        this.filter_form = {
          startDate: null,
          endDate: null,
          phone:null,
          nickName:null,
          status:-1
        }
      },

      init () {
        this.tableLoading = true;
        this.handlequeryWithdrawLegals({ ...this.reqBase }).then(res => {
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
       * 撤销锁仓
       * @param row
       */
      del(row){
        let vm=this;
        let config={
          title:'撤销锁仓',
          content:"您确定要撤销这边锁仓吗？",
          loading:true,
          onOk:function(){
            let _this=this;
            vm.handlecancelBeanLock({
              beanLockId:row.beanLockId
            }).then(res=>{
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
    mounted () {
      this.init()
    },
    created () {

    }
  }
</script>

<style scoped>

</style>

