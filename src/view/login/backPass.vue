<template>
  <Modal
    v-model="showModalStatus"
    :footer-hide="true"
    :width="450"
    :mask-closable="false"
    @on-visible-change="visibleChangeModal"
    :title="'找回密码'">
    <Icon type="ios-close" slot="close" @click="showModal(false)"/>
    <Steps :current="currentStep" :status="currentStatus">
      <Step v-for="(item,index) in stepData"
            :key="index"
            :title="item.title"
            :status="item.status"
            :content="item.content"></Step>
    </Steps>
    <Card style="margin-top:10px">
      <Form :ref="refbackPass"
            v-show="showGetMobileStatus"
            :model="backPassFormModel"
            :rules="backPassFormRules"
            label-position="left"
            :label-width="80">
        <FormItem label="手机号" prop="mobile" class="layout100">
          <Input v-model="backPassFormModel.mobile" :maxlength="11" @on-change="mobileBlur"></Input>
        </FormItem>
        <FormItem label="验证码" prop="vcode" class="layout100">
          <Input v-model="backPassFormModel.vcode" :maxlength="6" @on-change="checkVcodeBlur">
            <Button type="success" slot="append" @click="sendVcode" :loading="vcodeLoading" :disabled="disabledBtn">
              {{btnName}}
            </Button>
          </Input>
        </FormItem>
        <Button type="success" @click="next"  long>下一步</Button>
      </Form>
      <Form :ref="refresetPass" v-show="showResetPassStatus" :model="resetFormModel" :rules="resetRules" inline>
        <FormItem label="新密码" prop="new_pass" class="layout100">
          <Input v-model="resetFormModel.new_pass" :type='passwordType' :maxlength="11">
            <Icon :type="passwordEye" slot="suffix" @click="clickPasswordEye" style="cursor:pointer"/>
          </Input>
        </FormItem>
        <FormItem label="重复新密码" prop="argin_pass" class="layout100">
          <Input v-model="resetFormModel.argin_pass" :type='passwordType1' :maxlength="11">
            <Icon :type="passwordEye1" slot="suffix" @click="clickPasswordEye1" style="cursor:pointer"/>
          </Input>
        </FormItem>
        <Button type="success" @click="submitReset" :loading="submitResetLoading" long>确认</Button>
      </Form>
    </Card>
  </Modal>
</template>

