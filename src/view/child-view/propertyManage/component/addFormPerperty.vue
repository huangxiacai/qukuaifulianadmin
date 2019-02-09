<template>
  <Modal
    v-model="showModalStatus"
    :title="title"
    :mask-closable="false"
    :footer-hide="true"
    @on-visible-change="visibleChange">
    <Form ref="formModel1" v-show="showBase" :model="formModel1" :rules="formRules1" label-position="top">
      <FormItem label="人员类型" prop="personType">
        <Select v-model="formModel1.personType" placeholder="请选择人员类型">
          <Option v-for="(item,index) in getPersonType" :key="index" :value="item.value">{{item.label}}</Option>
        </Select>
      </FormItem>
      <FormItem label="人员姓名" prop="name">
        <Input v-model="formModel1.name" placeholder="请输入人员姓名"></Input>
      </FormItem>
      <FormItem label="人员身份证号码" prop="idNum">
        <Input v-model="formModel1.idNum" placeholder="请输入人员身份证号码"></Input>
      </FormItem>
      <FormItem label="人员手机号码" prop="mobile">
        <Input v-model="formModel1.mobile" placeholder="请输入人员手机号码"></Input>
      </FormItem>
      <FormItem label="所属小区" prop="village">
        <Select v-model="formModel1.village" placeholder="请选择所属小区">
          <Option v-for="(item,index) in getVillageList" :key="index" :value="item.value">{{item.label}}</Option>
        </Select>
      </FormItem>
      <FormItem type="flex" justify="center" align="middle">
        <Row>
          <Col>
            <Button @click="next">录人人脸</Button>
          </Col>
        </Row>
      </FormItem>

    </Form>
    <Form ref="formModel2" v-show="showFace" :model="formModel2" :rules="formRules2" label-position="top">
      <FormItem>
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
      <FormItem class="formItemSty" type="flex" justify="center" align="middle" :gutter="16">
        <Button @click="showLast" class="margin_right">上一步</Button>
        <Button @click="submitMessage">完成</Button>
      </FormItem>
    </Form>

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
        title: '添加物业人员',
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
          this.$refs.formModel2.resetFields();
          this.showBase = true;
          this.showFace = false;
        }
      },
      submitMessage() {

      },
      showLast() {
        this.showFace = false;
        this.showBase = true;
      },
      next() {
        this.$refs.formModel1.validate((val) => {
          if (val) {
            this.showFace = true;
            this.showBase = false;
          }
        })
      }
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style scoped>
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
</style>
