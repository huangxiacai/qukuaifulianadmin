<template>
    <div style="position:relative;">
      <searchPanel :title="title"
                   @search="onSearch(filter_form)"
                   ref="filterBase"
                   @reset="resetConditions"
                   :isReset="true">
        <Form slot="formContent" inline class="ivu-row">
          <FormItem label="用户昵称:" class="ivu-col ivu-col-span-6 m-b-10">
            <Input v-model="filter_form.nickName" type="text"
                   placeholder="请填写用户昵称"></Input>
          </FormItem>
          <FormItem label="用户手机号:" class="ivu-col ivu-col-span-6 m-b-10">
            <Input v-model="filter_form.phone" :maxlength="11" type="text" icon="iphone"
                   placeholder="请填写用户手机号"></Input>
          </FormItem>
          <FormItem label="开始时间:" class="ivu-col ivu-col-span-6 m-b-10">
            <DatePicker v-model="startDate" :transfer="true" type="date" placeholder="请选择开始时间"
                        @on-change="startDateChange" style="width: 100%"></DatePicker>
          </FormItem>
          <FormItem label="结束时间:" class="ivu-col ivu-col-span-6 m-b-10">
            <DatePicker v-model="endDate" :transfer="true" type="date" placeholder="请选择结束时间"
                        @on-change="endDateChange" style="width: 100%"></DatePicker>
          </FormItem>
          <FormItem label="法师名称:" class="ivu-col ivu-col-span-6 m-b-10">
            <Input v-model="filter_form.rabbiName"  type="text"
                   placeholder="请填写法师名称"></Input>
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

        </template>
      </packageTable>
    </div>
  </template>

<script>
import packageTableMixins from '../mixins/packageTableMixins'
import { mapActions } from 'vuex'
import { formatDate } from '@/libs/util'
import addNotice from './components/addNotice'

