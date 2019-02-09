<template>
  <Form :ref="refName"
        :model="formModelData"
        :rules="ruleValidate"
        :width="width"
        class="formHeight"
        :style="{height:height+'px'}"
        inline>
    <FormItem label="设备ID" prop="deviceId" class="layout50">
      <Input v-model="formModelData.deviceId" placeholder="请输入设备ID" style="width:100%"></Input>
    </FormItem>
    <FormItem label="设备名称" prop="deviceName" class="layout50">
      <Input v-model="formModelData.deviceName" placeholder="请输入设备名称" style="width:100%"></Input>
    </FormItem>
    <FormItem label="安装地址" class="layout50">
      <Input v-model="formModelData.address" placeholder="请输入安装地址" style="width:100%"></Input>
    </FormItem>
    <FormItem label="所属区域" class="layout50" prop="jurisdictionalArea">
      <Cascader v-model="formModelData.jurisdictionalArea"
                :data="getAreaDataTree"
                filterable
                placeholder="请选择所属区域"
                :transfer="true"
                style="width:100%"
                change-on-select></Cascader>
    </FormItem>
    <FormItem label="地址经度" class="layout50">
      <InputNumber  v-model="formModelData.longitudeAddress" placeholder="请输入地址经度" style="width:100%"></InputNumber>
    </FormItem>
    <FormItem label="地址纬度" class="layout50">
      <InputNumber  v-model="formModelData.latitudeAddress" placeholder="请输入地址纬度" style="width:100%"></InputNumber>
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

        formModelData: {
          deviceId: null,//设备id
          deviceName: null,//设备姓名
          address: null,//安装 地址
          longitudeAddress: null,////经度
          jurisdictionalArea: [],//所辖区域
          latitudeAddress: null,//纬度
        },
        ruleValidate: {
          deviceId:[
            { required: true, message: '设备ID不能为空', trigger: 'blur' }
          ],
          deviceName:[
            { required: true, message: '设备名称不能为空', trigger: 'blur' }
          ],
          jurisdictionalArea:[
            {required: true,type:'array',min:1, message: '所属区域不能为空', trigger: 'change' }
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
      getModelData: {
        type: Object,
        default: function () {
          return {
            region_id:null,//当前区域id
            deviceId: null,//设备id
            deviceName: null,//设备姓名
            address: null,//安装 地址
            longitudeAddress: null,////经度
            jurisdictionalArea: [],//所辖区域
            latitudeAddress: null,//纬度
          }
        }
      }
    },
    components: {},
    computed: {
      getAreaDataTree(){
        if(!this._vm){
          return [];
        }
        return this._vm.$store.state.areaManage.areaListDataTree;
      },
      getAreaData(){
        if(!this._vm){
          return [];
        }
        return this._vm.$store.state.areaManage.areaListData;
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
      }
    },
    mounted() {
    },
    created() {
      Object.assign(this.formModelData,this.getModelData);
      if(this.formModelData.region_id){
        this.formModelData.jurisdictionalArea=getPersonTree(this.getAreaData,this.formModelData.region_id);
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
