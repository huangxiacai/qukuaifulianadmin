<template>
    <div>
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>
            <FormItem label="商品名称" class="qdd_layout50" prop="productName">
                <Input v-model="getData.productName"  placeholder="请输入商品名称"
                       class="setfill"></Input>
            </FormItem>
            <FormItem label="商品分类" class="qdd_layout50" prop="productTypeId">
                <Select v-model="getData.productTypeId" placeholder="请选择商品分类" :transfer="true">
                    <Option v-for="item in productTypeData"
                            :value="item.value"
                            :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="商品的福豆价格" class="qdd_layout50" prop="amount">
                <InputNumber :min="0" v-model="getData.amount" class="setfill"></InputNumber>
            </FormItem>
            <FormItem label="购买商品添加的福利值" class="qdd_layout50" prop="addWelfare">
                <InputNumber  :min="0" v-model="getData.addWelfare" class="setfill"></InputNumber>
            </FormItem>
            <FormItem label="商品LOGO图地址" class="qdd_layout50" prop="logo">
              <uploadFile
                          ref="uploadLogoList"
                          :updateDate="updateDate"
                          @init="uploadLogoFileInit"
                          :_vm="_vm"
                          @handleRemove="removeLogo"
                          @handleSuccess="uploadLogoSuccess"></uploadFile>
            </FormItem>
            <FormItem label="商品图片" class="qdd_layout50" prop="image">
              <uploadFile
                          ref="uploadimageList"
                          :isMultiple="true"
                          :accUploadNum="5"
                          :_vm="_vm"
                          @init="uploadImageFileInit"
                          @handleRemove="removeImage"
                          @handleSuccess="uploadImgSuccess"
                          :updateDate="updateDate"></uploadFile>
            </FormItem>
            <FormItem label="商品运费" class="qdd_layout50" >
                <InputNumber  :min="0" class="setfill"  v-model="getData.freight" placeholder="请填写商品运费"></InputNumber>
            </FormItem>
          <FormItem label="商品详情" prop="productDetail" class="qdd_layout100">
            <Input v-model="getData.productDetail"
                   type="textarea"
                   :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请填写商品详情"></Input>
          </FormItem>
        </Form>
    </div>

</template>

<script>
  import { renderFormMixins } from '../../mixins/rendFormMixins'
  import uploadFile from '../../comontents/uploadFile'
  export default {
    name: 'addCommody',
    mixins: [renderFormMixins],
    data () {
      return {
        uploadLogoList:[],
        uploadimageList:[],
        updateDate:{
          type:2,
        },
        defaultList: [
        ],
        getStatus:[
          {
            value:0,
            label:'上架',
          },
          {
            value:1,
            label:'下架',
          }
        ],
        getType:[
          {
            value:0,
            label:'跳转',
          },
          {
            value:1,
            label:'不跳转',
          }
        ],
        currPoint: {}, // 当前point
        modal_loading: false,
        dbmap: null, // 地图对象
        mapModel: false,
        meetingTime: null,
        getData: {
          productName:null,
          productTypeId:null,
          amount:null,
          addWelfare:null,
          productDetail:null,
          logo:null,
          image:[],
          freight:null
        },
        getRult: {
          productName: [
            { required: true, message: '请填写商品名称', trigger: 'blur' }
          ],
          productTypeId: [
            { required: true,type:'number', message: '商品分类Id', trigger: 'change' }
          ],
          amount: [
            { required: true,type:'number', message: '请填写商品的福豆价格', trigger: 'change' }
          ],
          addWelfare: [
            { required: true,type:'number', message: '请选择购买商品添加的福利值', trigger: 'change' }
          ],
          productDetail: [
            { required: true,message: '请填写商品详情', trigger: 'blur' }
          ],
          logo:[
            { required: true,message: '请填写商品LOGO图地址', trigger: 'blur' }
          ],
          image:[
            { required: true,type:'array',message: '请填写商品图片', trigger: 'blur' }
          ]
        }
      }
    },
    computed:{
      productTypeData(){
        return this._vm.$store.state.shopManage.productTypeData
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
    props: {
      _vm:{

      },
      setData: {
        type: Object,
        default: null
      }
    },
    components: {
      uploadFile
    },
    methods: {
      removeLogo({res,name}){
        if(res.code===20000){
          this.getData.logo=null;
        }
      },
      removeImage({res,name}){
        if(res.code===20000){
          this.getData.image.splice(name,1)
        }
      },
      uploadLogoSuccess(res){
        if(res.code===20000){
          this.getData.logo=res.data;
        }
      },
      uploadImgSuccess(res){
        if(res.code===20000){
          this.getData.image.push(res.data);
        }
      },
      uploadLogoFileInit(){

      },
      uploadImageFileInit(){

      }
    },
    mounted () {
      debugger
      if(this.setData!=undefined){
        Object.assign(this.getData,this.setData);
        let arr=this.setData.image;
        if(arr!="暂时无图"){
          let temparr=arr.split(",");
          this.$set(this.getData,"image",temparr);
          for(let i in temparr){
            let list=temparr[i];
            this.uploadimageList.push({
              name:list,
              url:this.fileImgPrefix+""+list,
              status:'finished'
            });
          }
          this.$refs.uploadimageList.init(this.uploadimageList);
        }else{
          this.$set(this.getData,"image",[]);
        }
        if(this.setData.logo!="暂时无图"){
          this.uploadLogoList.push({
            name:this.setData.logo,
            url:this.fileImgPrefix+""+this.setData.logo,
            status:'finished'
          });
          this.$refs.uploadLogoList.init(this.uploadLogoList);
        }else{
          this.$set(this.getData,"logo","");
        }


      }
    },
    created () {

    }
  }
</script>

<style scoped>
    .setfill {
        width: 100%;
    }

    .show_area {
        height: 380px;
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
</style>
