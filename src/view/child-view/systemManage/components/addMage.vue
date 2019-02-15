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
      <FormItem label="最终回馈的福豆" class="qdd_layout50" prop="fnalFeedback">
        <InputNumber v-model="getData.fnalFeedback" placeholder="请输入最终回馈的福豆"
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
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    type="drag"
                    action="//jsonplaceholder.typicode.com/posts/"
                    style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
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
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
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
          fnalFeedback:null,
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
          fnalFeedback: [
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
      }
    },
    components: {},
    computed: {},
    methods: {
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
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
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
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
        Object.assign(this.getData,this.setData)
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
