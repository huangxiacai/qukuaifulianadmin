/***首页音乐管理****/
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
      :showSearchBtn="false"
      :showFooter="false"
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
  import addMusic from './components/addMusic'

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
            text: '添加音乐'
          }
        ],
        columnsheader: [
          {
            title: '排序',
            key: 'sort',
            align: 'center',
            width: 100,
          },
          {
            title: '音乐URL地址',
            key: 'musicSrc',
            align: 'center',
          },
          {
            title: '创建时间',
            key: 'createDate',
            align: 'center',
            render: (h, {row}) => {
              return h('div', formatDate('Y-m-d', row.createDate))
            }
          },
          {
            title: '更新时间',
            key: 'updateDate',
            align: 'center',
            render: (h, {row}) => {
              return h('div', formatDate('Y-m-d', row.updateDate))
            }
          },
          {
            title: '操作',
            key: '',
            align: 'center',
            fixed: 'right',
            width: 150,
            render: (h, {row}) => {
              let vm=this;
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
                }, '删除'),
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
        'handlequeryMusics',//分页
        'handlesaveOrUpdateMusic',//修改提现记录
        'handledeleteMusic'//del
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
              h('h3', '添加音乐'),
              h(addMusic, {
                ref: 'addMusic',
                props: {
                  _vm:vm
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addMusic;
            obj.checkForm().then(res => {
              if (res) {
                let {musicSrc,sort} = obj.getData;
                // 发送请求
                vm.handlesaveOrUpdateMusic({
                  musicSrc,
                  sort
                }).then(res => {
                  if (res.code === 20000) {
                    vm.$Message.success('添加音乐成功！');
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
              h('h3', '修改音乐'),
              h(addMusic, {
                ref: 'addMusic',
                props: {
                  _vm: vm,
                  setData: row
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addMusic;
            obj.checkForm().then(res => {
              if (res) {
                let {
                  musicId,musicSrc,sort
                } = obj.getData;
                // 发送请求
                vm.handlesaveOrUpdateMusic({
                  musicId,musicSrc,sort
                }).then(res => {
                  if (res.code === 20000) {
                    vm.$Message.success('修改音乐成功！');
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
        this.handlequeryMusics({...this.reqBase}).then(res => {
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
          title: '删除音乐',
          content: "您确定要删除音乐吗？",
          loading: true,
          onOk: function () {
            let _this = this;
            vm.handledeleteMusic({
              beanLockId: row.musicId
            }).then(res => {
              if (res.code === 20000) {
                vm.$Message.success('删除音乐成功！');
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

