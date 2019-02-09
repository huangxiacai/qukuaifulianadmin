<template>
  <Form :ref="refName" :model="formModel" :rules="formRules" inline>
    <FormItem label="姓名" :prop="hasRequire?'user_name':''" :class="{layout50:true,hasRequireClass:!hasRequire}">
      <Input v-model="formModel.user_name" placeholder="请填写姓名">
      </Input>
    </FormItem>
    <FormItem label="人员类型" prop="user_type" class="layout50">
      <Select v-model="formModel.user_type" @on-change="userTypeChange" placeholder="请选择人员类型">
        <Option v-for="(item,index) in userTypeListArr"
                :key="index"
                :value="item.value"
                :label="item.label">{{item.label}}</Option>
      </Select>
    </FormItem>
    <FormItem label="身份证号码" :prop="hasRequire?'id_number':''" :class="{layout50:true,hasRequireClass:!hasRequire}">
      <Input v-model="formModel.id_number" placeholder="请填写身份证号码">
      </Input>
    </FormItem>
    <FormItem label="手机号" :prop="hasRequire?'mobile':''" :class="{layout50:true,hasRequireClass:!hasRequire}">
      <Input v-model="formModel.mobile" :maxlength="11" placeholder="请填写手机号">
      </Input>
    </FormItem>

    <FormItem label="所属小区" prop="building_guid" class="layout50">
      <Select v-model="formModel.building_guid" placeholder="请选择所属小区">
        <Option v-for="(item,index) in getArea"
                :key="index"
                :value="item.value"
                :label="item.label">{{item.label}}</Option>
      </Select>
    </FormItem>
    <FormItem v-if="formModel.user_type==11" label="获取验证码" :prop="hasRequire?'vcode':''" class="layout50">
      <Input v-model="formModel.vcode" :maxlength="6">
        <Button @click="getVcode" slot="append" :disabled="vcodeDisabled">{{getVcodeText}}</Button>
      </Input>
    </FormItem>
  </Form>

</template>

<script>
  import {renderFormMixins} from '../../mixins/rendFormMixins'
    export default {
        name: "addForm",
        mixins: [renderFormMixins],
        data() {
            return {
              vcodeDisabled:false,//按是否可点
              hasRequire:true,//是否必填
              communityListData:[],
              getVcodeText:"获取验证码",
              userTypeListArr:[
                {
                  value:11,
                  label:"物业人员"
                },
                {
                  value:12,
                  label:"快递"
                },
                {
                  value:13,
                  label:"外卖"
                },
                {
                  value:14,
                  label:"其它"
                },
                {
                  value:99,
                  label:"黑名单"
                }
              ],
              formModel:{
                user_type:null,
                user_name:null,
                building_guid:null,
                mobile:null,
                id_number:null,
                vcode:null
              },
              formRules:{
                building_guid:[
                  { required: true, message: '所属小区不能为空', trigger: 'change' }
                ],
                user_name:[
                  { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                user_type:[
                  { required: true,type:'number', message: '人员类型不能为空', trigger: 'change' }
                ],
                mobile:[
                  {required: true, message: '手机号不能为空', trigger: 'change'},
                  {pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号格式不正确', trigger: 'change'}
                ],
                vcode:[
                  {required: true, message: '验证码不能为空', trigger: 'change'},
                  {pattern: /^\d{6}$/, message: '验证码是6位整数', trigger: 'change'}
                ],
                id_number:[
                  {required: true, message: '身份证号不能为空', trigger: 'change'},
                  {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号不正确', trigger: 'change'}
                ],
              }
            }
        },
      props:{
          _vm:{},
        getModelData:{},
        getArea:{}
      },
        components: {},
        computed: {},
        methods: {
          /**
           * 获取验证码
           */
          getVcode(){
            let vm=this;
            //点击发送验证码
            this.vcodeDisabled=true;//按钮 不能再次点击
            this._vm.$store.dispatch("handleGetVCode",{}).then(res=>{
              if(res.status===0){
                vm._vm.$Message.success("验证码获取成功");
                vm.setTimeoutVcode();
              }else{
                vm._vm.$Message.error(vm.errorCode[res.status]);
                vm.vcodeDisabled=false;
              }
            });
          },
          setTimeoutVcode(){
            let time=60;
            let vm=this;
            let interval=setInterval(function(){
              if(time==0){
                clearInterval(interval);
                vm.getVcodeText="获取验证码";
                //按钮可再次点击
                vm.vcodeDisabled=false;
              }else{
                time--;
                vm.getVcodeText=time+"s";
              }
            },1000)
          },
          userTypeChange(value){
            //重置必填状态
            this.$refs[this.refName].resetFields();
            this.$set(this.formModel,"user_type",value);
            if(value==99 || value==14){
              this.hasRequire=false;
              this.$set(this.formRules.user_name[0],"require",false);
              this.$set(this.formRules.id_number[0],"require",false);
              this.$set(this.formRules.mobile[0],"require",false)
            }else{
              this.hasRequire=true;
              this.$set(this.formRules.user_name[0],"require",true);
              this.$set(this.formRules.id_number[0],"require",true);
              this.$set(this.formRules.mobile[0],"require",true)
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
  .hasRequireClass label:before{
    content: " "!important;
  }
</style>
