<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <backPass ref="backPass"></backPass>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form ref='loginForm' @on-success-valid="handleSubmit"></login-form>
          <Row type="flex" justify="space-between" align="middle" class="code-row-bg">
            <Col></Col>
            <Col><Button type="text" @click="backPassWord">找回密码</Button></Col>
          </Row>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import backPass from './backPass'
import { setUserNameCookie } from '@/libs/util'
export default {
  components: {
    LoginForm,
    backPass
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'handleGetAreaManageList'
    ]),
    handleSubmit ({ userName, password }) {
      let vm = this
      localStorage.clear()
      sessionStorage.clear()
      this.handleLogin({ userName, password }).then(res => {
        debugger
        if (res.code === 20000) {
          setUserNameCookie(userName)
          // 设置当前帐号
          vm.getUserInfo().then(res => {
            vm.$refs.loginForm.loginLoading = false// 重置loading 状态
            vm.$router.push({
              name: vm.$config.homeName
            })
          })
        } else {
          vm.$Message.error(res.msg)
          vm.$refs.loginForm.loginLoading = false// 重置loading 状态
        }
      })
    },
    backPassWord () {
      this.$refs.backPass.showModal(true)
    }
  }
}
</script>

<style>

</style>
