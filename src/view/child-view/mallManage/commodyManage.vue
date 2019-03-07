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
    <Modal v-model="showModal"
           :title="titleModal"
           @on-visible-change="visibleChange"
           width="1000">
      <Form :ref="refName"
            :model="getData"
            :rules="getRult"
            label-position="top"
            class="show_area" inline>
        <FormItem label="商品名称" class="qdd_layout50" prop="productName">
          <Input v-model="getData.productName" placeholder="请输入商品名称"
                 class="setfill"></Input>
        </FormItem>
        <FormItem label="商品分类" class="qdd_layout50" prop="productTypeId">
          <Select v-model="getData.productTypeId" placeholder="请选择商品分类" :transfer="true">
            <Option v-for="item in productTypeData"
                    :value="item.value"
                    :key="item.value">{{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="商品的福豆价格" class="qdd_layout50" prop="amount">
          <InputNumber :min="0" v-model="getData.amount" class="setfill"></InputNumber>
        </FormItem>
        <FormItem label="购买商品添加的福利值" class="qdd_layout50" prop="addWelfare">
          <InputNumber :min="0" v-model="getData.addWelfare" class="setfill"></InputNumber>
        </FormItem>
        <FormItem label="商品LOGO图地址" class="qdd_layout50" prop="logo">
          <uploadFile
            ref="uploadLogoList"
            :updateDate="updateDate"
            @init="uploadLogoFileInit"
            @handleRemove="removeLogo"
            @handleSuccess="uploadLogoSuccess"></uploadFile>
        </FormItem>
        <FormItem label="商品图片" class="qdd_layout50" prop="image">
          <uploadFile
            ref="uploadimageList"
            :isMultiple="true"
            :accUploadNum="5"
            @init="uploadImageFileInit"
            @handleRemove="removeImage"
            @handleSuccess="uploadImgSuccess"
            :updateDate="updateDate"></uploadFile>
        </FormItem>
        <FormItem label="商品运费" class="qdd_layout50">
          <InputNumber :min="0" class="setfill" v-model="getData.freight" placeholder="请填写商品运费"></InputNumber>
        </FormItem>
        <FormItem label="商品详情" prop="productDetail" class="qdd_layout100">
          <Editor ref="editor"
                  :value="getData.productDetail"
                  :cache='cache'
                  @on-change="handleChange"></Editor>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" :loading="modalLoading" @click="modelOk">添加</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import packageTableMixins from '../mixins/packageTableMixins'
  import {mapActions} from 'vuex'
  import Editor from '_c/editor'
  import addCommody from './component/addCommody'
  import {formatDate} from '../../../libs/util'
  import uploadFile from '../comontents/uploadFileTemplate'

  export default {
    name: 'CommodityClassManage',
    mixins: [packageTableMixins],
    data() {
      return {
        showModal: false,
        titleModal: '添加商品',
        modalLoading: false,
        cache: false,
        getData: {
          productName: null,
          productTypeId: null,
          amount: null,
          addWelfare: null,
          productDetail: null,
          logo: null,
          image: [],
          freight: null
        },
        getRult: {
          productName: [
            {required: true, message: '请填写商品名称', trigger: 'blur'}
          ],
          productTypeId: [
            {required: true, type: 'number', message: '商品分类Id', trigger: 'change'}
          ],
          amount: [
            {required: true, type: 'number', message: '请填写商品的福豆价格', trigger: 'change'}
          ],
          addWelfare: [
            {required: true, type: 'number', message: '请选择购买商品添加的福利值', trigger: 'change'}
          ],
          productDetail: [
            {required: true, message: '请填写商品详情', trigger: 'blur'}
          ],
          logo: [
            {required: true, message: '请填写商品LOGO图地址', trigger: 'blur'}
          ],
          image: [
            {required: true, type: 'array', message: '请填写商品图片', trigger: 'blur'}
          ]
        },
        refName: 'refName',
        uploadLogoList: [],
        uploadimageList: [],
        updateDate: {
          type: 2,
        },
        defaultList: [],
        reqBase: {
          productTypeId: -1,
          currentPage: 1,
          length: 15
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
            render: (h, {row}) => {
              if (row.logo === null || row.logo == "暂时无图") {

              } else {
                return h('div', {
                  style: {
                    width: "70px",
                    height: "70px"
                  }
                }, [
                  h('img', {
                    style: {
                      width: "100%",
                      height: "100%"
                    },
                    attrs: {
                      src: this.fileImgPrefix + "" + row.logo
                    }
                  })
                ]);
              }
            }
          },
          {
            title: '创建时间',
            key: 'createDate',
            align: 'center',
            render: (h, {row}) => {
              return h('div', formatDate('Y-m-d H:i:s', row.createDate))
            }
          },
          {
            title: '商品图片',
            key: 'image',
            align: 'center',
            render: (h, {row}) => {
              if (row.image === null || row.image == "暂时无图") {

              } else {
                return h('div', {
                  style: {
                    width: "70px",
                    height: "70px"
                  }
                }, [
                  h('img', {
                    style: {
                      width: "100%",
                      height: "100%"
                    },
                    attrs: {
                      src: this.fileImgPrefix + "" + row.image
                    }
                  })
                ]);
              }
            }
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
            render: (h, {row}) => {
              let result = "";
              if (row.isSelf == 1) {
                result = "是";
              } else if (row.isSelf == 0) {
                result = "否"
              }
              return h('div', result)
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
            fixed: 'right',
            width: 200,
            render: (h, {row}) => {
              let vm = this;
              let result = '';
              if (row.isSelf === 0) {
                result = "上架";
              } else if (row.isSelf === 1) {
                result = "下架";
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
                // h('Button', {
                //   props: {
                //     type: 'text',
                //     size: 'small'
                //   },
                //   on: {
                //     click: function () {
                //       vm.del(row)
                //     }
                //   }
                // }, '删除'),
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
          poductName: null
        }
      }
    },
    components: {
      Editor,
      uploadFile
    },
    computed: {
      productTypeData() {
        return this.$store.state.shopManage.productTypeData
      },
      //文件前缀
      fileImgPrefix() {
        let root = this.$config.imgUrl.pro;
        if (process.env.NODE_ENV !== 'production') {
          root = this.$config.imgUrl.dev;
        }
        return root;
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
      visibleChange(b) {
        if(b){
          if(this.getData.productDetail!=null){
            this.$refs.editor.setHtml(this.getData.productDetail);
            this.handleChange(this.getData.productDetail);
          }else{
            this.$refs.editor.setHtml("");
            this.handleChange("");
          }
          debugger
          if(this.getData!=undefined){
            let arr=this.getData.image;
            if(arr.length>0 && arr!="暂时无图"){
              let temparr=arr.split(",");
              this.$set(this.getData,"image",temparr);
              for(let i in temparr){
                let list=temparr[i];
                this.uploadimageList.push({
                  name:list,
                  url:this.fileImgPrefix+""+list,
                  status:'finished'
                });
              }
              this.$refs.uploadimageList.init(this.uploadimageList);
            }else{
              this.$set(this.getData,"image",[]);
            }
            if(this.getData.logo!=null && this.getData.logo!="暂时无图"){
              this.uploadLogoList.push({
                name:this.getData.logo,
                url:this.fileImgPrefix+""+this.getData.logo,
                status:'finished'
              });
              this.$refs.uploadLogoList.init(this.uploadLogoList);
            }else{
              this.$set(this.getData,"logo","");
            }


          }
        }else{
          this.showModal=false;
          this.getData={
            productName: null,
            productTypeId: null,
            amount: null,
            addWelfare: null,
            productDetail: null,
            logo: null,
            image: [],
            freight: null
          };
          //清空选中的图片
          this.uploadimageList=[];
          this.uploadLogoList=[];
          this.$refs.uploadimageList.init(this.uploadimageList);
          this.$refs.uploadLogoList.init(this.uploadLogoList);
        }
      },
      cancel() {
        this.showModal = false;
      },
      saveProduct() {
        let vm=this;
        let {
          productName,
          productTypeId,
          amount,
          addWelfare,
          productDetail,
          logo,
          image,
          freight
        } = this.getData;
        if (freight == null || freight == '') {
          freight = 0;
        }
        // 发送请求
        this.handlesaveProduct({
          productName,
          productTypeId,
          amount,
          addWelfare,
          productDetail,
          logo,
          image: image.join(','),
          freight
        }).then(res => {
          this.modalLoading = false;
          if (res.code === 20000) {
            vm.$Message.success('添加成功！');
            this.showModal=false;
            vm.init()
          } else {
            vm.$Message.error(res.msg);
          }
        })
      },
      modelOk() {
        this.$refs[this.refName].validate((valid) => {
          debugger
          if (valid) {
            this.modalLoading = true;
            if (this.getData.productId == undefined) {
              this.saveProduct();
            } else {
              this.updateProduct()
            }
          } else {
          }
        });
      },
      //修改商品
      updateProduct(){
        let vm=this;
        let {
          productId,
          productName,
          productTypeId,
          amount,
          addWelfare,
          productDetail,
          logo,
          image,
          freight
        } = this.getData;
        //为空的时候默认为0
        if (freight == null || freight == '') {
          freight = 0;
        }
        // 发送请求
        vm.handleupdateProduct({
          productId,
          productName,
          productTypeId,
          amount,
          addWelfare,
          productDetail,
          logo,
          image: image.length > 0 ? image.join(',') : '',
          freight
        }).then(res => {
          this.modalLoading = false;
          if (res.code === 20000) {
            vm.$Message.success('修改成功！');
            this.showModal=false;
            vm.init()
          } else {
            vm.$Message.error(res.msg);
            _this.buttonLoading = false
          }
        })
      },
      handleChange(html, text) {
        this.$set(this.getData, 'productDetail', html);
      },
      removeLogo({res, name}) {
        if (res.code === 20000) {
          this.getData.logo = null;
        }
      },
      removeImage({res, name}) {
        if (res.code === 20000) {
          this.getData.image.splice(name, 1)
        }
      },
      uploadLogoSuccess(res) {
        if (res.code === 20000) {
          this.getData.logo = res.data;
        }
      },
      uploadImgSuccess(res) {
        if (res.code === 20000) {
          this.getData.image.push(res.data);
        }
      },
      uploadLogoFileInit() {

      },
      uploadImageFileInit() {

      },
      add() {
        this.showModal = true;
        this.titleModal = '添加商品';
        // let vm = this;
        // let config = {
        //   loading: true,
        //   width:800,
        //   render: (h) => {
        //     return h('div', [
        //       h('h3', '添加商品'),
        //       h(addCommody, {
        //         ref: 'addCommody',
        //         props: {
        //           _vm:vm,
        //         }
        //       })
        //     ])
        //   },
        //   onOk: function () {
        //     let _this = this;
        //     let obj = this.$refs.addCommody;
        //     obj.checkForm().then(res => {
        //       if (res) {
        //         let {
        //           productName,
        //           productTypeId,
        //           amount,
        //           addWelfare,
        //           productDetail,
        //           logo,
        //           image,
        //           freight} = obj.getData;
        //         if(freight==null || freight==''){
        //           freight=0;
        //         }
        //         // 发送请求
        //         vm.handlesaveProduct({
        //           productName,
        //           productTypeId,
        //           amount,
        //           addWelfare,
        //           productDetail,
        //           logo,
        //           image:image.join(','),
        //           freight
        //         }).then(res => {
        //           if (res.code === 20000) {
        //             vm.$Message.success('添加成功！');
        //             vm.$Modal.remove();
        //             vm.init()
        //           } else {
        //             vm.$Message.error(res.msg);
        //             _this.buttonLoading = false
        //           }
        //         })
        //       } else {
        //         _this.buttonLoading = false
        //       }
        //     })
        //   }
        // };
        // this.$Modal.confirm(config)
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
            let status = title == '上架' ? 1 : 0;
            // 发送请求
            vm.handleisSelfProduct({
              productId: row.productId,
              isSelf: status
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
        this.showModal=true;
        this.titleModal = '修改商品';
        Object.assign(this.getData,row);
        // let vm = this;
        // let config = {
        //   loading: true,
        //   width: 800,
        //   render: (h) => {
        //     return h('div', [
        //       h('h3', '修改商品'),
        //       h(addCommody, {
        //         ref: 'addCommody',
        //         props: {
        //           setData: row,
        //           _vm: vm
        //         }
        //       })
        //     ])
        //   },
        //   onOk: function () {
        //     let _this = this;
        //     let obj = this.$refs.addCommody;
        //     obj.checkForm().then(res => {
        //       if (res) {
        //         let {
        //           productId,
        //           productName,
        //           productTypeId,
        //           amount,
        //           addWelfare,
        //           productDetail,
        //           logo,
        //           image,
        //           freight
        //         } = obj.getData;
        //         //为空的时候默认为0
        //         if (freight == null || freight == '') {
        //           freight = 0;
        //         }
        //         // 发送请求
        //         vm.handleupdateProduct({
        //           productId,
        //           productName,
        //           productTypeId,
        //           amount,
        //           addWelfare,
        //           productDetail,
        //           logo,
        //           image: image.length > 0 ? image.join(',') : '',
        //           freight
        //         }).then(res => {
        //           if (res.code === 20000) {
        //             vm.$Message.success('修改成功！');
        //             vm.$Modal.remove();
        //             vm.init()
        //           } else {
        //             vm.$Message.error(res.msg);
        //             _this.buttonLoading = false
        //           }
        //         })
        //       } else {
        //         _this.buttonLoading = false
        //       }
        //     })
        //   }
        // };
        // this.$Modal.confirm(config)
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
          poductName: null
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
      if (this.productTypeData.length == 0) {
        this.handlequeryAllProductType({}).then(res => {
        });
      }
      this.init()
    },
    created() {

    }
  }
</script>

<style scoped>
  .setfill {
    width: 100%;
  }

  .show_area {
    height: 380px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .qdd_layout50, .qdd_layout100 {
    margin-bottom: 18px;
  }

  .qdd_layout50 {
    width: calc(50% - 12px)
  }

  .qdd_layout100 {
    width: calc(100% - 12px)
  }

  #bdmap {
    height: 450px;
    width: 100%;
    margin: -16px;
  }
</style>


