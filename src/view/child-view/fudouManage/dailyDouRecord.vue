/***用户每日产豆记录****/
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
                <FormItem label="领取状态:" class="ivu-col ivu-col-span-6 m-b-10">
                    <Select v-model="filter_form.status" placeholder="请选择领取状态">
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
      title: '用户每日产豆记录过滤',
      getStatus: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '未领取',
          value: 0
        },
        {
          label: '已领取',
          value: 1
        }
      ],
      startDate: null,
      endDate: null,
      filter_form: {
        phone: null,
        status: -1,
        startDate: null,
        endDate: null,
        nickName: null
      },
      headBtnList: [

      ],
      columnsheader: [
        {
          title: '用户昵称',
          key: 'nickname',
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.postUser.nickname)
          }
        },
        {
          title: '用户id',
          key: 'userId',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center',
          render: (h, { row }) => {
            return h('div', row.postUser.phone)
          }
        },
        {
          title: '产豆数量 ',
          key: 'beanNum',
          align: 'center'
        },
        {
          title: '产豆时间',
          key: 'createDate',
          align: 'center',
          render: (h, { row }) => {
            return h('div', formatDate('Y-m-d', row.createDate))
          }
        },
        {
          title: '领取状态',
          key: 'status',
          align: 'center',
          render: (h, { row }) => {
            let result = ''
            for (let i = 0; i < this.getStatus.length; i++) {
              let list = this.getStatus[i]
              if (list.value === row.status) {
                result = list.label
                break
              }
            }
            return h('div', result)
          }
        },
        {
          title: '最终领取的福豆数量',
          key: 'finalBeanNum',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handlequeryBeanProductRecords'
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
        status: -1,
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
      this.handlequeryBeanProductRecords({ ...this.reqBase }).then(res => {
        this.tableLoading = false
        if (res.code === 20000) {
          this.tableDataList = res.data.data
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
