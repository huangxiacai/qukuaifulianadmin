<template>
    <div style="position:relative;">
        <searchPanel :title="title"
                     @search="onSearch(filter_form)"
                     ref="filterBase"
                     @reset="resetConditions"
                     :isReset="true">
            <Form slot="formContent" inline class="ivu-row">
                <FormItem label="用户手机号或用户ID:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Input v-model="filter_form.phone" type="text" icon="iphone"
                           placeholder="请填写用户手机号"></Input>
                </FormItem>
                <FormItem label="状态:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Select v-model="filter_form.status" placeholder="请选择状态">
                        <Option v-for="item in getStatus" :value="item.value"
                                :key="item.label">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
              <FormItem label="排序字段:" class="ivu-col ivu-col-span-6 m-b-10">
                <Select v-model="filter_form.orderField" placeholder="请选择排序字段">
                  <Option v-for="item in getOrderField" :value="item.value"
                          :key="item.label">{{ item.label }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="排序方式:" class="ivu-col ivu-col-span-6 m-b-10">
                <Select v-model="filter_form.orderWay" placeholder="请选择排序方式">
                  <Option v-for="item in getOrderWay" :value="item.value"
                          :key="item.label">{{ item.label }}
                  </Option>
                </Select>
              </FormItem>
            </Form>
        </searchPanel>
        <packageTable
                ref="contentBaseRef"
                :columnsData="columnsheader"
                :tableData="tableDataList"
                :reduceheight="reduceheight"
                :loading="tableLoading"
                :border="true"
                :tabletotallen="getPageTotal"
                @pageonChange="pageonChange"
                @showSearchPanel="showSearchPanel"
                @getSelect="getSelectList">
            <template slot="headLeft">
                <Button v-for="(item,index) in headBtnList" @click="item.mothod" :key="index" class="base_btn_item"
                        :type="item.type" :icon="item.icon">
                    {{item.text}}
                </Button>
            </template>
            <template slot="headRight">
                <Button v-for="(item,index) in headBtnRightList" @click="item.mothod" :key="index" class="base_btn_item"
                        :type="item.type" :icon="item.icon">
                    {{item.text}}
                </Button>
            </template>
        </packageTable>
    </div>
</template>

<script>
import packageTableMixins from '../mixins/packageTableMixins'
import { formatDate } from '../../../libs/util'
import { mapActions } from 'vuex'
import addUser from './components/addUser'
import exportConponents from '../comontents/exportConponents'
export default {
  name: 'accessManage',
  mixins: [packageTableMixins],
  data () {
    return {
      title: '用户帐号过滤',
      reqBase: {
        status: -1,
        currentPage: 1,
        length: 15
      },
      getOrderField:[
        {
          label: '用户Id',
          value:"user_id"
        },
        {
          label: '用户注册时间',
          value: "create_date"
        },
      ],
      getOrderWay:[
        {
          label: '降序',
          value:"DESC"
        },
        {
          label: '升序',
          value: "ASC"
        },
      ],
      getStatus: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '正常',
          value: 1
        },
        {
          label: '冻结',
          value: 2
        }
      ],
      filter_form: {
        phone: null,
        status: -1,
        orderWay:'DESC',
        orderField:'create_date',
      },
      headBtnList: [
        {
          mothod: this.add,
          type: 'primary',
          icon: '',
          text: '新增'
        }
      ],
      headBtnRightList: [
        {
          mothod: this.exprotData,
          type: 'primary',
          icon: '',
          text: '导出'
        }
      ],
      columnsheader: [
        {
          title: '用户昵称',
          key: 'nickname',
          align: 'center',
          fixed: 'left',
          width: 100
        },
        {
          title: '用户id',
          key: 'userId',
          align: 'center',
          width: 100

        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center',
          width: 100
        },
        {
          title: '身份证号',
          key: 'userDetail.idcardCode',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userDetail.idcardCode)
          }
        },
        {
          title: '平台',
          key: 'type',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            let result = ''
            if (row.type === 1) {
              result = '后台'
            } else if (row.type === 2) {
              result = '安卓'
            } else if (row.type === 3) {
              result = 'ios'
            }
            return h('div', result)
          }
        },

        {
          title: '创建时间',
          key: 'createDate',
          align: 'center',
          width: 150,
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d H:i:s', row.createDate))
          }
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            let result = ''
            if (row.status === 1) {
              result = '正常'
            } else if (row.status === 2) {
              result = '冻结'
            }
            return h('div', result)
          }
        },
        {
          title: '邀请码',
          key: 'inviteCode',
          align: 'center',
          width: 100
        },
        {
          title: '登录时间',
          key: 'loginDate',
          align: 'center',
          width: 150,
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d H:i:s', row.loginDate))
          }
        },
        {
          title: ' IP地址',
          key: 'ipAddress',
          align: 'center',
          width: 100
        },
        {
          title: '一级推荐人姓名',
          key: 'oneCommendUser.nickname',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.oneCommendUser.nickname)
          }
        },
        {
          title: '二级推荐人姓名',
          key: 'twoCommendUser.nickname',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.twoCommendUser.nickname)
          }
        },
        {
          title: '收货人姓名',
          key: 'userAddress.name',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.name)
          }
        },
        {
          title: '收货人手机号',
          key: 'userAddress.phone',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.phone)
          }
        },
        {
          title: '收货基本地址',
          key: 'userAddress.basicAddress',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.basicAddress)
          }
        },
        {
          title: '收货详细地址',
          key: 'userAddress.detailAddress',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.detailAddress)
          }
        },
        {
          title: '支付宝地址',
          key: 'userAddress.alipayCode',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.alipayCode)
          }
        },
        {
          title: '银行卡',
          key: 'userAddress.bankcardCode',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.bankcardCode)
          }
        },
        {
          title: '银行卡类型',
          key: 'userAddress.bankcardName',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.bankcardName)
          }
        },
        {
          title: '出生年月',
          key: 'userAddress.birthday',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.birthday)
          }
        },
        {
          title: '身份证',
          key: 'userAddress.idcardCode',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.idcardCode)
          }
        },
        {
          title: '身份证地址',
          key: 'userAddress.idcardAddress',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.idcardAddress)
          }
        },
        {
          title: '身份证真实姓名',
          key: 'userAddress.realName',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.realName)
          }
        },
        {
          title: '银行卡持有人',
          key: 'userAddress.bankcardOwner',
          align: 'center',
          width: 100,
          render: (h, { row }) => {
            return h('div', row.userAddress.bankcardOwner)
          }
        },
        {
          title: '操作',
          key: '',
          align: 'center',
          width: 100,
          fixed: 'right',
          render: (h, { row }) => {
            let vm = this
            let result = ''
            if (row.status === 1) {
              result = '冻结'
            } else if (row.status === 2) {
              result = '解冻'
            }
            return h('Button', {
              on: {
                click: function () {
                  vm.userUpdateUserStatus(row, result)
                }
              }
            }, result)
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handleGetqueryUsers',
      'handleInsertUser',
      'handleUpdateUserStatus'
    ]),
    add () {
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '新增用户帐号'),
            h(addUser, {
              ref: 'addUser',
              props: {}
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.addUser
          obj.checkForm().then(res => {
            if (res) {
              let {
                phone, nickname, loginPassword, OneCommendUserId, isMd5
              } = obj.getData
              if (loginPassword == null || loginPassword == '') {
                loginPassword = '000000'
              }
              // 发送请求
              vm.handleInsertUser({
                phone, nickname, loginPassword, OneCommendUserId, isMd5
              }).then(res => {
                if (res.code === 20000) {
                  vm.$Message.success('添加成功！')
                  vm.$Modal.remove()
                  vm.init()
                } else {
                  vm.$Message.error(res.msg)
                  _this.buttonLoading = false
                }
              })
            } else {
              _this.buttonLoading = false
            }
          })
        }
      }
      this.$Modal.confirm(config)
    },
    //
    showSearchPanel () {
      this.$refs.filterBase.init()
    },

    // 重置搜索条件
    resetConditions () {
      this.filter_form = {
        phone: null,
        status: -1,
        orderWay:'DESC',
        orderField:'create_date',
      }
    },

    userUpdateUserStatus ({ userId, status }, title) {
      let vm = this
      let _title = title + '帐号'
      let _status = title == '冻结' ? 2 : 1
      let config = {
        title: _title,
        content: '您确定要' + _title + '?',
        loading: true,
        onOk: function () {
          let _this = this
          vm.handleUpdateUserStatus(
            {
              userId,
              status: _status
            }
          ).then(res => {
            if (res.code === 20000) {
              vm.$Message.success(title + '成功')
              vm.$Modal.remove()
              vm.init()
            } else {
              vm.$Message.error(res.msg)
              _this.buttonLoading = false
            }
          })
        }
      }
      this.$Modal.confirm(config)
    },
    exprotData () {
      debugger
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '导出数据'),
            h(exportConponents, {
              ref: 'exportConponents',
              props: {

              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.exportConponents
          obj.checkForm().then(res => {
            if (res) {
              debugger
              let { startDate, endDate } = obj.formModel
              vm.handleGetqueryUsers({
                status: -1,
                currentPage: 1,
                length: vm.getPageTotal,
                startDate,
                endDate
              }).then(res => {
                if (res.code === 20000) {
                  let allData = res.data.data
                  let _arr = []
                  for (let i in allData) {
                    let list = allData[i]
                    _arr.push({
                      nickname: list.nickname,
                      userId: list.userId,
                      phone: list.phone,
                      'userDetail.idcardCode': list.userDetail.idcardCode,
                      type: vm.getTypeLabel(list.type),
                      createDate: formatDate('Y-m-d H:i:s', list.createDate),
                      status: vm.getStatusLabel(list.status),
                      inviteCode: list.inviteCode,
                      loginDate: formatDate('Y-m-d H:i:s', list.loginDate),
                      ipAddress: list.ipAddress,
                      'oneCommendUser.nickname': list.oneCommendUser.nickname,
                      'twoCommendUser.nickname': list.twoCommendUser.nickname,
                      'userAddress.name': list.userAddress.name,
                      'userAddress.phone': list.userAddress.phone,
                      'userAddress.basicAddress': list.userAddress.basicAddress,
                      'userAddress.detailAddress': list.userAddress.detailAddress,
                      'userAddress.alipayCode': list.userAddress.alipayCode,
                      'userAddress.bankcardCode': list.userAddress.bankcardCode,
                      'userAddress.bankcardName': list.userAddress.bankcardName,
                      'userAddress.birthday': list.userAddress.birthday,
                      'userAddress.idcardCode': list.userAddress.idcardCode,
                      'userAddress.idcardAddress': list.userAddress.idcardAddress,
                      'userAddress.realName': list.userAddress.realName,
                      'userAddress.bankcardOwner': list.userAddress.bankcardOwner
                    })
                  }
                  vm.$Message.success('导出成功！')
                  vm.$Modal.remove()
                  vm.$refs.contentBaseRef.$refs.packageTable.exportCsv({
                    filename: 'accessManage',
                    columns: vm.columnsheader,
                    data: _arr
                  })
                }
              })
            } else {
              _this.buttonLoading = false
            }
          })
        }
      }
      this.$Modal.confirm(config)
    },
    getTypeLabel (value) {
      let result = ''
      if (value === 1) {
        result = '后台'
      } else if (value === 2) {
        result = '安卓'
      } else if (value === 3) {
        result = 'ios'
      }
      return result
    },
    getStatusLabel (value) {
      let result = ''
      if (value === 1) {
        result = '正常'
      } else if (value === 2) {
        result = '冻结'
      }
      return result
    },
    init () {
      this.tableLoading = true
      this.handleGetqueryUsers({ ...this.reqBase }).then(res => {
        this.tableLoading = false
        if (res.code === 20000) {
          this.tableDataList = res.data.data || []
          this.getPageTotal = res.data.totalCount
        } else {
          this.tableDataList = []
          this.getPageTotal = 0
        }
      })
    }
  },
  mounted () {
    this.init()
  },
  created () {

  }
}
</script>

<style scoped>

</style>
