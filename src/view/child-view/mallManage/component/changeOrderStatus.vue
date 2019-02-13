<template>
  <div>
    <Form :ref="refName"
          :model="getData"
          :rules="getRult"
          label-position="top"
          class="show_area" inline>
      <FormItem label="发货状态" class="qdd_layout100" prop="status">
        <Select v-model="getData.status"
                placeholder="请选择发货状态"
                class="setfill"
                :transfer="true">
          <Option v-for="item in deliverGoodsStatus"
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
  name: 'suWelfareTool',
  mixins: [renderFormMixins],
  data () {
    return {
      deliverGoodsStatus: [
        {
          label: '待发货',
          value: 1
        },
        {
          label: '待收货',
          value: 2
        },
        {
          label: '已发货',
          value: 3
        }
      ],
      getData: {
        status: null
      },
      getRult: {
        status: [
          { required: true, type: 'number', message: '请选择发货状态', trigger: 'change' }
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
    if (this.setData != undefined) {
      debugger
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
    margin-top:20px;
    height: 150px;
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
</style>
