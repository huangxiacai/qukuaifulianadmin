<template>
    <div>
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>
          <FormItem label="用户ID" class="qdd_layout100" prop="userId">
            <InputNumber :min="1" v-model="getData.userId" placeholder="请输入用户ID"
                         class="setfill"></InputNumber>
          </FormItem>
            <FormItem label="锁仓数量" class="qdd_layout100" prop="amount">
                <InputNumber v-model="getData.amount" placeholder="请输入锁仓数量"
                             class="setfill"></InputNumber>
            </FormItem>
            <FormItem label="锁仓规则" class="qdd_layout100" prop="ruleType">
                <Select v-model="getData.ruleType" placeholder="请选择锁仓规则"  :transfer="true">
                    <Option v-for="item in getRuleType"
                            :value="item.value" v-if="item.value!=-1"
                            :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>

            <FormItem v-if="getData.ruleType==2" label="多少天到期" class="qdd_layout50" prop="ruleValue0">
                <InputNumber :min="0" v-model="getData.ruleValue0" placeholder="请填写多少天到期"
                             class="setfill" ></InputNumber>
            </FormItem>
            <FormItem v-if="getData.ruleType==2" label="多少个月释放完" class="qdd_layout50" prop="ruleValue1">
                <InputNumber :min="0" v-model="getData.ruleValue1" placeholder="请填写多少个月释放完"
                             class="setfill" ></InputNumber>
            </FormItem>
            <FormItem v-else-if="getData.ruleType==1" label="多少个月释放完" class="qdd_layout100" prop="ruleValue">
                <InputNumber :min="0" v-model="getData.ruleValue" placeholder="请填写多少个月释放完"
                             class="setfill" ></InputNumber>
            </FormItem>
            <FormItem v-else label="多少天释放完" class="qdd_layout100" prop="ruleValue">
                <InputNumber :min="0" v-model="getData.ruleValue" placeholder="请填写多少天释放完"
                             class="setfill" ></InputNumber>
            </FormItem>
          <FormItem label="类型" class="qdd_layout100" prop="type">
            <Select v-model="getData.type" placeholder="请选择类型"  :transfer="true">
              <Option v-for="item in getType" v-if="item.value!=-1"
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
  name: 'addAngelInvestFudou',
  mixins: [renderFormMixins],
  data () {
    return {
      getData: {
        userId: null,
        amount: null,
        ruleType: null,
        ruleValue: null,
        ruleValue0: null,
        ruleValue1: null,
        type: null
      },
      getRult: {
        userId: [
          { required: true, type: 'number', message: '请输入用户Id', trigger: 'change' }
        ],
        amount: [
          { required: true, type: 'number', message: '请输入锁仓数量', trigger: 'change' }
        ],
        ruleType: [
          { required: true, type: 'number', message: '请选择锁仓规则', trigger: 'change' }
        ],
        ruleValue: [
          { required: true, type: 'number', message: '请填写锁仓的值', trigger: 'change' }
        ],
        ruleValue0: [
          { required: true, type: 'number', message: '请填写锁仓的值', trigger: 'change' }
        ],
        ruleValue1: [
          { required: true, type: 'number', message: '请填写锁仓的值', trigger: 'change' }
        ],
        type: [
          { required: true, type: 'number', message: '请填写锁仓的值', trigger: 'change' }
        ]
      }
    }
  },
  props: {
    setData: {
      type: Object,
      default: null
    },
    getStatus: {

    },
    getType: {

    },
    getRuleType: {

    }
  },
  components: {},
  computed: {},
  methods: {

  },
  mounted () {

  },
  created () {
    if (this.setData != undefined) {
      Object.assign(this.getData, this.setData)
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
