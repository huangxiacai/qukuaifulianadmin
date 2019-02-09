<template>
  <div>
    <operationDevice :isEdit="isEdit" :deviceBaseData='deviceBaseData' @initEmit="init" ref="operationUserRef"></operationDevice>

    <relationUser ref="relationUser" :did="currentDid"></relationUser>
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
        <div>
          <span style="margin-right: 5px;">筛选条件>:</span>
          <Tag  v-for="(item,index) in tagSearchList"
                :name="item.name"
                :key="index"
                color="success"
                closable
                @on-close="closeTagSearch(item.name)"
                closable>{{item.text}}</Tag>
          <Button v-show="tagSearchList.length>0" @click="clearTagSearch" size="small">清空</Button>
        </div>
      </template>
      <template slot="headRight">
        <Button v-for="(item,index) in headBtnList" @click="item.mothod" :key="index" class="base_btn_item" :type="item.type" :icon="item.icon">
          {{item.text}}
        </Button>
      </template>
    </packageTable>
  </div>
</template>

<script>
  import packageTable from '../comontents/packageTable'
  import packageTableMixins from '../mixins/packageTableMixins'
  import operationDevice from './components/operationDevice'
  import relationUser from './components/step/relationUser'
  import deviceDetails from './components/deviceDetails'
  import { mapActions } from 'vuex'
  import {getValueWithEnum,withIdShowText,getPersonTree,timestampToTime} from '../../../libs/util'
  import baseDetails from './components/detalisTabs/baseDetails'
  import operationDeviceStep from './components/step/handleDevice'
  import addDeviceFrom from './components/step/addDevice'//添加设备
  import delCommon from '../comontents/delCommon'
  export default {
    name: 'deviceMessage',
    mixins:[packageTableMixins],
    data () {
      return {
        isEdit:false,
        currentDid:null,
        operationTitle:'',//操作title
        deviceBaseData:{},//设备基本信息
        tagSearchList:[
        ],
        headBtnList:[
          {
            mothod:this.addDevice,
            type:'primary',
            icon:'',
            text:'新增',
          },
          // {
          //   mothod:this.firmwareUpdate,
          //   type:'primary',
          //   icon:'',
          //   text:'固件升级',
          // },
        ],
        columnsheader:[
          // {
          //   title:'设备名称',
          //   key:'name',
          //   align: 'center',
          // },
          {
            title:'设备ID',
            align: 'center',
            key:'did',
          },
          {
            align: 'center',
            title:'所属小区',
            key:'building_guid',
          },
          {
            align: 'center',
            title:'大门位置',
            key:'site',
          },
          {
            align: 'center',
            title:'出入口',
            key:'direction',
            render:(h,{row})=>{
              return h('div',row.direction===1?"入口":(row.direction===2?"出口":""));
            }
          },
          // {
          //   align: 'center',
          //   title:'设备状态',
          //   key:'state'
          // },
          {
            align: 'center',
            title:'操作',
            width:250,
            key:'',
            render:(h,{row})=>{
              return h('div',[
                  h('Button',{
                    style:{
                      marginLeft:'3px'
                    },
                    props:{
                      icon:'ios-information-circle',
                      size:'small'
                    },
                    on:{
                      click:()=>{
                        this.showDetails(row)
                      }
                    }
                  },"历史视频"),
                  h('Button',{
                    style:{
                      marginLeft:'3px'
                    },
                    props:{
                      icon:'ios-create',
                      size:'small'
                    },
                    on:{
                      click:()=> {
                        this.editDevice(row)
                      }
                    }
                  },'编辑'),
                  h('Button',{
                    style:{
                      marginLeft:'3px'
                    },
                    props:{
                      icon:'ios-trash',
                      size:'small'
                    },
                    on:{
                      click:()=>{
                        this.delDevice(row)
                      }
                    }
                  },'删除')
              ])
            }
          },
        ]
      }
    },
    components: {
      packageTable,
      operationDevice,
      deviceDetails,
      relationUser
    },
    computed: {
      getAreaListData(){
        return this.$store.state.areaManage.areaListData;
      }
    },
    methods: {
      ...mapActions([
        'handleAddDevice',
        'handleEditDeviceManage',
        'handleDelDevice',//删除
        'handleGetDeviceManageItem',
        'handleGetDeviceList'//列表
      ]),
      init(){
        this.tableLoading=true;
        this.handleGetDeviceList({...this.reqBase}).then(res=>{
          this.tableLoading=false;
          if(res.status===0){
            this.tableDataList=res.data.devices?res.data.devices:[];
            this.getPageTotal=res.data.total;
          }else{
            this.tableDataList=[];
            this.getPageTotal=0;
            this.$Message.error(this.errorCode[res.status]);
          }
        });

      },
      /**
       * 新增设备
       */
      addDevice(){
        let vm=this;
        let config={
          width:600,
          loading:true,
          render:(h)=>{
            return h('div',[
              h('h3',{
                slot:'title'
              },'新增设备'),
              h(addDeviceFrom,{
                ref:'addDeviceFrom',
                props:{
                  _vm:vm,
                  isEdit:false,
                  getModelData:{
                    deviceId: null,//设备id
                    deviceName: null,//设备姓名
                    address: null,//安装 地址
                    longitudeAddress: null,////经度
                    jurisdictionalArea: [],//所辖区域
                    latitudeAddress: null,//纬度
                    sec_vcode:null
                  }
                }
              })
            ])
          },
          onOk:function(){
            let _this=this;
            let obj=this.$refs.addDeviceFrom;
            obj.checkForm().then(res=>{
              if(res){
                let params=obj.formModel;

                //添加设备
                vm.handleAddDevice({
                  ...params
                }).then(res => {
                  if (res.status === 0) {
                    vm.$Message.success('添加成功');
                    this.$Modal.remove();
                    vm.init();
                  } else {
                    vm.$Message.error(this.errorCode[res.status]);
                    _this.buttonLoading=false;
                  }
                });
              }else{
                _this.buttonLoading=false;
              }
            })
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 编辑设备
       */
      editDevice(row){
        let vm=this;
        let config={
          loading:true,
          width:500,
          render:(h)=>{
            return h('div',[
              h('h3',{
                slot:'title'
              },'编辑设备'),
              h(addDeviceFrom,{
                ref:'editDeviceFrom',
                props:{
                  _vm:vm,
                  isEdit:true,
                  getModelData:row
                }
              })
            ])
          },
          onOk:function(){
            let _this=this;
            let obj=this.$refs.editDeviceFrom;
            obj.checkForm().then(res=> {
              if (res) {
                let params=obj.formModel;
                vm.handleEditDeviceManage({
                  ...params
                }).
                then(res => {
                  if (res.status === 0) {
                    vm.$Message.success('修改成功');
                    this.$Modal.remove();
                    vm.init();
                  } else {
                    vm.$Message.error(this.errorCode[res.status]);
                    _this.buttonLoading=false;
                  }
                });
              }else{
                _this.buttonLoading=false;
              }
            });
          }
        }
        this.$Modal.confirm(config);
      },
      /**
       * 删除设备
       */
      delDevice(row){
        let vm=this;
        let config={
          loading:true,
          width:350,
          render:(h)=>{
            return h("div",[
              h('h3','删除业主'),
              h(delCommon,{
                ref:'delCommon',
                props:{

                }
              }),
            ])
          },
          onOk:function(){
            let _this=this;
            let obj=this.$refs.delCommon;
            obj.checkForm().then(res=>{
              if(res){
                //请求接口
                vm.handleDelDevice().then(res=>{
                  if(res.status===0){
                    vm.$Modal.remove();
                    vm.$Message.success("删除成功");
                    vm.init();
                  }else{
                    vm.$Message.error(vm.errorCode[res.status]);
                    _this.buttonLoading=false;
                  }
                })
              }else{
                _this.buttonLoading=false;
              }
            });
          }
        };
        this.$Modal.confirm(config);

      },
      /**
       * 关联用户
       */
      relationDevice(row){
        // let vm=this;
        // let config={
        //   title:'关联用户',
        //   loading:true,
        //   width:1000,
        //   render:(h)=>{
        //     return h(relationUser,{
        //       _vm:vm
        //     })
        //   },
        //   onOk:function(){
        //
        //   }
        // };
        // this.$Modal.confirm(config);
        this.currentDid=row.did;
        this.$refs.relationUser.showModal(true);
      },

      /**
       * 显示详情
       * @param row
       */
      showDetails(row){
        // this.$refs.deviceDetails.showModal(true);
        // this.$refs.deviceDetails.init(row);
        let vm=this;
        let config={
          width:600,
          render:(h)=>{
            return h('div',[
              h('h3',{
                slot:'title'
              },'设备详情'),
              h(baseDetails,{
                props:{
                  _vm:vm,
                  formItem:{...row}
                }
              }),
            ]);
          },
          onOk:function(){

          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 禁用user
       * @param row
       */
      disableUser(row){
        let vm=this;
        let config={
          title:'禁用用户',
          content:'您是否想禁用这个用户',
          loading:true,
          onOk:function(){
            //调用禁用方法
            vm.handleDisableUser().then(res=>{

            })
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 重置 密码
       * @param row
       */
      resetPass(row){

      },
      /**
       * 固件 升级
       */
      firmwareUpdate(){

      }
    },
    mounted () {
      this.init();
    },
    created () {
    }
  }
</script>

<style scoped>
  .base_btn_item{
    margin-right: 5px;
  }
  .btnMargin{
    margin-left:3px;
  }
</style>
