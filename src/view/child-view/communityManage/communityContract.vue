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
  import {getValueWithEnum, withIdShowText, getPersonTree} from '../../../libs/util'
  import editCommunity from './component/editCommunity'

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
            key:'address',
          },
          {
            align: 'center',
            title: '小区二维码',
            key:'qrcode',
          },
          {
            align: 'center',
            title: '审核状态',
            key:'status',
          },

          {
            align: 'center',
            title: '合同到期时间',
            key: 'contract_expiration_date'
          },
          {
            align: 'center',
            title: '操作',
            width:250,
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
    },
    methods: {
      ...mapActions([
        'handleGetCommunityList',
        'handleAddCommunity',
        'handleEditCommunity',
        'handleDelCommunity',//删除
      ]),
      init() {
        debugger
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
      del(){
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
              }else{
                _this.buttonLoading=false;
              }
            });
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 新增用户
       */
      addUser() {
        // this.$refs.operationUserRef.showModal(true);
        // this.userModelData={};
        // this.isEdit=false;
        let vm = this;
        let config = {
          width: 400,
          loading: true,
          render: (h) => {
            return h('div',[
              h('h3',{
                slot:'title'
              },'新增用户'),
              h(addUserBase, {
                ref: 'addUserBase',
                props: {
                  _vm: vm,
                  isEdit: false,
                  getModelData: {
                    user_id: null,//用户id
                    mobile: null,//用户手机（帐号）
                    full_name: null,//姓名
                    password: null,
                    regionId: null,//所辖区域
                  }
                }
              })
            ])
          },
          onOk: function () {
            let _this=this;
            let obj = this.$refs.addUserBase;
            obj.checkForm().then(res => {
              if (res) {
                let {
                  user_id,
                  mobile,
                  full_name,
                  region_id,
                  password
                } = obj.formModelData;
                let regionId = region_id.length > 0 ? region_id[region_id.length - 1] : '';

                //添加用户
                vm.$store.dispatch('handleAddUserManage', {
                  user_id,
                  mobile,
                  full_name,
                  region_id: parseInt(regionId),
                  password: md5(password)
                }).then(res => {
                  if (res.status === 0) {
                    vm.$Message.success('添加成功');
                    this.$Modal.remove();
                    vm.init();
                  } else {
                    this.$Message.error(this.errorCode[res.status]);
                    _this.buttonLoading=false;
                  }
                });
              } else {
                _this.buttonLoading=false;
              }

            });
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 编辑用户
       */
      editUser(row) {
        // let region_id_list=getPersonTree(this.getAreaListData,row.region_id);
        // this.$refs.operationUserRef.showModal(true);
        // this.userModelData={
        //   ...row,
        //   region_id:region_id_list
        // };
        // this.isEdit=true;
        let vm = this;
        let config = {
          width: 400,
          loading: true,
          render: (h) => {
            return h('div',[
              h('h3',{
                slot:'title'
              },'编辑用户'),
              h(editUserBase, {
                ref: 'editUserBase',
                props: {
                  _vm: vm,
                  isEdit: true,
                  getModelData: {
                    user_id: row.user_id,//用户id
                    mobile: row.mobile,//用户手机（帐号）
                    full_name: row.full_name,//姓名
                    password: row.password,
                    region_id: [],//所辖区域
                    regionId: row.region_id
                  }
                }
              })
            ]);
          },
          onOk: function () {
            let obj = this.$refs.editUserBase;
            obj.checkForm().then(res => {
              if (res) {
                let {
                  user_id,
                  mobile,
                  full_name,
                  region_id,
                  password
                } = obj.formModelData;
                let regionId = region_id.length > 0 ? region_id[region_id.length - 1] : '';
                //编辑用户
                vm.$store.dispatch('handleEditUserManage', {
                  user_id,
                  mobile,
                  full_name,
                  region_id: parseInt(regionId),
                  password: password ? md5(password) : null
                }).then(res => {
                  if (res.status === 0) {
                    vm.$Message.success('添加成功');
                    this.$Modal.remove();
                    vm.init();
                  } else {
                    this.$Message.error(this.errorCode[res.status]);
                    this.buttonLoading=false;
                  }
                });
              } else {
                this.buttonLoading=false;
              }

            });
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 删除用户
       */
      delUser() {
        let vm = this;
        if (this.selectTabelList == null || this.selectTabelList.length == 0) {
          this.$Message.error("请选中需要删除的用户");
          return;
        }
        let arr = [];
        for (let i in this.selectTabelList) {
          arr.push(this.selectTabelList[i].user_id)
        }
        let config = {
          title: '删除用户',
          content: '确定删除当前所选的用户吗？',
          loading: true,
          onOk: function () {
            vm.delUserReq(arr);
            this.$Modal.remove();
          }
        };
        this.$Modal.confirm(config);


      },
      /**
       * 调用删除方法
       */
      delUserReq(delIdList) {
        this.handleDelUser({
          del_uid: [...delIdList]
        }).then(res => {
          if (res.status === 0) {
            this.$Message.success("删除成功");
            this.init();
            this.selectTabelList=[];
          } else {
            this.$Message.error(this.errorCode[res.status]);
          }
        });
      },
      /**
       * 关联设备
       */
      relationDevice(row) {
        this.$refs.addReleationDevice.showModal(true);
        this.setCurrUserId = row.user_id;
      },

      /**
       * 显示详情
       * @param row
       */
      showDetails(row) {
        let vm = this;
        let config = {
          width: 500,
          render: (h) => {
            return h('div',[
              h('h3',{
                slot:'title'
              },'详情'),
              h(editCommunity, {
                props: {
                  _vm: vm,
                  getModelData: {...row}
                }
              })
            ]);
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
