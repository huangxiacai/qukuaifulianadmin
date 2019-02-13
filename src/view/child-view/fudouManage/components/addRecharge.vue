<template>
    <div>
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>
            <FormItem label="充值类型" class="qdd_layout100" prop="type">
                <Select v-model="getData.type" placeholder="请选择充值类型"  :transfer="true">
                    <Option v-for="item in getType"
                            :value="item.value"
                            :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="充值/扣款" class="qdd_layout100" prop="status">
                <Select v-model="getData.status" :transfer="true">
                    <Option v-for="item in getStatus"
                            :value="item.value"
                            :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="数量" class="qdd_layout100" prop="amount">
                <InputNumber v-model="getData.amount" placeholder="请输入数量"
                             class="setfill"></InputNumber>
            </FormItem>
            <FormItem label="用户id" class="qdd_layout100" prop="userId">
                <InputNumber :min="1" v-model="getData.userId" placeholder="请填写用户id"
                       class="setfill" ></InputNumber>
            </FormItem>

        </Form>
    </div>

</template>

<script>
  import { renderFormMixins } from '../../mixins/rendFormMixins'
  export default {
    name: 'addRecharge',
    mixins: [renderFormMixins],
    data () {
      return {
        currPoint: {}, // 当前point
        modal_loading: false,
        dbmap: null, // 地图对象
        mapModel: false,
        meetingTime: null,
        getData: {
          type:null,
          status:null,
          amount:null,
          userId:null
        },
        getRult: {
          type: [
            { required: true,type:'number', message: '请选择充值类型', trigger: 'change' }
          ],
          status: [
            { required: true,type:'number', message: '请选择充值/扣款', trigger: 'change' }
          ],
          amount: [
            { required: true,type:'number', message: '请输入数量', trigger: 'change' }
          ],
          userId: [
            { required: true,type:'number',message: '请输入用户id', trigger: 'blur' }
          ]
        }
      }
    },
    props: {
      setData: {
        type: Object,
        default: null
      },
      getStatus:{

      },
      getType:{

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
