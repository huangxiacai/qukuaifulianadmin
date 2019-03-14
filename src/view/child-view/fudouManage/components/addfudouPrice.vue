<template>
    <div>
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>

            <FormItem label="福豆价格" class="qdd_layout100" prop="beanPrice">
                <InputNumber  :min="0" v-model="getData.beanPrice" class="setfill"></InputNumber>
            </FormItem>

            <FormItem label="商品时间" class="qdd_layout100" prop="createDateTemp">
              <DatePicker
                type="datetime"
                v-model="getData.createDateTemp"
                @on-clear="createClear"
                :transfer="true"
                @on-change="createDateChange"
                :disabled="edit"
                placeholder="请选择时间"
                class="setfill"></DatePicker>

            </FormItem>

        </Form>
    </div>

</template>

<script>
import { renderFormMixins } from '../../mixins/rendFormMixins'
import { formatDate } from '@/libs/util'
export default {
  name: 'addCommody',
  mixins: [renderFormMixins],
  data () {
    return {
      getStatus: [
        {
          value: 0,
          label: '上架'
        },
        {
          value: 1,
          label: '下架'
        }
      ],
      getType: [
        {
          value: 0,
          label: '跳转'
        },
        {
          value: 1,
          label: '不跳转'
        }
      ],
      currPoint: {}, // 当前point
      modal_loading: false,
      dbmap: null, // 地图对象
      mapModel: false,
      meetingTime: null,
      getData: {
        beanPrice: null,
        createDate: null,
        createDateTemp: null
      },
      getRult: {
        beanPrice: [
          { required: true, type: 'number', message: '请填写福豆价格', trigger: 'change' }
        ],
        createDateTemp: [
          { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    productTypeData () {
      return this._vm.$store.state.shopManage.productTypeData
    }
  },
  props: {
    _vm: {

    },
    setData: {
      type: Object,
      default: null
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  computed: {},
  methods: {
    createClear () {
      this.$set(this.getData, 'createDate', '')
      this.$set(this.getData, 'createDateTemp', '')
    },
    createDateChange (value) {
      this.$set(this.getData, 'createDate', value)
    }
  },
  mounted () {

  },
  created () {
    if (this.setData != undefined) {
      let dataTime = formatDate('Y-m-d H:i:s', this.setData.createDate)
      Object.assign(this.getData, this.setData)
      this.$set(this.getData, 'createDateTemp', dataTime)
      this.$set(this.getData, 'createDate', dataTime)
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
