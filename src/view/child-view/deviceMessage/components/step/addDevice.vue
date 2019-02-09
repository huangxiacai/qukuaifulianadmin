<template>
  <Form :ref="refName" :model="formModel" :rules="formRules" inline>
    <FormItem label="设备ID" prop="did" class="layout50">
      <Input :disabled="isEdit" v-model="formModel.did" placeholder="请输入设备名称" style="width:100%"></Input>
    </FormItem>
    <!--<FormItem label="设备名称" prop="name" class="layout50">-->
      <!--<Input v-model="formModel.name" placeholder="请输入设备名称" style="width:100%"></Input>-->
    <!--</FormItem>-->
    <FormItem label="所属小区" prop="building_guid" class="layout50">
      <Select v-model="formModel.building_guid"
              placeholder="请选择所属小区">
        <Option v-for="(item,index) in communityListData"
                :key="index"
                :value="item.value"
                :label="item.label">{{item.label}}</Option>
      </Select>
    </FormItem>
    <FormItem label="大门位置" prop="site" class="layout50">
      <Input v-model="formModel.site" placeholder="请输入大门位置" style="width:100%"></Input>
    </FormItem>
    <FormItem label="出入口" prop="direction" class="layout50">
      <Select v-model="formModel.direction"
              placeholder="请选择出入口">
        <Option v-for="(item,index) in directionList"
                :key="index"
                :value="item.value"
                :label="item.label">{{item.label}}</Option>
      </Select>
    </FormItem>
  </Form>
</template>

<script>
  //封装表单的检验
  import {renderFormMixins} from "../../../mixins/rendFormMixins";
  import {getPersonTree} from '../../../../../libs/util'

  export default {
    name: "handleDevice",
    mixins: [renderFormMixins],
    data() {
      return {
        directionList:[
          {
            value:2,
            label:"出入"
          },
          {
            value:1,
            label:"入口"
          },
        ],
        DevicesecCodeText:'获取验证码',
        deviceIdDisabled:true,//获取安全btn status
        formModel: {
          did: null,//设备id
          name: null,//设备姓名
          site: null,//安装 地址
          direction:null,
          building_guid:null,
        },
        formRules: {
          did:[
            { required: true, message: '设备ID不能为空', trigger: 'change' },
            {pattern: /^[0-9a-zA-Z]{18}$/,message: '设备ID由十八位数字和字母组成', trigger: 'change'},
          ],
          name:[
            { required: true, message: '设备名称不能为空', trigger: 'blur' }
          ],
          site:[
            { required: true, message: '设备位置不能为空', trigger: 'blur' }
          ],
          building_guid:[
            { required: true, message: '请选择所属小区', trigger: 'change' }
          ],
          direction:[
            { required: true,type:'number', message: '请选择设备方向', trigger: 'change' }
          ]
        }
      }
    },
    props: {
      width: {
        type: Number,
        default: 800
      },
      height:{
        type: Number,
        default: 300
      },
      _vm:{},
      isEdit:{
        type:Boolean,
        default:false
      },
      getModelData: {}
    },
    components: {},
    computed: {
      communityListData(){
        return this._vm.$store.state.communtiyListArr
      }
    },
    methods: {
      init(params) {
        debugger
          Object.assign(this.formModelData,params)
      },
      reset(){
        this.formModelData={
          region_id:null,//当前区域id
          deviceId: null,//设备id
            deviceName: null,//设备姓名
          address: null,//安装 地址
          longitudeAddress: null,////经度
          jurisdictionalArea: [],//所辖区域
          latitudeAddress: null,//纬度
        }
      },
      /**
       * 获取安全码
       */
      getDevicesecCode(){
        let vm=this;
        let time=120;
        vm.deviceIdDisabled=true;//按钮不可再点击
        this._vm.$store.dispatch("handleSendDevicesecCode",{
          did:vm.formModelData.deviceId
        }).then((res)=>{
          if(res.status===0){
            vm.$Message.success("获取验证码成功");
            let setinter=setInterval(function(){
              if(time===0){
                clearInterval(setinter);
                vm.deviceIdDisabled=false;
                vm.DevicesecCodeText='获取验证码';
              }else{
                vm.DevicesecCodeText=time+"s";
                time--;
              }
            },1000)
            //改变按钮 状态
          }else{
            vm.deviceIdDisabled=false;
            vm.$Message.error(this.errorCode[res.status]);
          }
        });
      },
      /**
       * 设备IDchange
       * @param value
       */
      deviceIdChange(){
        let vm=this;
        if(this.formModelData.deviceId.length>=18){
          this.$refs[this.refName].validateField('deviceId',function(res){
            if(res==''){
              vm.deviceIdDisabled=false;
            }else{
              vm.deviceIdDisabled=true;
            }
          });
        }else{
          vm.deviceIdDisabled=true;
        }
      }
    },
    mounted() {
    },
    created() {
      if(this.getModelData!=undefined){
        Object.assign(this.formModel,this.getModelData)
      }
    }
  }
</script>

<style scoped>
  .layout50, .layout100 {
    margin-bottom: 15px;
  }

  .layout50 {
    width: calc(50% - 12px);
  }

  .layout100 {
    width: calc(100% - 12px);
  }

  .formHeight {
    height: 400px;
    overflow-y: auto;
  }
</style>