<script>
  import {modalTemplateMixins} from "../../view/child-view/mixins/modalTemplateMixins";

  export default {
    name: "backPass",
    mixins: [modalTemplateMixins],
    data() {
      const validatePass = (rule, value, callback) => {
        let regu = /^([A-Za-z0-9]){6,12}$/;
        let re = new RegExp(regu);
        if (value === '' || value === null) {
          callback(new Error('请输入新密码'));
        } else {
          if (!re.test(value)) {
            callback(new Error('密码长度为6-12位'));
          }
          if (this.resetFormModel.argin_pass !== '') {
            // 对第二个密码框单独验证
            this.$refs[this.refresetPass].validateField('argin_pass');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        let regu = /^([A-Za-z0-9]){6,12}$/;
        let re = new RegExp(regu);
        if (value === '' || value === null) {
          callback(new Error('请再次输入新密码'));
        } else if (!re.test(value)) {
          callback(new Error('密码长度为6-12位'));
        } else if (value !== this.resetFormModel.new_pass) {
          callback(new Error('与上次输入的密码不一致！'));
        } else {
          callback();
        }
      };
      const validateMobile=(rule, value, callback)=>{
        let regu =/^1(3|4|5|6|7|8|9)\d{9}$/;
        let re = new RegExp(regu);
        if(value==='' || value===null){
          callback(new Error("手机号不能为空"));
        }else if(!re.test(value)){
          callback(new Error("手机号格式不正确"));
        }else{
          // 对验证码单独验证
          this.$refs[this.refbackPass].validateField('vcode');
          callback();
        }
      };
      const validateVcode=(rule, value, callback)=>{
        let regu =/^[0-9]{6}$/;
        let re = new RegExp(regu);
        if(value==='' || value==null){
          callback(new Error("验证码不能为空"));
        }else if(!re.test(value)){
          callback(new Error('验证码6位数字'));
        }else{
          callback();
        }
      };
      return {

        passwordType: 'password',//密码框是否显示星号
        passwordEye: 'ios-eye-off',
        passwordType1: 'password',//密码框是否显示星号
        passwordEye1: 'ios-eye-off',
        stepData: [
          {
            title: '',
            content: '输入手机号',
            status: 'process',
          },
          {
            title: '',
            content: '验证码',
            status: 'wait',
          },
          {
            title: '',
            content: '重置密码',
            status: 'wait',
          },
          {
            title: '',
            content: '完成',
            status: 'wait',
          }
        ],
        showGetMobileStatus: true,//
        showResetPassStatus: false,//显示与隐藏重置密码
        vcodeLoading: false,//loading
        submitResetLoading: false,//loading
        currentStep: 0,
        currentStatus: 'process',
        btnName: '验证码',
        refbackPass: 'refbackPassRef',
        refresetPass: 'refresetPass',
        disabledBtn: true,//
        backPassFormModel: {
          mobile: null,
          vcode: null
        },
        resetFormModel: {
          new_pass: null,
          argin_pass: null
        },
        resetRules: {
          new_pass: [{validator: validatePass, trigger: 'change'}],
          argin_pass: [{validator: validatePassCheck, trigger: 'change'}],
        },
        backPassFormRules: {
          mobile: [
            {required: true,validator: validateMobile, trigger: 'change'},
          ],
          vcode: [
            {required: true,validator: validateVcode, trigger: 'change'},
          ]
        }
      }
    },
    props: {},
    methods: {
      clickPasswordEye() {
        if (this.passwordEye === 'ios-eye-off') {
          this.passwordEye = 'ios-eye';
          this.passwordType = 'text';
        } else if (this.passwordEye === 'ios-eye') {
          this.passwordEye = 'ios-eye-off';
          this.passwordType = 'password';
        }
      },
      clickPasswordEye1() {
        if (this.passwordEye1 === 'ios-eye-off') {
          this.passwordEye1 = 'ios-eye';
          this.passwordType1 = 'text';
        } else if (this.passwordEye1 === 'ios-eye') {
          this.passwordEye1 = 'ios-eye-off';
          this.passwordType1 = 'password';
        }
      },
      //重置密码
      submitReset() {
        let vm = this;
        this.submitResetLoading = true;
        this.formCheckPass().then(res => {
          debugger
          if (res) {
            let params = {
              new_pass: vm.resetFormModel.new_pass,
              vcode: vm.backPassFormModel.vcode,
              mobile: vm.backPassFormModel.mobile
            };
            vm.$store.dispatch("handleRecoverPass", params).then(res => {
              vm.submitResetLoading = false;
              if (res.status === 0) {
                vm.currentStep = 3;
                vm.stepData[vm.currentStep].status = 'finish';//
                vm.currentStatus = 'finish';
                //重置密码成功
                vm.$Modal.success("重置密码成功");
                vm.showModal(false);
              } else {
                //vm.currentStep=3;
                vm.currentStatus = 'error';
                vm.$Message.error(vm.errorCode[res.status]);
              }
            });
          } else {
            vm.submitResetLoading = false;
          }
        });
      },
      //发送验证码
      sendVcode() {
        let vm = this;
        this.vcodeLoading = true;
        this.$store.dispatch("handleSendVcode", {
          "country_code": '86',
          "mobile": vm.backPassFormModel.mobile,
          "class": 3//找回密码
        }).then(res => {
          vm.vcodeLoading = false;
          if (res.status === 0) {
            vm.$Message.success("发送成功");
            //倒计时
            vm.disabledBtn = true;
            let btnName = 60;
            let setout = setInterval(function () {
              debugger
              btnName--
              if (btnName === 1) {
                clearInterval(setout);
                vm.btnName = '验证码';
                vm.disabledBtn = false;
              } else {
                vm.btnName = btnName + 's';
              }
            }, 1000);
          } else {
            vm.$Message.error(this.errorCode[res.status]);
          }
        });
      },
      //下一步操作
      next() {
        let vm = this;
        this.formCheckMobile().then(res => {
          if (res) {
            vm.showGetMobileStatus = false;
            vm.showResetPassStatus = true;
            //steps 进行到2
            vm.currentStep = 2;
            vm.currentStatus = 'process'
          } else {
            vm.showGetMobileStatus = true;
            vm.showResetPassStatus = false;
            vm.currentStep = 0;
            //检查状态

          }
        });
      },
      formCheckMobile() {
        return new Promise(((resolve, reject) => {
          this.$refs[this.refbackPass].validate((valid) => {
            resolve(valid)
          });
        }));
      },
      //重置密码
      formCheckPass() {
        return new Promise(((resolve, reject) => {
          this.$refs[this.refresetPass].validate((valid) => {
            resolve(valid)
          });
        }));
      },
      /**
       * 手机号失去焦点后，验证是否正确的手机号
       */
      mobileBlur() {
        let vm = this;
        this.$refs[this.refbackPass].validateField('mobile', (res) => {
          if (res == "") {
            vm.currentStep = 1;
            vm.stepData[vm.currentStep].status = 'process';//
            vm.disabledBtn = false;
          } else {
            vm.currentStep = 0;
            vm.stepData[vm.currentStep].status = 'error';//
            vm.currentStatus = 'error';
            vm.disabledBtn = true;
          }
        });
      },
      /**
       *验证码校验
       */
      checkVcodeBlur() {
        this.mobileBlur();
        let vm = this;
        this.$refs[this.refbackPass].validateField('vcode', (res) => {
          if (res == "") {
            vm.currentStep = 1;
            vm.stepData[vm.currentStep].status = 'finish';//

          } else {
            vm.currentStep = 1;
            vm.stepData[vm.currentStep].status = 'error';//
            vm.currentStatus = 'error'
          }
        });
      },
      visibleChangeModal(b) {
        if (b) {

        } else {
          this.disabledNextBtn = true;
          this.passwordType = 'password';//密码框是否显示星号
          this.passwordEye = 'ios-eye-off';
          this.passwordType1 = 'password';//密码框是否显示星号
          this.passwordEye1 = 'ios-eye-off';
          //重置状态
          this.stepData = [
            {
              title: '',
              content: '输入手机号',
              status: 'process',
            },
            {
              title: '',
              content: '验证码',
              status: 'wait',
            },
            {
              title: '',
              content: '重置密码',
              status: 'wait',
            },
            {
              title: '',
              content: '完成',
              status: 'wait',
            }
          ];
          this.showGetMobileStatus = true;//
          this.showResetPassStatus = false;//显示与隐藏重置密码
          this.vcodeLoading = false;//loading
          this.submitResetLoading = false;//loading
          this.currentStep = 0;
          this.currentStatus = 'process';
          this.btnName = '验证码';
          this.disabledBtn = true;
          //重置 表单检验
          this.$refs[this.refbackPass].resetFields();
          this.$refs[this.refresetPass].resetFields();
        }
      }

    },
    mounted() {

    },
    created() {

    }
  }
</script>

<style scoped>
  .layout50, .layout100 {
    margin-bottom: 20px;
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
