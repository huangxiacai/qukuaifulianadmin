<template>
  <div>
    <Form :ref="refName"
          :model="getData"
          :rules="getRult"
          label-position="top"
          class="show_area" inline>
      <FormItem label="道具名称" class="qdd_layout100" prop="toolName">
        <Input v-model="getData.toolName" :maxlength="11" placeholder="请输入道具名称"
               class="setfill"></Input>
      </FormItem>
      <FormItem label="道具价格" class="qdd_layout100" prop="price">
        <InputNumber v-model="getData.price" placeholder="请输入道具价格"
               class="setfill"></InputNumber>
      </FormItem>
      <FormItem label="购买道具获得的福利值" class="qdd_layout100" prop="addWelfare">
        <InputNumber v-model="getData.addWelfare" placeholder="请输入购买道具获得的福利值"
               class="setfill"></InputNumber>
      </FormItem>
      <FormItem label="是否上架" class="qdd_layout100">
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
  import {renderFormMixins} from '../../mixins/rendFormMixins'
  export default {
    name: "suWelfareTool",
    mixins: [renderFormMixins],
    data() {

      return {
        isSellData:[
          {
            value:0,
            label:'是',
          },
          {
            value:1,
            label:'否',
          }
        ],
        currPoint:{},//当前point
        modal_loading:false,
        dbmap:null,//地图对象
        mapModel:false,
        meetingTime:null,
        getData: {
          toolName:null,
          price: null,
          addWelfare:null,
          isSell: ''
        },
        getRult: {
          toolName: [
            {required: true, message: '请填写道具名称', trigger: 'blur'}
          ],
          price: [
            {required: true,type:'number', message: '请填写道具价格', trigger: 'blur'}
          ],
          addWelfare: [
            {required: true,type:'number', message: '请填写购买道具获得的福利值', trigger: 'blur'}
            ],
          isSell:[
            {required: true, message: '请选择是否上架', trigger: 'change'}
          ]
        }
      }
    },
    props:{
      setData:{
        type:Object,
        default:null
      }
    },
    components: {},
    computed: {},
    methods: {
    },
    mounted() {

    },
    created(){
      if(this.setData!=undefined){
        debugger
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
