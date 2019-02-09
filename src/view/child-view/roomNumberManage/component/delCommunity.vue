<template>
  <div>
    <div :style="{height:'100px','line-height':'100px',textAlign:'center'}">本次操作需要动态验证码验证。</div>
    <Form :ref="refName" :model="formModel" :rules="formRules" :label-width="80">
      <FormItem label="验证码" prop="vcode">
        <Input v-model="formModel.vcode" :maxlength="6" placeholder="请填写验证码">
          <Button slot="append" @click="getVcode" :disabled="disabledBtn">{{vcodeText}}</Button>
        </Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {renderFormMixins} from '../../mixins/rendFormMixins'
  export default {
    name: "delCommunity",
    mixins: [renderFormMixins],
    data() {
      return {
        disabledBtn:false,
        vcodeText:'获取验证码',
        formModel:{
          vcode:null
        },
        formRules:{
          vcode:[
            { required: true,pattern: /^[0-9]{6}$/, message: '验证码为6位纯数字', trigger: 'change' }
          ]
        }
      }
    },
    components: {},
    computed: {},
    methods: {
      getVcode(){
        let vm=this;
        this.$refs[this.refName].validateField('vcode',(res)=>{
          if(res==''){
            //发起请求并设置时间
            let time=60;
            vm.disabledBtn=true;
            let setInter=setInterval(function(){
              if(time==0){
                vm.disabledBtn=false;
                vm.vcodeText='获取验证码';
                clearInterval(setInter)
              }else{
                time--;
                vm.vcodeText=time+"s";
              }
            },1000)
          }
        });
      }
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style scoped>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
