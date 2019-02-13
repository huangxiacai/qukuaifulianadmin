/***福利值道具管理****/
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
          <Input v-model="filter_form.phone" type="text" icon="iphone"
                 placeholder="请填写用户手机号"></Input>
        </FormItem>
        <FormItem label="开始时间:" class="ivu-col ivu-col-span-6 m-b-10">
          <DatePicker v-model="startDate" type="date" placeholder="请选择开始时间" @on-change="startDateChange" style="width: 100%"></DatePicker>
        </FormItem>
        <FormItem label="结束时间:" class="ivu-col ivu-col-span-6 m-b-10">
          <DatePicker v-model="endDate" type="date" placeholder="请选择结束时间" @on-change="endDateChange" style="width: 100%"></DatePicker>
        </FormItem>
        <FormItem label="状态:" class="ivu-col ivu-col-span-6 m-b-10">
          <Select v-model="filter_form.type" placeholder="请选择状态">
            <Option v-for="item in getStatus" :value="item.value"
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
      :showSearchBtn="false"
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
import suWelfareTool from './component/suWelfareTool'
export default {
  name: 'welfareItemManage',
  mixins: [packageTableMixins],
  data () {
    return {
      reqBase: {
        type: -1,
        currentPage: 1,
        length: 15
      },
      title: '福利值道具管理过滤',
      getStatus: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '注册认证',
          value: 0
        },
        {
          label: '邀请',
          value: 1
        },
        {
          label: '功德捐赠',
          value: 2
        },
        {
          label: '购买商品',
          value: 3
        },
        {
          label: '活跃度转换',
          value: 4
        },
        {
          label: '购买道具',
          value: 5
        }
      ],
      startDate: null,
      endDate: null,
      filter_form: {
        phone: null,
        type: -1,
        startDate: null,
        endDate: null,
        nickName: null
      },
      headBtnList: [
        {
          mothod: this.add,
          type: 'primary',
          icon: '',
          text: '添加道具'
        }
      ],
      columnsheader: [
        {
          title: '添加的福利值 ',
          key: 'addWelfare',
          align: 'center'
        },
        {
          title: '价格(RMB)',
          key: 'price',
          align: 'center'
        },
        {
          title: '道具名称',
          key: 'toolName',
          align: 'center'
        },
        {
          title: '修建时间',
          key: 'createDate',
          align: 'center',
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d h:m:s', row.createDate))
          }
        },
        {
          title: '是否上架',
          key: 'isSell',
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.isSell === 0 ? '是' : row.isSell === 1 ? '否' : '')
          }
        },
        {
          title: '操作',
          key: 'isSell',
          align: 'center',
          fixed: 'right',
          render: (h, { row }) => {
            let vm = this
            let textName = ''
            if (row.isSell === 0) {
              textName = '下架'
            } else if (row.isSell === 1) {
              textName = '上架'
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: function () {
                    vm.sellWelfareTool(row, textName)
                  }
                }
              }, textName),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: function () {
                    vm.editWelfareTool(row)
                  }
                }
              }, '修改')
            ])
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handleQueryWelfareTools',
      'handleIsSellWelfareTool',
      'handleSaveOrUpdateWelfareTool'
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
        render: (h) => {
          return h('div', [
            h('h3', '添加福利值道具'),
            h(suWelfareTool, {
              ref: 'suWelfareTool',
              props: {

              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.suWelfareTool
          obj.checkForm().then(res => {
            if (res) {
              let getData = obj.getData
              // 发送请求
              vm.handleSaveOrUpdateWelfareTool({
                ...getData
              }).then(res => {
                debugger
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
    // 重置搜索条件
    resetConditions () {
      this.startDate = null
      this.endDate = null
      this.filter_form = {
        phone: null,
        type: -1,
        startDate: null,
        endDate: null,
        nickName: null
      }
    },
    sellWelfareTool (row, text) {
      let vm = this
      let config = {
        title: text + '道具',
        content: '您确定要' + text + '' + row.toolName + '道具吗',
        loading: true,
        onOk: function () {
          let _this = this
          vm.handleIsSellWelfareTool(
            {
              toolId: row.toolIdt,
              isSell: row.isSell
            }
          ).then(res => {
            if (res.code === 20000) {
              vm.$Message.success(text + '成功')
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
    // 修改道具
    editWelfareTool (row) {
      let vm = this
      let config = {
        loading: true,
        render: (h) => {
          return h('div', [
            h('h3', '修改福利值道具'),
            h(suWelfareTool, {
              ref: 'suWelfareTool',
              props: {
                setData: row
              }
            })
          ])
        },
        onOk: function () {
          let _this = this
          let obj = this.$refs.suWelfareTool
          obj.checkForm().then(res => {
            if (res) {
              let { toolName, price, addWelfare, isSell, toolId } = obj.getData
              // 发送请求
              vm.handleSaveOrUpdateWelfareTool({
                toolName,
                price,
                addWelfare,
                isSell,
                toolId
              }).then(res => {
                debugger
                if (res.code === 20000) {
                  vm.$Message.success('修改成功！')
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
    init () {
      this.tableLoading = true
      this.handleQueryWelfareTools({ ...this.reqBase }).then(res => {
        this.tableLoading = false
        if (res.code === 20000) {
          this.tableDataList = res.data
          this.getPageTotal = res.totalCount
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
