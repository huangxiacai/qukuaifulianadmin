/***福豆转换记录****/
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
        <FormItem label="原始类型:" class="ivu-col ivu-col-span-6 m-b-10">
          <Select v-model="filter_form.originBeanTypeId" :transfer="true" placeholder="请选择原始类型">
            <Option v-for="item in getType" :value="item.value"
                    :key="item.label">{{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="转换类型:" class="ivu-col ivu-col-span-6 m-b-10">
          <Select v-model="filter_form.transferBeanTypeId" :transfer="true" placeholder="请选择转换类型">
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

      </template>
    </packageTable>
  </div>
</template>

<script>
  import packageTableMixins from '../mixins/packageTableMixins'
  import { mapActions } from 'vuex'
  import { formatDate } from '@/libs/util'
  import addfudouPrice from './components/addfudouPrice'
  export default {
    name: 'fudouConverRecord',
    mixins: [packageTableMixins],
    data () {
      return {
        reqBase: {
          currentPage: 1,
          length: 15
        },
        title: '福豆转换记录过滤',
        getType:[
          {
            value:1,
            label:'随身福袋',
          },
          {
            value:2,
            label:'福报福袋',
          },
          {
            value:3,
            label:'社区福袋',
          },
          {
            value:4,
            label:'法币福袋',
          },
          {
            value:5,
            label:'可解锁福豆',
          },
          {
            value:6,
            label:'福利值',
          },
          {
            value:7,
            label:'活跃度',
          }
        ],
        startDate: null,
        endDate: null,
        filter_form: {
          startDate: null,
          endDate: null,
          phone:null,
          nickName:null,
          originBeanTypeId:null,
          transferBeanTypeId:null
        },
        headBtnList: [

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
            title: '原始类型福袋名称',
            key: 'originBeanTypeName',
            align: 'center',
          },
          {
            title: '原始类型福袋数量',
            key: 'originAccount',
            align: 'center',
          },
          {
            title: '转换类型福袋数量',
            key: 'transferAccount',
            align: 'center',
          },
          {
            title: '时间',
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
        'handlequeryBeanTransferRecords'
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
          nickName:null,
          originBeanTypeId:null,
          transferBeanTypeId:null
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
        this.handlequeryBeanTransferRecords({ ...this.reqBase }).then(res => {
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

