<template>
  <div>
    <Form :ref="refName"
          :model="getData"
          :rules="getRult"
          label-position="top"
          class="show_area" inline>
      <FormItem label="银行卡类型" class="qdd_layout100" prop="bankcardType">
        <Select v-model="getData.bankcardType" class="setfill">
          <Option v-for="item in bankcardTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="银行名称" class="qdd_layout100" prop="bankcardName">
        <Input v-model="getData.bankcardName" :maxlength="10" placeholder="请输入银行名称"
               class="setfill"></Input>
      </FormItem>
      <FormItem label="银行卡号" class="qdd_layout100" prop="bankcardCode">
        <Input v-model="getData.bankcardCode" placeholder="请输入银行卡号"
               class="setfill"></Input>
      </FormItem>
      <FormItem label="银行卡预留手机号" class="qdd_layout100" prop="bankcardPhone">
        <Input v-model="getData.bankcardPhone" :maxlength="11" placeholder="请输入银行卡预留手机号"
               class="setfill"></Input>
      </FormItem>

    </Form>
  </div>

</template>

<script>
  import { renderFormMixins } from '../../mixins/rendFormMixins'
  export default {
    name: 'addBankCardCom',
    mixins: [renderFormMixins],
    data () {
      return {
        bankcardTypeList:[
          {
            value:'001',
            label:'借记卡',
          },
          {
            value:'002',
            label:'贷记卡',
          }
        ],
        getData: {
          bankcardCode: null,
          bankcardPhone: null,
          bankcardType:null,
          bankcardName:null
        },
        getRult: {
          bankcardType: [
            { required: true, message: '请填写银行卡类型', trigger: 'change' }
          ],
          realName: [
            { required: true, message: '请填写真实姓名', trigger: 'blur' }
          ],
          bankcardPhone: [
            { required: true, pattern: /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/, message: '请填写正确的银行卡预留手机号', trigger: 'change' }
          ],
          bankcardCode:[
            { required: true, pattern: /^([1-9]{1})(\d{14}|\d{18})$/, message: '请填写正确的银行卡号', trigger: 'change' }

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

      visibleChange (b) {
        if (!b) {
          this.currPoint = {}
          this.dbmap.clearOverlays()
        } else {

        }
      },
      cancel () {
        this.currPoint = {}
        this.dbmap.clearOverlays()
        this.mapModel = false
      }

    },
    mounted () {

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
