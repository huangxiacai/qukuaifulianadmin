<template>
  <div>
    <Form :ref="refName"
          :model="getData"
          :rules="getRult"
          label-position="top"
          class="show_area" inline>
      <FormItem label="法师名称" class="qdd_layout50" prop="rabbiName">
        <Input v-model="getData.rabbiName"  placeholder="请输入法师名称"
               class="setfill"></Input>
      </FormItem>
      <FormItem label="法师福豆价格" class="qdd_layout50" prop="price">
        <InputNumber v-model="getData.price" placeholder="请输入法师福豆价格"
                     class="setfill"></InputNumber>
      </FormItem>
      <FormItem label="法师周期" class="qdd_layout50" prop="time">
        <InputNumber v-model="getData.time" placeholder="请输入法师周期"
                     class="setfill"></InputNumber>
      </FormItem>
      <FormItem label="一级分销福豆" class="qdd_layout50" prop="oneGenerateBean">
        <InputNumber v-model="getData.oneGenerateBean" placeholder="请输入一级分销福豆"
                     class="setfill"></InputNumber>
      </FormItem>
      <FormItem label="二级分销福豆" class="qdd_layout50" prop="twoGenerateBean">
        <InputNumber v-model="getData.twoGenerateBean" placeholder="请输入二级分销福豆"
                     class="setfill"></InputNumber>
      </FormItem>
      <FormItem label="最终回馈的福豆" class="qdd_layout50" prop="finalFeedback">
        <InputNumber v-model="getData.finalFeedback" placeholder="请输入最终回馈的福豆"
                     class="setfill"></InputNumber>
      </FormItem>

      <FormItem label="是否上架" class="qdd_layout50" prop="isSell">
        <Select v-model="getData.isSell"
                placeholder="请选择是否上架"
                class="setfill"
                :transfer="true">
          <Option v-for="item in isSellData"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
        <FormItem label="法师Logo图地址" class="qdd_layout100" prop="logo">
            <div class="demo-upload-list" v-for="item in uploadList">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :data="updateDate"
                    :default-file-list="defaultList"
                    :with-credentials="true"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    type="drag"
                    :action="uploadUrl"
                    style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="查看图片" v-model="visible">
                <img :src="fileImgPrefix+''+imgName" v-if="visible" style="width: 100%">
            </Modal>
        </FormItem>

    </Form>
  </div>

</template>

<script>
  import { renderFormMixins } from '../../mixins/rendFormMixins'

  export default {
    name: 'addBannerManage',
    mixins: [renderFormMixins],
    data () {
      return {
        accUploadNum:1,//允许上传的张数
        updateDate:{
          type:7,
        },
        defaultList: [
        ],
        imgName: '',
        visible: false,
        uploadList: [],
        isSellData:[
          {
            value:1,
            label:'上架',
          },
          {
            value:2,
            label:'下架',
          }
        ],
        getData: {
          logo:null,
          finalFeedback:null,
          isSell:null,
          time:null,
          oneGenerateBean:null,
          twoGenerateBean:null,
          price:null,
          rabbiName:null
        },
        getRult: {
          price: [
            { required: true,type:'number', message: '请填写法师福豆价格', trigger: 'blur' }
          ],
          isSell: [
            { required: true,type:'number', message: '请选择是否上架', trigger: 'change' }
          ],
          finalFeedback: [
            { required: true,type:'number', message: '请填写最终回馈的福豆', trigger: 'blur' }
          ],
          time: [
            { required: true,type:'number', message: '请填写法师周期', trigger: 'blur' }
          ],
          oneGenerateBean: [
            { required: true,type:'number', message: '请填写一级分销福豆', trigger: 'blur' }
          ],
          twoGenerateBean: [
            { required: true,type:'number', message: '请填写二级分销福豆', trigger: 'blur' }
          ],
            rabbiName: [
            { required: true, message: '请填写法师名称', trigger: 'blur' }
          ]
        }
      }
    },
    props: {
      setData: {
        type: Object,
        default: null
      },
      _vm:{

      }
    },
    components: {},
    computed: {
      uploadUrl(){
        let root=this.$config.baseUrl.pro;
        if(process.env.NODE_ENV !== 'production'){
          root='';
        }
        return root+"/manager/file/upload"
      },
      //文件前缀
      fileImgPrefix(){
        let root=this.$config.imgUrl.pro;
        if(process.env.NODE_ENV !== 'production'){
          root=this.$config.imgUrl.dev;
        }
        return root;
      }
    },
    methods: {
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      /**
       * 删除照片
       * @param file
       */
      handleRemove (file) {
        debugger
        let vm=this;
        this._vm.$store.dispatch("handledelFile",{
          file:file.name
        }).then(res=>{
          if(res.code===20000){
            debugger
            const fileList = vm.$refs.upload.fileList;
            vm.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
          }else{

          }
        });

      },
      /**
       * 上传成功
       * @param res
       * @param file
       */
      handleSuccess (res, file) {
        if(res.code===20000){
          this.getData.logo=res.data;
          file.url = this.fileImgPrefix+""+res.data;
          file.name = res.data;
        }else{

        }

      },
      /**
       * 上传格式错误
       * @param file
       */
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式错误',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      /**
       * 超过最大尺寸
       * @param file
       */
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超过文件最大尺寸',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      /**
       * 上传之前的检查
       * @returns {boolean}
       */
      handleBeforeUpload () {
        const check = this.uploadList.length < this.accUploadNum;
        if (!check) {
          this.$Notice.warning({
            title: '超过允许上传的最大张数'
          });
        }
        return check;
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    },
    created () {
      if(this.setData!=undefined){
        Object.assign(this.getData,this.setData);
        debugger
        if(this.setData.logo!="暂无"){
          this.defaultList=[{
            name:this.setData.logo,
            url: this.fileImgPrefix+""+this.setData.logo
          }];
        }
      }
    }
  }
</script>

<style scoped>
  .setfill {
    width: 100%;
  }

  .show_area {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .qdd_layout50, .qdd_layout100 {
    margin-bottom: 18px;
  }

  .qdd_layout50 {
    width: calc(50% - 12px)
  }

  .qdd_layout100 {
    width: calc(100% - 12px)
  }
  #bdmap{
    height:450px;
    width:100%;
    margin:-16px;
  }
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
