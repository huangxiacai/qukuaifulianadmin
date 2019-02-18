<template>
<div>
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
</div>
</template>

<script>
    export default {
        name: "uploadFile",
        mixins: [],
        data() {
            return {
              defaultList: [
              ],
              imgName: '',
              visible: false,
            }
        },
      props:{
        _vm:{},
        updateDate:{
          type:Object,
          default:function(){
            return{type:5}
          }
        },
        accUploadNum:{
          type:Number,
          default:1
        },
        uploadList:{
          type:Array,
          default:function(){
            return [];
          }
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
              files:file.name
            }).then(res=>{
              if(res.code===20000){
                this.$emit("handleRemove",{res:res,name:file.name});
                //vm.getData.logo=null;
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
              this.$emit("handleSuccess",res);
              //this.getData.shopImage=res.data;
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
        mounted() {
          // debugger
          // this.uploadList = this.$refs.upload.fileList;
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
