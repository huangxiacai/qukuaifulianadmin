<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvator"/>
      <a href="javascript:void(0)">
        <span class="main-user-name">{{ userName }}</span>
        <Icon :size="18" type="md-arrow-dropdown"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="editPass">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import editPass from '../../../../view/child-view/comontents/editPassword'
import {setToken, getToken,getUserName} from '@/libs/util'
import md5 from 'js-md5'
export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  computed:{
    userName() {
      return getUserName();
    },
  },
  methods: {
    ...mapActions([
      'handleLogOut',
      'handleUserEditPass'
    ]),
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
          });
          break;
        case 'editPass':
          this.editPassWord();
          break;
      }
    },
    /**
     * 修改密码调用
     */
    editPassWord(){
      let vm=this;
      let config={
        loading:true,
        render:(h)=>{
          return h('div',[
            h('h3',{
              slot:'title'
            },'修改密码'),
            h(editPass,{
              ref:'editPass',
              props:{

              }
            })
          ]);

        },
        onOk:function(){
          let _this=this;
          let obj=this.$refs.editPass;
          obj.checkForm().then(res=>{
            if(res){
              let {old_pass,new_pass} =obj.editPassFormModel;
              //发送请求
              vm.handleUserEditPass({old_pass:md5(old_pass),new_pass:md5(new_pass)}).then(res=>{
                if(res.status===0){
                  vm.$Message.success("修改成功！");
                  //关闭模态框
                  this.$Modal.remove();

                }else{
                  vm.$Message.error(res.message);
                  _this.tableLoading = false;
                }
              });
            }else{
              _this.buttonLoading=false;
            }
          });
        }
      };
      this.$Modal.confirm(config);
    }
  }
}
</script>
