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
      <FormItem label="一级分销福豆" class="qdd_layout50" prop="twoGenerateBean">
        <InputNumber v-model="getData.twoGenerateBean" placeholder="请输入二级分销福豆"
                     class="setfill"></InputNumber>
      </FormItem>
      <FormItem label="最终回馈的福豆" class="qdd_layout50" prop="fnalFeedback">
        <InputNumber v-model="getData.fnalFeedback" placeholder="请输入最终回馈的福豆"
                     class="setfill"></InputNumber>
      </FormItem>
      <FormItem label="法师Logo图地址" class="qdd_layout50" prop="logo">
        <InputNumber v-model="getData.logo" placeholder="请输入法师Logo图地址"
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
            { required: true, message: '请填写法师名称', trigger: 'blur' }
          ],
          isSell: [
            { required: true, message: '请选择是否上架', trigger: 'change' }
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
            { required: true,type:'number', message: '请填写法师福豆价格', trigger: 'blur' }
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
</style>
