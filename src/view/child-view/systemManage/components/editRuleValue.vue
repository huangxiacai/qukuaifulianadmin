<template>
  <div>
    <Form :ref="refName"
          :model="getData"
          :rules="getRult"
          label-position="top"
          class="show_area" inline>
      <FormItem v-if="setData.type==4" label="常量的值" class="qdd_layout100" prop="value">
        <RadioGroup v-model="getData.value">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem  v-else label="常量的值" class="qdd_layout100" prop="value">
        <Input v-model="getData.value"  placeholder="请输入常量的值"
               class="setfill"></Input>
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
          value:null,
        },
        getRult: {
          value: [
            { required: true, message: '常量的值不能为空', trigger: 'blur' }
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

      },
      getType:{}
    },
    components: {},
    computed: {

    },
    methods: {

    },
    mounted () {

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
    height: 180px;
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
  .show_area{
    margin-top:15px;
  }
</style>
