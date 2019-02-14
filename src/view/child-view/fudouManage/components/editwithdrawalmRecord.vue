<template>
  <div>
    <Form :ref="refName"
          :model="getData"
          :rules="getRult"
          label-position="top"
          class="show_area" inline>

      <FormItem label="提现金额" class="qdd_layout100" prop="withdrawMoney">
        <InputNumber :min="0"
                     placeholder="请输入提现金额"
                     v-model="getData.withdrawMoney"
                     class="setfill"></InputNumber>
      </FormItem>
      <FormItem label="到账金额" class="qdd_layout100" prop="transferMoney">
        <InputNumber :min="0"
                     placeholder="请输入到账金额"
                     v-model="getData.transferMoney"
                     class="setfill"></InputNumber>
      </FormItem>
      <FormItem label="状态" class="qdd_layout100" prop="status">
        <Select v-model="getData.status" placeholder="请选择状态" :transfer="true">
          <Option v-for="item in getStatus"
                  :value="item.value"
                  :key="item.value">{{ item.label }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="钱包地址" class="qdd_layout100" prop="walletAddress">
        <Input
          placeholder="请输入钱包地址"
          v-model="getData.walletAddress"
          class="setfill"></Input>
      </FormItem>
    </Form>
  </div>

</template>

<script>
  import {renderFormMixins} from '../../mixins/rendFormMixins'
  import {formatDate} from '@/libs/util'

  export default {
    name: 'editwithdrawalmRecord',
    mixins: [renderFormMixins],
    data() {
      return {

        getData: {
          withdrawMoney: null,
          transferMoney: null,
          status: null,
          walletAddress: null
        },
        getRult: {
          withdrawMoney: [
            {required: true, type: 'number', message: '请填写提现金额', trigger: 'change'}
          ],
          transferMoney: [
            {required: true, type: 'number', message: '请填写到账金额', trigger: 'change'}
          ],
          status: [
            {required: true, type: 'number', message: '请选择状态', trigger: 'change'}
          ],
          walletAddress: [
            {required: true, message: '钱包地址不能为空', trigger: 'change'}
          ],
        }
      }
    },
    props: {
      _vm: {},
      setData: {
        type: Object,
        default: null
      },
      getStatus: {}
    },
    components: {},
    computed: {},
    methods: {
      createClear() {
        this.$set(this.getData, "createDate", "");
        this.$set(this.getData, "createDateTemp", "")
      },
      createDateChange(value) {
        this.$set(this.getData, "createDate", value)
      }
    },
    mounted() {


    },
    created() {
      if (this.setData != undefined) {
        Object.assign(this.getData, this.setData);
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

  #bdmap {
    height: 450px;
    width: 100%;
    margin: -16px;
  }
</style>
