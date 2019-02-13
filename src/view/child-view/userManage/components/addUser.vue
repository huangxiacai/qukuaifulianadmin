<template>
    <div>
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>
            <FormItem label="用户手机号" class="qdd_layout100" prop="phone">
                <Input v-model="getData.phone" :maxlength="11" placeholder="请输入用户手机号"
                       class="setfill"></Input>
            </FormItem>
            <FormItem label="用户昵称" class="qdd_layout100" prop="nickname">
                <Input v-model="getData.nickname" placeholder="请输入用户昵称"
                       class="setfill"></Input>
            </FormItem>
            <FormItem label="登录密码" class="qdd_layout100" prop="loginPassword">
                <Input v-model="getData.loginPassword" type='password' placeholder="请输入登录密码"
                       class="setfill"></Input>
            </FormItem>
            <FormItem label="邀请人的用户id" class="qdd_layout100">
                <Input v-model="getData.oneCommendUserId" placeholder="请填写邀请人的用户id"
                       class="setfill"></Input>
            </FormItem>

        </Form>
    </div>

</template>

<script>
import { renderFormMixins } from '../../mixins/rendFormMixins'
export default {
  name: 'addMeeting',
  mixins: [renderFormMixins],
  data () {
    return {
      currPoint: {}, // 当前point
      modal_loading: false,
      dbmap: null, // 地图对象
      mapModel: false,
      meetingTime: null,
      getData: {
        phone: null,
        nickname: null,
        loginPassword: null,
        oneCommendUserId: null,
        isMd5: true
      },
      getRult: {
        nickname: [
          { required: true, message: '请填写用户昵称', trigger: 'blur' }
        ],
        loginPassword: [
          { required: true, min: 6, message: '密码至少6位', trigger: 'change' },
          { message: '请填写用户登录密码', trigger: 'blur' }
        ],
        phone: [
          { required: true, pattern: /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/, message: '请填写正确的手机号', trigger: 'change' }
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
