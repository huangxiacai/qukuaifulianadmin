<template>
  <div>
    <Form :ref="refName"
          :model="getData"
          :rules="getRult"
          label-position="top"
          stype="margin-top:10px"
          class="show_area" inline>
      <FormItem label="排序字段" class="qdd_layout100"  prop="sort">
        <InputNumber :min="1" v-model="getData.sort"  placeholder="请输入排序字段"
               class="setfill"></InputNumber>
      </FormItem>

        <FormItem label="音乐URL" class="qdd_layout100" prop="musicSrc">
          <Input v-model="getData.musicSrc" v-show="false" placeholder="请上传音乐URL"
                       class="setfill"></Input>

            <Upload
                    ref="upload"
                    :show-upload-list="true"
                    :data="updateDate"
                    :default-file-list="defaultList"
                    :with-credentials="true"
                    :on-success="handleSuccess"
                    :format="format"
                    :max-size="maxSize"
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
        format:['mp3','mp4','3gp'],//上传格式
        maxSize:10240,//最大尺寸
        updateDate:{
          type:6,
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
          sort:null,
          musicSrc:null
        },
        getRult: {
          sort: [
            { required: true,type:'number', message: '请填写排序字段', trigger: 'blur' }
          ],
          musicSrc:[{ required: true,message: '请上传音乐文件', trigger: 'change' }],

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
          files:file.name
        }).then(res=>{
          if(res.code===20000){
            vm.getData.logo=null;
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
          this.getData.musicSrc=res.data;
          file.url = this.fileImgPrefix+""+res.data;
          file.name = res.data;
          debugger
          this.$set(this.uploadList,0,{
            status:'finish',
            url:file.url,
            name:file.name
          })
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
          desc: '可以上传'+this.format.join(",")+"等文件"
        });
      },
      /**
       * 超过最大尺寸
       * @param file
       */
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超过文件最大尺寸',
          desc: '文件的最大尺寸为'+maxSize
        });
      },
      /**
       * 上传之前的检查
       * @returns {boolean}
       */
      handleBeforeUpload () {
        let vm=this;
        if(vm.uploadList.length>0){
          this._vm.$store.dispatch("handledelFile",{
            files:vm.uploadList[0].name
          }).then(res=>{
            if(res.code===20000){
              vm.getData.logo=null;
              const fileList = vm.$refs.upload.fileList;
              vm.$refs.upload.fileList.splice(fileList.indexOf(vm.uploadList[0].name), 1);
            }else{

            }
          });
        }

        const check = true;
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
