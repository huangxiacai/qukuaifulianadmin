/***法师购买记录****/
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
                <FormItem label="法师名称:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Input v-model="filter_form.rabbiName"  type="text"
                           placeholder="请填写法师名称"></Input>
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
            value: 0,
            label: '正常',
          },
          {
            value: 1,
            label: '到期',
          },
          {
            value: 2,
            label: '删除',
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
          rabbiName:null,
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
            title: '用户昵称',
            key: 'postUser.nickname',
            align: 'center',
            width: 100,
            render:(h,{row})=>{
              return h('div',row.postUser.nickname);
            }
          },
          {
            title: '用户手机号',
            key: 'postUser.phone',
            align: 'center',
            width: 100,
            render:(h,{row})=>{
              return h('div',row.postUser.phone);
            }
          },
          {
            title: '用户id',
            key: 'userId',
            align: 'center',
          },
          {
            title: '法师名称',
            key: 'rabbi.rabbiName',
            align: 'center',
            render:(h,{row})=>{
              return h('div',row.rabbi.rabbiName);
            }
          },
          {
            title: '购买的法师数量',
            key: 'num',
            align: 'center'
          },
          {
            title: '单个法师回馈的数量',
            key: 'finalFeedback',
            align: 'center'
          },
          {
            title: '法师的周期',
            key: 'time',
            align: 'center',
          },
          {
            title: '法师的周期',
            key: 'time',
            align: 'center',
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h, {row}) => {
              let result = "";
              for(let i=0;i<this.getStatus.length;i++){
                let list=this.getStatus[i];
                if(list.value===row.status){
                  result=list.label;
                  break;
                }
              }
              return h('div', result);
            }
          },
          {
            title: '购买法师总共消费的福豆',
            key: 'consumeBean',
            align: 'center',
          },
          {
            title: '法师一级分销所获得的福豆',
            key: 'oneGenerateBean',
            align: 'center',
          },
          {
            title: '法师二级分销所获得的福豆',
            key: 'twoGenerateBean',
            align: 'center',
          },
          {
            title: '购买时间',
            key: 'createDate',
            align: 'center',
            render: (h, {row}) => {
              return h('div', formatDate('Y-m-d', row.createDate))
            }
          },
          {
            title: '操作',
            key: '',
            align: 'center',
            fixed: 'right',
            width: 150,
            render: (h, {row}) => {
              let vm = this;
              if(row.status===0){
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
                  }, '删除')
                ]);
              }

            }
          }
        ]
      }
    },
    computed:{
      //文件前缀
      fileImgPrefix(){
        let root=this.$config.imgUrl.pro;
        if(process.env.NODE_ENV !== 'production'){
          root=this.$config.imgUrl.dev;
        }
        return root;
      }
    },
    methods: {
      ...mapActions([
        'handlequeryUserRabbis',//分页
        'handledeleteUserRabbi',//del
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
                  setData: row
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addMage;
            obj.checkForm().then(res => {
              if (res) {
                let {
                  rabbiId,logo,finalFeedback,isSell,time,oneGenerateBean,twoGenerateBean,price,rabbiName
                } = obj.getData;
                // 发送请求
                vm.handlesaveOrUpdateRabbi({
                  rabbiId,logo,finalFeedback,isSell,time,oneGenerateBean,twoGenerateBean,price,rabbiName
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
          rabbiName:null,
        }
      },

      init() {
        this.tableLoading = true;
        this.handlequeryUserRabbis({...this.reqBase}).then(res => {
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
                isSell: title=="上架"?1:2
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
          title: '删除用户法师',
          content: "您确定要删除用户法师吗？",
          loading: true,
          onOk: function () {
            let _this = this;
            vm.handledeleteUserRabbi({
              userRabbiId: row.userRabbiId,
              status:2
            }).then(res => {
              if (res.code === 20000) {
                vm.$Message.success('删除用户法师成功！');
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

