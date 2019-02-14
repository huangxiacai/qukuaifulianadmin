/***二级分销记录****/
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
    name: 'secondaryDistributionRecord',
    mixins: [packageTableMixins],
    data () {
      return {
        reqBase: {
          currentPage: 1,
          length: 15
        },
        title: '二级分销记录过滤',
        getStatus:[
          {
            value:1,
            label:'用户已经达到上限',
          },
          {
            value:0,
            label:'正常到用户钱包',
          }
        ],
        getType:[
          {
            value:1,
            label:'领取每天福豆获取',
          },
          {
            value:2,
            label:'法师赐福获取',
          }
        ],
        startDate: null,
        endDate: null,
        filter_form: {
          startDate: null,
          endDate: null,
          phone:null,
          nickName:null
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
            key: 'user.nickname',
            align: 'center',
            width:150,
            render:(h,{row})=>{
              return h('div',row.user.nickname)
            }
          },
          {
            title: '用户id',
            key: 'userId',
            align: 'center',
          },
          {
            title: '用户手机号',
            key: 'user.phone',
            align: 'center',
            render:(h,{row})=>{
              return h('div',row.user.phone)
            }
          },
          {
            title: '分销获得福豆数量',
            key: 'distributeBeanNum',
            align: 'center',
          },
          {
            title: '出让时间',
            key: 'createDate',
            align: 'center',
            render: (h, { row }) => {
              return h('div', formatDate('Y-m-d h:m:s', row.createDate))
            }
          },
          {
            title: '分销类型',
            key: 'type',
            align: 'center',
            render:(h,{row})=>{
              let vm=this;
              let result="";
              for(let i=0;i<vm.getType.length;i++){
                let list=vm.getType[i];
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
              for(let i=0;i<vm.getStatus.length;i++){
                let list=vm.getStatus[i];
                if(row.status===list.value){
                  result=list.label;
                  break;
                }
              }
              return h('div',result)
            }
          },
        ]
      }
    },
    methods: {
      ...mapActions([
        'handlequeryDistributeRecords'
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
              h('h3', '修改福豆价格'),
              h(addfudouPrice, {
                ref: 'addfudouPrice',
                props: {
                  setData:row
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addfudouPrice;
            obj.checkForm().then(res => {
              if (res) {
                let {beanPrice,createDate,priceId} = obj.getData;
                // 发送请求
                vm.handlesaveOrUpdateBeanPrice({
                  beanPrice,
                  createDate,
                  priceId
                }).then(res => {
                  if (res.code === 20000) {
                    vm.$Message.success('修改锁仓记录成功！');
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
          nickName:null
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
        this.handlequeryDistributeRecords({ ...this.reqBase }).then(res => {
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

