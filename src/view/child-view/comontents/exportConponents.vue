<template>
    <Form :ref="refName" :model="formModel" :rules="formRules" inline>
        <FormItem label="开始时间" prop="startDateTemp" class="layout50">
            <DatePicker v-model='formModel.startDateTemp' @on-change="startDateChange" type="date" placeholder="请选择开始时间" style="width: 100%"></DatePicker>
        </FormItem>
        <FormItem label="结束时间" prop="endDateTemp" class="layout50">
            <DatePicker v-model='formModel.endDateTemp' @on-change="endDateChange" type="date" placeholder="请选择结束时间" style="width: 100%"></DatePicker>
        </FormItem>
    </Form>

</template>

<script>
import { renderFormMixins } from '../mixins/rendFormMixins'
export default {
  name: 'exportConponents',
  mixins: [renderFormMixins],
  data () {
    const validateStart = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback()
      } else {
        if (this.formModel.endDateTemp !== '') {
          // 对第二个密码框单独验证
          this.$refs[this.refName].validateField('endDateTemp')
        }
        callback()
      }
    }
    const validatEend = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback()
      } else if (new Date(value).getTime() < new Date(this.formModel.startDateTemp).getTime()) {
        callback(new Error('结束时间不能小于开始时间'))
      } else {
        callback()
      }
    }
    return {
      formModel: {
        startDateTemp: null,
        endDateTemp: null,
        startDate: null,
        endDate: null
      },
      formRules: {
        startDateTemp: [
          { type: 'date', validator: validateStart, trigger: 'change' }
        ],
        endDateTemp: [
          { type: 'date', validator: validatEend, trigger: 'change' }
        ]
      }
    }
  },
  props: {
    _vm: {},
    getModelData: {}
  },
  components: {

  },
  computed: {
  },
  methods: {
    startDateChange (value) {
      this.$set(this.formModel, 'startDate', value)
    },
    endDateChange (value) {
      this.$set(this.formModel, 'endDate', value)
    }
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped>
    .layout50, .layout100 {
        margin-bottom: 15px;
    }

    .layout50 {
        width: calc(50% - 12px);
    }

    .layout100 {
        width: calc(100% - 12px);
    }

    .formHeight {
        height: 400px;
        overflow-y: auto;
    }
</style>
