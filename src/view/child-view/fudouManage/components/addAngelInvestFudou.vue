<template>
    <div>
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>
            <FormItem label="锁仓数量" class="qdd_layout100" prop="amount">
                <InputNumber v-model="getData.amount" placeholder="请输入锁仓数量"
                             class="setfill"></InputNumber>
            </FormItem>
            <FormItem label="锁仓规则" class="qdd_layout100" prop="ruleType">
                <Select v-model="getData.ruleType" placeholder="请选择锁仓规则"  :transfer="true">
                    <Option v-for="item in getRuleType"
                            :value="item.value"
                            :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>

            <FormItem v-if="getData.ruleType==2" label="锁仓的值1" class="qdd_layout50" prop="ruleValue0">
                <InputNumber :min="0" v-model="getData.ruleValue0" placeholder="请填写锁仓的值"
                             class="setfill" ></InputNumber>
            </FormItem>
            <FormItem v-if="getData.ruleType==2" label="锁仓的值2" class="qdd_layout50" prop="ruleValue1">
                <InputNumber :min="0" v-model="getData.ruleValue1" placeholder="请填写锁仓的值"
                             class="setfill" ></InputNumber>
            </FormItem>
            <FormItem v-else label="锁仓的值" class="qdd_layout100" prop="ruleValue">
                <InputNumber :min="0" v-model="getData.ruleValue" placeholder="请填写锁仓的值"
                             class="setfill" ></InputNumber>
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
          amount:null,
          ruleType:null,
          ruleValue:null,
          ruleValue0:null,
          ruleValue1:null
        },
        getRult: {
          amount: [
            { required: true,type:'number', message: '请输入锁仓数量', trigger: 'change' }
          ],
          ruleType: [
            { required: true,type:'number', message: '请选择锁仓规则', trigger: 'change' }
          ],
          ruleValue: [
            { required: true,type:'number', message: '请填写锁仓的值', trigger: 'change' }
          ],
          ruleValue0: [
            { required: true,type:'number',message: '请填写锁仓的值', trigger: 'change' }
          ],
          ruleValue1: [
            { required: true,type:'number',message: '请填写锁仓的值', trigger: 'change' }
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

      },
      getRuleType:{

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
