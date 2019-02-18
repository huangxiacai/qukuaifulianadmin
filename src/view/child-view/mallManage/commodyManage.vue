<!--商品管理-->
<template>
    <div style="position:relative;">
        <searchPanel :title="title"
                     @search="onSearch(filter_form)"
                     ref="filterBase"
                     @reset="resetConditions"
                     :isReset="true">
            <Form slot="formContent" inline class="ivu-row">
                <FormItem label="分类名称:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Select v-model="filter_form.productTypeId" placeholder="请填写分类名称">
                        <Option v-for="item in productTypeData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="产品名称:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Input v-model="filter_form.poductName" type="text"
                           placeholder="请填写产品名称"></Input>
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
  import addCommody from './component/addCommody'
  import {formatDate} from '../../../libs/util'

  export default {
    name: 'CommodityClassManage',
    mixins: [packageTableMixins],
    data() {
      return {
        reqBase:{
          productTypeId:-1,
          currentPage:1,
          length:15
        },
        title: '商品管理过滤',
        getStatus: [
          {
            value: 0,
            label: '上架',
          },
          {
            value: 1,
            label: '下架',
          }
        ],
        getType: [
          {
            value: 0,
            label: '跳转',
          },
          {
            value: 1,
            label: '不跳转',
          }
        ],
        headBtnList: [
          {
            mothod: this.add,
            type: 'primary',
            icon: '',
            text: '添加商品'
          }
        ],
        columnsheader: [
          {
            title: '商品名称',
            key: 'productName',
            align: 'center',
          },
          {
            title: '福豆价格',
            key: 'amount',
            align: 'center',
          },
          {
            title: '购买商品添加的福利值',
            key: 'addWelfare',
            align: 'center',
          },
          {
            title: '商品详情',
            key: 'productDetail',
            align: 'center',
          },
          {
            title: '商品LOGO图地址',
            key: 'logo',
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
            title: '商品图片',
            key: 'image',
            align: 'center'
          },
          {
            title: '商品运费',
            key: 'freight',
            align: 'center'
          },
          {
            title: '是否上架',
            key: 'isSelf',
            align: 'center',
            render:(h,{row})=>{
              let result="";
              if(row.isSelf==1){
                result="是";
              }else if(row.isSelf==0){
                result="否"
              }
              return h('div',result)
            }
          },
          {
            title: '商品分类名称',
            key: 'productTypeName',
            align: 'center'
          },
          {
            title: '操作',
            key: 'active',
            align: 'center',
            fixed:'right',
            width:200,
            render: (h, {row}) => {
              let vm = this;
              let result = '';
              if (row.isSelf === 0) {
                result = "下架";
              } else if (row.isSelf === 1) {
                result = "上架";
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: function () {
                      vm.changeBannerStatus(row, result);
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
          productTypeId: -1,
          poductName:null
        }
      }
    },
    computed:{
      productTypeData(){
        return this.$store.state.shopManage.productTypeData
      }
    },
    methods: {
      ...mapActions([
        'handlequeryProducts',
        'handlesaveProduct',//添加
        'handleupdateProduct',//修改
        'handleisSelfProduct',
        'handlequeryAllProductType',//查询所有的商品分类
      ]),
      add() {
        let vm = this;
        let config = {
          loading: true,
          width:800,
          render: (h) => {
            return h('div', [
              h('h3', '添加商品'),
              h(addCommody, {
                ref: 'addCommody',
                props: {
                  _vm:vm,
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addCommody;
            obj.checkForm().then(res => {
              if (res) {
                let {
                  productName,
                  productTypeId,
                  amount,
                  addWelfare,
                  productDetail,
                  logo,
                  image,
                  freight} = obj.getData;
                // 发送请求
                vm.handlesaveProduct({
                  productName,
                  productTypeId,
                  amount,
                  addWelfare,
                  productDetail,
                  logo,
                  image:image.join(','),
                  freight
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
      changeBannerStatus(row, title) {
        let vm = this;
        let config = {
          title: title,
          loading: true,
          content: "您确定要" + title + "此商品吗？",
          onOk: function () {
            let _this = this;
            // 发送请求
            vm.handleisSelfProduct({
              productId: row.productId,
              isSelf:row.isSelf
            }).then(res => {
              if (res.code === 20000) {
                vm.$Message.success(title + '成功！');
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
      edit(row) {
        let vm = this;
        let config = {
          loading: true,
          width:800,
          render: (h) => {
            return h('div', [
              h('h3', '修改商品'),
              h(addCommody, {
                ref: 'addCommody',
                props: {
                  setData: row,
                  _vm:vm
                }
              })
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.addCommody;
            obj.checkForm().then(res => {
              if (res) {
                let {
                  productId,
                  productName,
                  productTypeId,
                  amount,
                  addWelfare,
                  productDetail,
                  logo,
                  image,
                  freight} = obj.getData;
                // 发送请求
                vm.handleupdateProduct({
                  productId,
                  productName,
                  productTypeId,
                  amount,
                  addWelfare,
                  productDetail,
                  logo,
                  image:image.length>0?image.json(','):'',
                  freight
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
      del(row) {
        let vm = this;
        let config = {
          title: '删除商品分类',
          loading: true,
          content: "您确定要删除此删除商品分类吗？",
          onOk: function () {
            let _this = this;
            // 发送请求
            vm.handledeleteProductTypeById({
              shopImageId: row.productTypeId
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
          productTypeId: -1,
          poductName:null
        }
      },
      init() {
        this.tableLoading = true
        this.handlequeryProducts({...this.reqBase}).then(res => {
          this.tableLoading = false;
          if (res.code === 20000) {
            this.tableDataList = res.data.data;
            this.getPageTotal = res.data.totalCount
          } else {
            this.tableDataList = [];
            this.getPageTotal = 0
          }
        })
      }
    },
    mounted() {
      //查询所有的产品分类

      if(this.productTypeData.length==0){
        this.handlequeryAllProductType({}).then(res=>{
        });
      }
      this.init()
    },
    created() {

    }
  }
</script>

<style scoped>

</style>


