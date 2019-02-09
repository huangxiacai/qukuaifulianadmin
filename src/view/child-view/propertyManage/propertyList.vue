<!--出入人员管理-->
<template>
  <div>
    <addFormPerperty ref="addFormPerperty"></addFormPerperty>
    <packageTable
      ref="contentBaseRef"
      :columnsData="columnsheader"
      :tableData="tableDataList"
      :reduceheight="reduceheight"
      :loading="tableLoading"
      :border="true"
      :tabletotallen="getPageTotal"
      @pageonChange="pageonChange"
      @refreshBtn="init"
      @getSelect="getSelectList">
      <template slot="headLeft">
        <Button v-for="(item,index) in headBtnList" @click="item.mothod" :key="index" class="base_btn_item"
                :type="item.type" :icon="item.icon">
          {{item.text}}
        </Button>
      </template>
    </packageTable>
  </div>
</template>

<script>
  import packageTable from '../comontents/packageTable'
  import packageTableMixins from '../mixins/packageTableMixins'
  import {mapActions} from 'vuex'
  import addFormPerperty from './component/addFormPerperty'
  import delCommunityForm from '../communityManage/component/delCommunity'
  import {getEnumText} from '@/libs/util'
  import addForm from './component/addForm'
  import editForm from './component/editForm'
  import addImage from './component/addImage'
  export default {
    name: 'propertyList',
    mixins: [packageTableMixins],
    data() {
      return {
        reqBase: {
          page:1,
          page_size:15
        },
        tableDataList:[{}],
        headBtnList: [
          {
            mothod: this.add,
            type: 'primary',
            icon: '',
            text: '新增',
          }
        ],
        columnsheader: [
          {
            align: 'center',
            title: '姓名',
            key: 'user_name',
          },
          {
            align: 'center',
            title: '人员类型',
            key:'user_type',
            render:(h,{row})=>{
              return h('div',getEnumText(this.userTypeObj,row.user_type))
            }
          },
          {
            align: 'center',
            title: '人像',
            key:'',
          },
          {
            align: 'center',
            title: '身份证号码',
            key:'id_number',
          },

          {
            align: 'center',
            title: '手机号码',
            key: 'mobile',
          },
          {
            align: 'center',
            title: '所属小区',
            key:'building_guid',
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
                      this.faceManage(row)
                    }
                  }
                },'人像管理'),
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
      addFormPerperty
    },
    computed: {
      userTypeObj(){
        return this.$store.state.userTypeObj;
      },
      //获取可管理的小区列表
      getCommuntiyListArr(){
        return this.$store.state.communtiyListArr;
      }
    },
    methods: {
      ...mapActions([
        'handleGetPropertyList',//获取物业人员列表
        'handleAddProperty',
        'handleEditProperty',
        'handleDelProperty',//删除物业人员
      ]),
      init() {
        this.tableLoading = true;
        this.handleGetPropertyList({...this.reqBase}).then(res => {
          this.tableLoading = false;
          if (res.status === 0) {
            this.tableDataList = res.data.users?res.data.users:[];
            this.getPageTotal = res.data.total;
          } else {
            this.tableDataList = [];
            this.$Message.error(this.errorCode[res.status]);
          }
        });

      },
      /**
       * 新增物业管理人员
       */
      add(){
        //this.$refs.addFormPerperty.showModal(true);
        let vm=this;
        let config={
          width:500,
          loading:true,
          render:(h)=>{
            return h('div',[
              h('h3',{slot:'header'},"新增出入人员"),
              h(addForm,{
                ref:'addForm',
                props:{
                  _vm:vm,
                  getArea:vm.getCommuntiyListArr
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
                let params=obj.formModel;
                vm.handleAddProperty({...params}).then(res=>{
                  if(res.status===0){
                    vm.$Message.success("添加成功");
                    vm.$Modal.remove();
                    vm.init();
                  }else{
                    vm.$Message.error(vm.errorCode[res.status]);
                    _this.buttonLoading=false;
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
      importData(){

      },
      exportData(){

      },
      //人像管理
      faceManage(row){
        let vm=this;
        let config={
          loading:true,
          width:700,
          render:(h)=>{
            return h('div',[
              h('h3',{slot:'header'},"人像管理"),
              h(addImage,{
                ref:'addImage',
                props:{
                  _vm:vm,
                }
              })
            ])
          },
          onOk:function(){
            let _this=this;
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
              h('h3','删除物业人员'),
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
        let vm=this;
        let config={
          width:500,
          loading:true,
          render:(h)=>{
            return h('div',[
              h('h3',{slot:'header'},"编辑出入人员"),
              h(editForm,{
                ref:'editForm',
                props:{
                  _vm:vm,
                  getArea:vm.getCommuntiyListArr,
                  getModelData:row
                }
              })
            ])

          },
          onOk:function(){
            let _this=this;
            let obj=this.$refs.editForm;
            obj.checkForm().then(res=>{
              if(res){
                //提交请求
                let params=obj.formModel;
                vm.handleAddProperty({...params}).then(res=>{
                  if(res.status===0){
                    vm.$Message.success("编辑成功");
                    vm.$Modal.remove();
                    vm.init();
                  }else{
                    vm.$Message.error(vm.errorCode[res.status]);
                    _this.buttonLoading=false;
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
  .base_btn_item {
    margin-right: 5px;
  }

  .btnMargin {
    margin-left: 3px;
  }
</style>
