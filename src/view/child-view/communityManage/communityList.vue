<!--小区信息管理-->
<template>
  <div class="pageWrapper">
    <searchPanel ref="searchPanel">
      <Form slot="formContent" label-position="top" inline>
        <FormItem label="小区名称">
          <Input v-model="searchModel.name" placeholder="请输入小区名称"></Input>
        </FormItem>
        <FormItem label="审核状态">
          <Select v-model="searchModel.auditStatus" placeholder="请选择审核状态">
            <Option v-for="(item,index) in auditStatusOptions" :value="item.value">{{item.label}}</Option>
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
      @refreshBtn="init"
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
  import searchPanel from '../comontents/searchPanel'
  import packageTable from '../comontents/packageTable'
  import packageTableMixins from '../mixins/packageTableMixins'
  import {mapActions} from 'vuex'
  import addForm from './component/addForm'
  import delCommunityForm from './component/delCommunity'
  import editCommunity from './component/editCommunity'
  import contractManage from './component/contractManage'
  import {getEnumArrText} from '@/libs/util'
  export default {
    name: 'communityList',
    mixins: [packageTableMixins],
    data() {
      return {
        searchModel:{
          name:"",
          auditStatus:""
        },//
        auditStatusOptions:[
          {
            value:'1',
            label:'审核中'
          },
          {
            value:'1',
            label:'审核通过'
          },
          {
            value:'1',
            label:'审核未通过'
          },
        ],
        tableDataList:[{},{}],
        reqBase: {
          region_id: null,
          page:1,
          page_size:15
        },
        headBtnList: [
          {
            mothod: this.add,
            type: 'primary',
            icon: '',
            text: '新增小区',
          },

        ],
        columnsheader: [
          {
            align: 'center',
            title: '小区名称',
            key: 'name',
          },
          {
            align: 'center',
            title: '小区地址',
            key:'addr',
          },
          {
            align: 'center',
            title: '审核状态',
            key:'status',
            render:(h,{row})=>{
              let result=getEnumArrText(this.getAuditSatus,row.status)
              if(row.status===3){
                return h('Poptip',{
                  props:{
                    trigger:"hover",
                    transfer:true,
                    title:"审核状态",
                    placement:'right'
                  }
                },[
                  h('a',result),
                  h("div",{
                    slot:'content',

                  },'111'),

                ]);
              }else{
                return h('div',result)
              }
            }
          },
          {
            align: 'center',
            title: '合同到期时间',
            key: 'contract_expiration_date'
          },
          {
            align: 'center',
            title: '合同到期状态',
            key: 'contract_expiration_date'
          },
          {
            align: 'center',
            title: '创建人',
            key: 'cuid'
          },
          {
            align: 'center',
            title: '创建时间',
            key: 'create_timesec'
          },
          {
            align: 'center',
            title: '操作',
            width:300,
            key: '',
            render: (h, {row}) => {
              return h('div', [
                h('Button', {
                  style: {
                    marginLeft: '3px'
                  },
                  props: {
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.showQRcode(row)
                    }
                  }
                },'查看二维码'),
                h('Button', {
                  style: {
                    marginLeft: '3px'
                  },
                  props: {
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.contractManage(row)
                    }
                  }
                },'合同管理'),
                h('Button', {
                  style: {
                    marginLeft: '3px'
                  },
                  props: {
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.showDetails(row)
                    }
                  }
                },'编辑'),
                h('Button', {
                  style: {
                    marginLeft: '3px'
                  },
                  props: {
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.del(row)
                    }
                  }
                },'删除'),
              ])
            }
          },
        ]
      }
    },
    components: {
      packageTable,
      searchPanel
    },
    computed: {
      getAreaListData() {
        return this.$store.state.areaManage.areaListData;
      },
      getAreaDataTree() {
        return this.$store.state.areaManage.areaListDataTree;
      },
      getAuditSatus(){
        return this.$store.state.auditSatus;
      }
    },
    methods: {
      ...mapActions([
        'handleGetCommunityList',
        'handleAddCommunity',
        'handleEditCommunity',
        'handleDelCommunity',//删除
      ]),
      init() {
        this.tableLoading = true;
        this.handleGetCommunityList({...this.reqBase}).then(res => {
          this.tableLoading = false;
          if (res.status === 0) {
            this.tableDataList = res.data.community?res.data.community:[];
            this.getPageTotal = res.data.total;
          } else {
            this.tableDataList = [];
            this.$Message.error(this.errorCode[res.status]);
          }
        });

      },
      /**
       * 新增小区
       */
      add(){
        let vm=this;
        let config={
          width:500,
          loading:true,
          render:(h)=>{
            return h('div',[
              h('h3',{slot:'header'},"添加小区"),
              h(addForm,{
                ref:'addForm',
                props:{

                }
              })
            ])

          },
          onOk:function(){
            let _this=this;
            let obj=this.$refs.addForm;

            obj.checkForm().then(res=>{
              if(res){
                //提交请求
                let {name,address}=obj.formModel;
               vm.handleAddCommunity({
                 name,
                 addr:address
               }).then(res=>{
                 if(res.status===0){
                   vm.$Message.success("添加成功");
                   vm.$Modal.remove();
                   vm.init();
                 }else{
                   _this.buttonLoading=false;
                   vm.$Message.error(this.errorCode[res.status]);
                 }
               });
              }else{
                _this.buttonLoading=false;
              }
            });
          }
        };
        this.$Modal.confirm(config);
      },
      showQRcode(){
        let config={
          loading:true,
          width:350,
          okText:'保存',
          render:(h)=>{
            return h("div",[
              h('h3','获取二维码'),
              h('div',[
                h('img',{
                  props:{

                  },
                  attrs:{
                    src:'111'
                  }
                })
              ])
            ]);
          },
          onOk:function(){
            let _this=this;
            //下载二维码连接
          }
        };
        this.$Modal.confirm(config);
      },
      //删除小区
      del(id){
        let vm=this;
        let config={
          loading:true,
          width:350,
          render:(h)=>{
            return h("div",[
              h('h3','删除小区'),
              h(delCommunityForm,{
                ref:'delCommunityForm',
                props:{

                }
              }),
            ])
          },
          onOk:function(){
            let _this=this;
            let obj=this.$refs.delCommunityForm;
            obj.checkForm().then(res=>{
              if(res){
                //请求接口
                let {vcode} =obj.formModel;
                vm.handleDelCommunity({
                  building_guid:id,
                  vcode
                }).then(res=>{
                  if(res.status===0){
                    vm.$Message.success("删除成功");
                    vm.$Modal.remove();
                    vm.init();
                  }else{
                    _this.buttonLoading=false;
                    vm.$Message.error(this.errorCode[res.status]);
                  }
                });
              }else{
                _this.buttonLoading=false;
              }
            });
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 合约管理
       */
      contractManage(row){
        let vm=this;
        let config={
          width:700,
          loading:true,
          okText:'申请审核',
          render:(h)=>{
            return h('div',[
              h('h3',{
                slot:'title'
              },'合约管理'),
              h(contractManage, {
                ref:'contractManage',
                props: {
                  _vm: vm,
                  getModelData: {...row}
                }
              })
            ]);
          },
          onOk:function(){
            let _this=this;
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 显示详情
       * @param row
       */
      showDetails(row) {
        let vm = this;
        let config = {
          width: 500,
          loading:true,
          render: (h) => {
            return h('div',[
              h('h3',{
                slot:'title'
              },'编辑'),
              h(editCommunity, {
                ref:'editCommunity',
                props: {
                  _vm: vm,
                  getModelData: {...row}
                }
              })
            ]);
          },
          onOk:function(){
            let _this=this;
            let obj=this.$refs.editCommunity;
            obj.checkForm().then(res=>{
              if(res){
                //请求接口
                let {name,address} =obj.formModel;
                vm.handleEditCommunity({
                  building_guid:row.building_guid,
                  name,
                  addr:address
                }).then(res=>{
                  if(res.status===0){
                    vm.$Message.success("编辑成功");
                    vm.$Modal.remove();
                    vm.init();
                  }else{
                    _this.buttonLoading=false;
                    vm.$Message.error(this.errorCode[res.status]);
                  }
                });
              }else{
                _this.buttonLoading=false;
              }
            });
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 禁用user
       * @param row
       */
      disableUser(row) {
        let vm = this;
        let config = {
          title: '禁用用户',
          content: '您是否想禁用这个用户',
          loading: true,
          onOk: function () {
            //调用禁用方法
            vm.handleDisableUser().then(res => {

            })
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 重置 密码
       * @param row
       */
      resetPass(row) {

      },
      CascaderOnChange(value, selectedData) {
        let len=0;
        if(selectedData && selectedData.length>0){
          len=selectedData.length;
        }
        if (selectedData) {
          this.tagSearchList.splice(0, 1, {
            name: selectedData[len-1].region_id,
            text: selectedData[len-1].title,
            key:'region_id',
            ...selectedData[len-1]
          });
          this.reqBase.region_id=selectedData[len-1].region_id;
          this.init();
        }
      },
      /**
       * 清空tag search
       */
      clearTagSearch(){
        this.tagSearchList.splice(0,this.tagSearchList.length);
        this.areaValue=[];
        //重置筛选条件
        this.reqBase={
          region_id: null,
          page:1,
          page_size:15
        };
        this.init();
      },
      /**
       * 关闭单个筛选
       * @param name
       */
      closeTagSearch(name){
        for(let i in this.tagSearchList){
          let list=this.tagSearchList[i];
          if(name==list.name){
            //删除当前的筛选条件
            //获取删除的key,重置 单个筛选条件
            this.reqBase[list.key]=null;
            //list.key
            this.tagSearchList.splice(i,1);
            this.areaValue=[];
            this.init();
          }
        }
      },
    },
    mounted() {
      this.init();
    },
    created() {

    }
  }
</script>

<style scoped>
  .pageWrapper{
    position: relative;
  }
  .base_btn_item {
    margin-right: 5px;
  }

  .btnMargin {
    margin-left: 3px;
  }
</style>
