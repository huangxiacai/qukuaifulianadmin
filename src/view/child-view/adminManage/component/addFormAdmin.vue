<template>
  <Modal
    v-model="showModalStatus"
    :title="title"
    :width="width"
    :mask-closable="false"
    @on-visible-change="visibleChange">
    <Form class="FormWrapper" ref="formModel1" v-show="showBase" :model="formModel1" :rules="formRules1" label-position="top" inline>
      <FormItem label="管理员姓名" prop="name" class="layout50">
        <Input v-model="formModel1.name" placeholder="请输入管理员姓名"></Input>
      </FormItem>
      <FormItem label="管理员身份证号码" prop="idNum" class="layout50">
        <Input v-model="formModel1.idNum" placeholder="请输入管理员身份证号码"></Input>
      </FormItem>
      <FormItem label="管理员手机号码" prop="mobile" class="layout50">
        <Input v-model="formModel1.mobile" placeholder="请输入人管理员手机号码"></Input>
      </FormItem>
      <FormItem label="所管小区" prop="village" class="layout50">
        <Select v-model="formModel1.village" placeholder="请选择所管小区">
          <Option v-for="(item,index) in getVillageList" :key="index" :value="item.value">{{item.label}}</Option>
        </Select>
      </FormItem>
      <FormItem label="管理员照片" class="layout100">
        <Row :gutter="16">
          <Col span="8">
            <FormItem type="flex" justify="center" align="middle">
              <div class="formImg">
                <img :src="faceLeft">
              </div>
              <div class="formImg">
                <img :src="faceRight">
              </div>
              <div >
                <Upload
                  multiple
                  action="//jsonplaceholder.typicode.com/posts/">
                  <Button icon="ios-cloud-upload-outline">上传左侧面照</Button>
                </Upload>
              </div>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem type="flex" justify="center" align="middle">
              <div class="formImg">
                <img :src="faceMiddle">
              </div>
              <div class="formImg">
                <img :src="faceRight">
              </div>
              <div>
                <Upload
                  multiple
                  action="//jsonplaceholder.typicode.com/posts/">
                  <Button icon="ios-cloud-upload-outline">上传正面照</Button>
                </Upload>
              </div>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem type="flex" justify="center" align="middle">
              <div class="formImg">
                <img :src="faceRight">
              </div>
              <div class="formImg">
                <img :src="faceRight">
              </div>
              <div>
                <Upload
                  multiple
                  action="//jsonplaceholder.typicode.com/posts/">
                  <Button icon="ios-cloud-upload-outline">上传右侧面照</Button>
                </Upload>
              </div>
            </FormItem>
          </Col>
        </Row>
      </FormItem>

    </Form>
    <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button @click="submit" :loading="btnLoading" type="primary">确定</Button>
    </div>
  </Modal>
</template>

<script>
  import {modalTemplateMixins} from '../../mixins/modalTemplateMixins'

  export default {
    name: "addFormPerperty",
    mixins: [modalTemplateMixins],
    data() {
      return {
        faceMiddle:'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',
        faceLeft:'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
        faceRight:'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
        showBase: true,
        showFace: false,
        title: '添加管理员',
        width:700,
        btnLoading:false,
        formRules1: {
          name: [
            {required: true, message: '请输入人员姓名', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '手机号不能为空', trigger: 'change'},
            {pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号格式不正确', trigger: 'change'}
          ],
          idNum: [
            {required: true, message: '身份证不能为空', trigger: 'change'},
            {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证格式不正确', trigger: 'change'}
          ],
          personType: [
            {required: true, message: '请选择人员类型', trigger: 'change'}
          ],
          village: [
            {required: true, message: '请选择小区名称', trigger: 'change'}
          ],
        },
        formModel1: {
          name: null,
          mobile: null,
          idNum: null,
          personType: null,
          village: null
        },
        formModel2: {
          faceLeft:null,
          faceMiddle:null,
          faceRight:null,
        },
        formRules2: {},
      }
    },
    components: {},
    computed: {
      /**
       * 人员类型
       * @returns {{}[]}
       */
      getPersonType() {
        return [
          {
            value: "1",
            label: '物业人员'
          },
          {
            value: "2",
            label: '临时人员'
          },
          {
            value: "3",
            label: '黑名单'
          }
        ]
      },
      /**
       * 获取小区列表
       */
      getVillageList() {
        return [
          {
            value: "1",
            label: '上东阳小区'
          },
          {
            value: "2",
            label: '绿叶小区'
          },
          {
            value: "3",
            label: '丰泽小区'
          }
        ]
      }
    },
    methods: {
      visibleChange(b) {
        if (b) {

        } else {
          this.$refs.formModel1.resetFields();
          this.btnLoading=false;
          this.showBase = true;
          this.showFace = false;
        }
      },
      showLast() {
        this.showFace = false;
        this.showBase = true;
      },
      submit(){
        let vm=this;
        this.btnLoading=true;
        this.$refs.formModel1.validate(val=>{
          if(val){
            this.showModal(false);
          }else{
            this.btnLoading=false;
          }
        });
      },
      cancel(){
        this.showModal(false);
      },

    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style scoped>
  .FormWrapper{
    height: 500px;
    overflow-y: auto;
  }
  .formImg{
    margin-bottom:10px;
  }
  .formImg img{
    width:100%;
    display: block;
  }
  .formItemSty{

  }
  .margin_right{
    margin-right: 5px;
  }
  .layout50, .layout100 {
    margin-bottom: 15px;
  }

  .layout50 {
    width: calc(50% - 12px);
  }

  .layout100 {
    width: calc(100% - 12px);
  }

</style>
