<template>
  <div>
    <Form :ref="refName" :model="formModel" :rules="formRules" :label-width="80">
      <FormItem label="小区名称" prop="name">
        <Input v-model="formModel.name" placeholder="请填写小区名称" :readonly="edit">
        </Input>
      </FormItem>
      <FormItem label="小区地址" prop="addr">
        <Input v-model="formModel.addr" placeholder="请填写小区地址" :readonly="edit">
        </Input>
      </FormItem>

      <!--<FormItem label="上传资质" prop="uploadQualifyList">-->
        <!--<div class="demo-upload-list" v-for="item in formModel.uploadQualifyList">-->
          <!--<template v-if="item.status === 'finished'">-->
            <!--<img :src="item.url">-->
            <!--<div class="demo-upload-list-cover">-->
              <!--<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>-->
              <!--<Icon v-show="!edit" type="ios-trash-outline" @click.native="handleRemove(item,qualifyRef)"></Icon>-->
            <!--</div>-->
          <!--</template>-->
          <!--<template v-else>-->
            <!--<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>-->
          <!--</template>-->
        <!--</div>-->
        <!--<Upload-->
          <!--v-show="!edit"-->
          <!--:ref="qualifyRef"-->
          <!--:show-upload-list="false"-->
          <!--:default-file-list="qualifyList"-->
          <!--:on-success="handleQualifySuccess"-->
          <!--:format="['jpg','jpeg','png']"-->
          <!--:max-size="2048"-->
          <!--:on-format-error="handleFormatError"-->
          <!--:on-exceeded-size="handleMaxSize"-->
          <!--:before-upload="handleQualifyBeforeUpload"-->
          <!--multiple-->
          <!--type="drag"-->
          <!--action="//jsonplaceholder.typicode.com/posts/"-->
          <!--style="display: inline-block;width:58px;">-->
          <!--<div style="width: 58px;height:58px;line-height: 58px;">-->
            <!--<Icon type="ios-camera" size="20"></Icon>-->
          <!--</div>-->
        <!--</Upload>-->
      <!--</FormItem>-->
      <!--<FormItem label="上传合同" prop="uploadContractList">-->
        <!--<div class="demo-upload-list" v-for="item in formModel.uploadContractList">-->
          <!--<template v-if="item.status === 'finished'">-->
            <!--<img :src="item.url">-->
            <!--<div class="demo-upload-list-cover">-->
              <!--<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>-->
              <!--<Icon v-show="!edit" type="ios-trash-outline" @click.native="handleRemove(item,contractRef)"></Icon>-->
            <!--</div>-->
          <!--</template>-->
          <!--<template v-else>-->
            <!--<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>-->
          <!--</template>-->
        <!--</div>-->
        <!--<Upload-->
          <!--v-show="!edit"-->
          <!--:ref="contractRef"-->
          <!--:show-upload-list="false"-->
          <!--:default-file-list="contractList"-->
          <!--:on-success="handleContractSuccess"-->
          <!--:format="['jpg','jpeg','png']"-->
          <!--:max-size="2048"-->
          <!--:on-format-error="handleFormatError"-->
          <!--:on-exceeded-size="handleMaxSize"-->
          <!--:before-upload="handleContractBeforeUpload"-->
          <!--multiple-->
          <!--type="drag"-->
          <!--action="//jsonplaceholder.typicode.com/posts/"-->
          <!--style="display: inline-block;width:58px;">-->
          <!--<div style="width: 58px;height:58px;line-height: 58px;">-->
            <!--<Icon type="ios-camera" size="20"></Icon>-->
          <!--</div>-->
        <!--</Upload>-->
      <!--</FormItem>-->
    </Form>
    <Modal title="View Image" v-model="visible">
      <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  import {renderFormMixins} from '../../mixins/rendFormMixins'
  export default {
    name: "delCommunity",
    mixins: [renderFormMixins],
    data() {
      return {
        edit:false,
        qualifyRef:'qualifyRef',
        contractRef:'contractRef',
        formModel:{
          name:null,
          addr:null,
          uploadQualifyList:[],
          uploadContractList:[]
        },
        formRules:{
          name:[
            { required: true, message: '小区名称不能为空', trigger: 'blur' }
          ],
          addr:[
            { required: true, message: '小区地址不能为空', trigger: 'blur' }
          ],
          uploadQualifyList:[
            { required: true, type: 'array', min: 1, message: '请上传资质照片', trigger: 'change' },
            { type: 'array', max: 5, message: '资质照片最多5张', trigger: 'change' }
          ],
          uploadContractList:[
            { required: true, type: 'array', min: 1, message: '请上传合同', trigger: 'change' },
            { type: 'array', max: 5, message: '合同最多5张', trigger: 'change' }
          ],
        },
        qualifyList:[
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        contractList:[
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
        ],

        imgName: '',
        visible: false,
        // uploadQualifyList:[],
        // uploadContractList:[],
      }
    },
    props:{
      getModelData:{}
    },
    components: {},
    computed: {},
    methods: {
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file,currRef) {
        const fileList = this.$refs[currRef].fileList;
        this.$refs[currRef].fileList.splice(fileList.indexOf(file), 1);
      },
      /**
       * 上传成功的回调
       * @param res
       * @param file
       */
      handleQualifySuccess (res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleContractSuccess(res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      /**
       * 上传之前
       * @returns {boolean}
       */
      handleQualifyBeforeUpload () {
        const check = this.formModel.uploadQualifyList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          });
        }
        return check;
      },
      handleContractBeforeUpload () {
        const check = this.formModel.uploadContractList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          });
        }
        return check;
      }
    },
    mounted() {
      // this.formModel.uploadQualifyList = this.$refs[this.qualifyRef].fileList;
      // this.formModel.uploadContractList = this.$refs[this.contractRef].fileList;
    },
    created() {
      Object.assign(this.formModel,this.getModelData)
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