export default {
  name: 'postManage',
  mixins: [packageTableMixins],
  data () {
    return {
      reqBase: {},
      title: '帖子管理过滤',
      getStatus: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '到期'
        },
        {
          value: 2,
          label: '删除'
        }
      ],
      getType: [
        {
          value: 1,
          label: '支付宝'
        },
        {
          value: 2,
          label: '银行卡'
        }
      ],
      startDate: null,
      endDate: null,
      filter_form: {
        startDate: null,
        endDate: null,
        phone: null,
        nickName: null,
        rabbiName: null
      },
      headBtnList: [
        {
          mothod: this.add,
          type: 'primary',
          icon: '',
          text: '添加公告'
        }
      ],
      columnsheader: [

        {
          title: '帖子标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '帖子内容',
          key: 'content',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createDate',
          align: 'center',
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d H:i:s', row.createDate))
          }
        },
        {
          title: '是否置顶',
          key: 'isStick',
          align: 'center',
          render: (h, { row }) => {
            let result = ''
            if (row.isStick === 1) {
              result = '是'
            } else if (row.isStick === 0) {
              result = '否'
            }
            return h('div', result)
          }
        },
        {
          title: '是否删除',
          key: 'isDelete',
          align: 'center',
          render: (h, { row }) => {
            let result = ''
            if (row.isStick === 1) {
              result = '是'
            } else if (row.isStick === 0) {
              result = '否'
            }
            return h('div', result)
          }
        },
        {
          title: '点赞数',
          key: 'priseCount',
          align: 'center'
        },
        {
          title: '评论数',
          key: 'commentCount',
          align: 'center'
        },
        {
          title: '操作',
          key: '',
          align: 'center',
          fixed: 'right',
          width: 150,
          render: (h, { row }) => {
            let vm = this
            let delText = ''
            let delstatus = 0
            let stickText = ''
            let stick = 0
            if (row.isDelete === 0) {
              delText = '删除'
              delstatus = 1
            } else if (row.isDelete === 1) {
              delText = '还原'
              delstatus = 0
            }
            if (row.isStick === 0) {
              stickText = '置顶'
              stick = 1
            } else if (row.isStick === 1) {
              stickText = '取消置顶'
              stick = 0
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: function () {
                    vm.del(row, delText, delstatus)
                  }
                }
              }, delText),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: function () {
                    vm.setTop(row, stickText, stick)
                  }
                }
              }, stickText)
            ])
          }
        }
      ]
    }
  },
  computed: {
    // 文件前缀
    fileImgPrefix () {
      let root = this.$config.imgUrl.pro
      if (process.env.NODE_ENV !== 'production') {
        root = this.$config.imgUrl.dev
      }
      return root
    }
  },
  methods: {
    ...mapActions([
      'handlequeryPosts', // 分页
      'handleisStickPost', // del
      'handleisDeletePost'
    ]),
    //
    showSearchPanel () {
      this.$refs.filterBase.init()
    },
    startDateChange (value) {
      this.$set(this.filter_form, 'startDate', value)
    },
    endDateChange (value) {
      this.$set(this.filter_form, 'endDate', value)
    },
    add () {
      let vm = this
      let config = {
        loading: true,
        width: 900,
        render: (h) => {
          return h('div', [
            h('h3', '添加公告'),
            h(addNotice, {
              ref: 'addNotice',
              props: {
                _vm: vm
              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.addNotice
          obj.checkForm().then(res => {
            if (res) {
              let getData = obj.getData
              // 发送请求
              vm.handlesaveOrUpdateNotice({
                ...getData
              }).then(res => {
                if (res.code === 20000) {
                  vm.$Message.success('添加公告成功！')
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
    edit (row) {
      let vm = this
      let config = {
        loading: true,
        width: 500,
        render: (h) => {
          return h('div', [
            h('h3', '修改公告'),
            h(addNotice, {
              ref: 'addNotice',
              props: {
                _vm: vm,
                setData: row
              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.addNotice
          obj.checkForm().then(res => {
            if (res) {
              let getData = obj.getData
              // 发送请求
              vm.handlesaveOrUpdateRabbi({
                ...getData
              }).then(res => {
                if (res.code === 20000) {
                  vm.$Message.success('修改公告成功！')
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
    // 重置搜索条件
    resetConditions () {
      this.startDate = null
      this.endDate = null
      this.filter_form = {
        startDate: null,
        endDate: null,
        phone: null,
        nickName: null,
        rabbiName: null
      }
    },

    init () {
      this.tableLoading = true
      this.handlequeryPosts({ ...this.reqBase }).then(res => {
        this.tableLoading = false
        if (res.code === 20000) {
          this.tableDataList = res.data.data || []
          this.getPageTotal = res.data.totalCount
        } else {
          this.tableDataList = []
          this.getPageTotal = 0
        }
      })
    },
    // 上架或者下载
    changeMageStatus (row, title) {
      debugger
      let vm = this
      let config = {
        title: title + '法师',
        content: '您确定要' + title + '法师吗？',
        loading: true,
        onOk: function () {
          let _this = this
          vm.handleisSellRabbi(
            {
              rabbiId: row.rabbiId,
              isSell: title == '上架' ? 1 : 2
            }
          ).then(res => {
            if (res.code === 20000) {
              vm.$Message.success(title + '法师成功！')
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
    /**
         * 撤销锁仓
         * @param row
         */
    del (row, title, status) {
      let vm = this
      let config = {
        title: title,
        content: '您确定要' + title + '此条贴子吗？',
        loading: true,
        onOk: function () {
          let _this = this
          vm.handleisDeletePost({
            postId: row.postId,
            isDelete: status
          }).then(res => {
            if (res.code === 20000) {
              vm.$Message.success(title + '贴子成功！')
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
    setTop (row, title, status) {
      let vm = this
      let config = {
        title: title,
        content: '您确定要' + title + '此条帖子吗？',
        loading: true,
        onOk: function () {
          let _this = this
          vm.handleisStickPost({
            postId: row.postId,
            isStick: status
          }).then(res => {
            if (res.code === 20000) {
              vm.$Message.success(title + '成功！')
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
