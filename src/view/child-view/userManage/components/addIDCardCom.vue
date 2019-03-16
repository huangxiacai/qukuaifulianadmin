<template>
  <div>
    <Form :ref="refName"
          :model="getData"
          :rules="getRult"
          label-position="top"
          class="show_area" inline>
      <FormItem label="身份证" class="qdd_layout100" prop="idcardCode">
        <Input v-model="getData.idcardCode" :maxlength="18" placeholder="请输入身份证"
               class="setfill"></Input>
      </FormItem>
      <FormItem label="真实姓名" class="qdd_layout100" prop="realName">
        <Input v-model="getData.realName" :maxlength="6" placeholder="请输入真实姓名"
               class="setfill"></Input>
      </FormItem>

    </Form>
  </div>

</template>

<script>
  import { renderFormMixins } from '../../mixins/rendFormMixins'
  export default {
    name: 'addIDCardCom',
    mixins: [renderFormMixins],
    data () {
      return {
        currPoint: {}, // 当前point
        modal_loading: false,
        dbmap: null, // 地图对象
        mapModel: false,
        meetingTime: null,
        getData: {
          idcardCode: null,
          realName: null,
        },
        getRult: {
          realName: [
            { required: true, message: '请填写真实姓名', trigger: 'blur' }
          ],
          idcardCode: [
            { required: true, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请填写正确的身份证号', trigger: 'change' }
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
    height: 200px;
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
