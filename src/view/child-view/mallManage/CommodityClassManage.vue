<!--商品分类管理-->
<!--商城轮播图管理-->
<template>
    <div style="position:relative;">
        <searchPanel :title="title"
                     @search="onSearch(filter_form)"
                     ref="filterBase"
                     @reset="resetConditions"
                     :isReset="true">
            <Form slot="formContent" inline class="ivu-row">
                <FormItem label="分类名称:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Input v-model="filter_form.typeName" type="text"
                           placeholder="请填写分类名称"></Input>
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
  import addProductClass from './component/addProductClass'
  import { formatDate } from '../../../libs/util'

  export default {
    name: 'CommodityClassManage',
    mixins: [packageTableMixins],
    data() {
      return {
        title: '用户活跃度福利值过滤',
        getStatus:[
          {
            value:0,
            label:'上架',
          },
          {
            value:1,
            label:'下架',
          }
        ],
        getType:[
          {
            value:0,
            label:'跳转',
          },
          {
            value:1,
            label:'不跳转',
          }
        ],
        headBtnList: [
          {
            mothod: this.add,
            type: 'primary',
            icon: '',
            text: '添加商品分类'
          }
        ],
        columnsheader: [
          {
            title: '产品分类Id',
            key: 'productTypeId',
            align: 'center',
          },
          {
            title: '分类名称',
            key: 'typeName',
            align: 'center',
          },
          {
            title: '创建时间',
            key: 'createDate',
            align: 'center',
            render: (h, { row }) => {
              return h('div', formatDate('Y-m-d', row.createDate))
            }
          },
          {
            title: '更新时间',
            key: 'updateDate',
            align: 'center',
            render: (h, { row }) => {
              return h('div', formatDate('Y-m-d', row.updateDate))
            }
          },
          {
            title: '排序',
            key: 'sort',
            align: 'center',
          },
          {
            title: '操作',
            key: 'active',
            align: 'center',
            render:(h,{row})=>{
              let vm=this;
              let result = '';
              if(row.status===0){
                result="下架";
              }else if(row.status===1){
                result="上架";
              }
              return h('div',[
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: function () {
                      vm.changeBannerStatus(row,result);
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
              ])
            }
          }
        ],
        filter_form: {
          typeName:null
        }
      }
    },
    methods: {
      ...mapActions([
        'handlequeryProductTypes',
        'handledeleteProductTypeById',//删除
        'handlesaveOrUpdateProductTypes',//添加修改
      ]),
      add() {
        let vm=this;
        let config = {
          loading: true,
          render: (h) => {
            return h('div', [
              h('h3', '添加商品分类'),
              h(addProductClass, {
                ref: 'addProductClass',
                props: {}
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addProductClass;
            obj.checkForm().then(res => {
              if (res) {
                let getData = obj.getData;
                // 发送请求
                vm.handlesaveOrUpdateProductTypes({
                  ...getData
                }).then(res => {
                  if (res.code === 20000) {
                    vm.$Message.success('添加成功！');
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
      //是否上架
      changeBannerStatus(row,title){
        let vm=this;
        let config={
          title:title,
          loading:true,
          content:"您确定要"+title+"此轮播图吗？",
          onOk:function(){
            let _this = this;
            // 发送请求
            vm.handleisHideShopImage({
              shopImageId:row.shopImageId
            }).then(res => {
              if (res.code === 20000) {
                vm.$Message.success(title+'成功！');
                vm.$Modal.remove();
                vm.init()
              } else {
                vm.$Message.error(res.message);
                _this.buttonLoading = false
              }
            })
          }
        };
        this.$Modal.confirm(config);
      },
      edit(row){
        let vm=this;
        let config = {
          loading: true,
          render: (h) => {
            return h('div', [
              h('h3', '修改商品分类'),
              h(addProductClass, {
                ref: 'addProductClass',
                props: {
                  setData:row
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addProductClass;
            obj.checkForm().then(res => {
              if (res) {
                let getData = obj.getData;
                // 发送请求
                vm.handlesaveOrUpdateProductTypes({
                  ...getData
                }).then(res => {
                  if (res.code === 20000) {
                    vm.$Message.success('修改成功！');
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
      del(row){
        let vm=this;
        let config={
          title:'删除商品分类',
          loading:true,
          content:"您确定要删除此删除商品分类吗？",
          onOk:function(){
            let _this = this;
            // 发送请求
            vm.handledeleteProductTypeById({
              shopImageId:row.productTypeId
            }).then(res => {
              if (res.code === 20000) {
                vm.$Message.success('删除成功！');
                vm.$Modal.remove();
                vm.init()
              } else {
                vm.$Message.error(res.msg);
                _this.buttonLoading = false
              }
            })
          }
        };
        this.$Modal.confirm(config);
      },
      //
      showSearchPanel() {
        this.$refs.filterBase.init()
      },

      // 重置搜索条件
      resetConditions() {
        this.filter_form = {
          typeName:null
        }
      },
      init() {
        this.tableLoading = true
        this.handlequeryProductTypes({...this.reqBase}).then(res => {
          this.tableLoading = false
          if (res.code === 20000) {
            this.tableDataList = res.data.data;
            this.getPageTotal = res.data.totalCount
          } else {
            this.tableDataList = []
            this.getPageTotal = 0
          }
        })
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

