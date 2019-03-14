<template>
  <Form :ref="refName" :model="editPassFormModel" :rules="editPassFormRules" inline>
    <FormItem label="原始密码" prop="old_pass" class="layout100">
      <Input :type="passwordType" :maxlength="12" v-model="editPassFormModel.old_pass" >
        <Icon :type="passwordEye" slot="suffix" @click="clickPasswordEye" style="cursor:pointer" />
        </Input>
    </FormItem>
    <FormItem label="新密码" prop="new_pass" class="layout100">
      <Input :type="passwordType1" :maxlength="12" v-model="editPassFormModel.new_pass">
        <Icon :type="passwordEye1" slot="suffix" @click="clickPasswordEye1" style="cursor:pointer" />
        </Input>
    </FormItem>
    <FormItem label="重复新密码" prop="re_new_pass" class="layout100">
      <Input :type="passwordType2" :maxlength="12" v-model="editPassFormModel.re_new_pass">
        <Icon :type="passwordEye1" slot="suffix" @click="clickPasswordEye2" style="cursor:pointer" />
        </Input>
    </FormItem>
  </Form>
</template>

<script>
  import {renderFormMixins} from "../../../view/child-view/mixins/rendFormMixins";
  export default {
    name: "editPassword",
    mixins:[renderFormMixins],
    data() {
      const validatePass = (rule, value, callback) => {
        let regu =/^([\d\D]){6,12}$/;
        let re = new RegExp(regu);
        if (value === '') {
          callback(new Error('密码长度为6-12位'));
        } else {
          if(!re.test(value)){
            callback(new Error('密码长度为6-12位'));
          }
          if (this.editPassFormModel.re_new_pass !== '') {
            // 对第二个密码框单独验证
            this.$refs[this.refName].validateField('re_new_pass');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        let regu =/^([\d\D]){6,12}$/;
        let re = new RegExp(regu);
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        }else if(!re.test(value)){
          callback(new Error('密码长度为6-12位'));
        } else if (value !== this.editPassFormModel.new_pass) {
          callback(new Error('与上次输入的密码不一致！'));
        } else {
          callback();
        }
      };
      return {
        passwordType:'password',//密码框是否显示星号
        passwordEye:'ios-eye-off',
        passwordType1:'password',//密码框是否显示星号
        passwordEye1:'ios-eye-off',
        passwordType2:'password',//密码框是否显示星号
        passwordEye2:'ios-eye-off',
        editPassFormModel:{
          old_pass:null,
          new_pass:null,
          re_new_pass:null
        },
        editPassFormRules:{
          old_pass:[
            { required: true, message: '原密码不能为空', trigger: 'change' },
            { pattern: /^([\d\D]){6,12}$/, message: '密码长度为6-12位', trigger: 'change' }
          ],
          new_pass: [
            {required: true, validator: validatePass, trigger: 'change' }
          ],
          re_new_pass: [
            { required: true,validator: validatePassCheck, trigger: 'change' }
          ],
        }
      }
    },
    props:{

    },
    methods:{
      clickPasswordEye(){
        if(this.passwordEye==='ios-eye-off'){
          this.passwordEye='ios-eye';
          this.passwordType='text';
        }else if(this.passwordEye==='ios-eye'){
          this.passwordEye='ios-eye-off';
          this.passwordType='password';
        }
      },
      clickPasswordEye1(){
        if(this.passwordEye1==='ios-eye-off'){
          this.passwordEye1='ios-eye';
          this.passwordType1='text';
        }else if(this.passwordEye1==='ios-eye'){
          this.passwordEye1='ios-eye-off';
          this.passwordType1='password';
        }
      },
      clickPasswordEye2(){
        if(this.passwordEye2==='ios-eye-off'){
          this.passwordEye2='ios-eye';
          this.passwordType2='text';
        }else if(this.passwordEye2==='ios-eye'){
          this.passwordEye2='ios-eye-off';
          this.passwordType2='password';
        }
      },

    },
    mounted(){

    },
    created(){

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
