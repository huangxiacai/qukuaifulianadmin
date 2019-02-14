<template>
    <div>
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>

            <FormItem label="转换汇率" class="qdd_layout100" prop="transferRate">
                <InputNumber
                  :min="0"
                  :max="1"
                  placeholder="请填写转换汇率"
                  v-model="getData.transferRate"
                  class="setfill"></InputNumber>
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
        getData: {
          transferRate:null
        },
        getRult: {
          transferRate: [
            { required: true,type:'number', message: '请填写福豆价格', trigger: 'change' }
          ]
        }
      }
    },
    computed:{
    },
    props: {
      _vm:{

      },
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
        Object.assign(this.getData,this.setData);
      }
    }
  }
</script>

<style scoped>
    .setfill {
        width: 100%;
    }

    .show_area {
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
    #bdmap{
        height:450px;
        width:100%;
        margin:-16px;
    }
  .show_area{
    margin-top:10px;
  }
</style>
