<template>
  <div style="position:relative;">
    <searchPanel :title="title"
                 @search="onSearch(filter_form)"
                 ref="filterBase"
                 @reset="resetConditions"
                 :isReset="true">
      <Form slot="formContent" inline class="ivu-row">
        <FormItem label="用户手机号:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.phone" type="text" icon="iphone"
                 placeholder="请填写用户手机号"></Input>
        </FormItem>
        <FormItem label="用户昵称:" class="ivu-col ivu-col-span-6 m-b-10">
          <Input v-model="filter_form.nickName" type="text"
                 placeholder="请填写用户昵称"></Input>
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
import { mapActions } from 'vuex'
import exportConponents from '../comontents/exportConponents'
export default {
  name: 'userFudou',
  mixins: [packageTableMixins],
  data () {
    return {
      title: '用户福豆过滤',
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
        nickName: null
      },
      headBtnList: [

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
          title: '随身福袋数量',
          key: 'suishenBean',
          align: 'center'
        },
        {
          title: '福报福袋',
          key: 'fubaoBean',
          align: 'center'
        },
        {
          title: '奖励福豆',
          key: 'rewardBean',
          align: 'center'
        },
        {
          title: '天使投资福豆',
          key: 'angelBean',
          align: 'center'
        },
        {
          title: '可解锁福豆',
          key: 'unlockBean',
          align: 'center'
        },
        {
          title: '社区福袋',
          key: 'commuityBean',
          align: 'center'
        },
        {
          title: '法币福袋',
          key: 'legalBean',
          align: 'center'
        },
        {
          title: '冻结的福袋',
          key: 'freezeBean',
          align: 'center'
        },
        {
          title: '被系统扣除的福豆',
          key: 'deductBean',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handleQueryUserBeans'
    ]),
    //
    showSearchPanel () {
      this.$refs.filterBase.init()
    },

    // 重置搜索条件
    resetConditions () {
      this.filter_form = {
        phone: null,
        nickName: null
      }
    },
    exprotData () {
      debugger
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
              vm.handleQueryUserBeans({
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
                      nickname: list.postUser.nickname,
                      userId: list.userId,
                      phone: list.postUser.phone,
                      suishenBean: list.suishenBean,
                      fubaoBean: list.fubaoBean,
                      rewardBean: list.rewardBean,
                      angelBean: list.angelBean,
                      unlockBean: list.unlockBean,
                      commuityBean: list.commuityBean,
                      legalBean: list.legalBean,
                      freezeBean: list.freezeBean,
                      deductBean: list.deductBean
                    })
                  }
                  vm.$Message.success('导出成功！')
                  vm.$Modal.remove()
                  vm.$refs.contentBaseRef.$refs.packageTable.exportCsv({
                    filename: 'userFudou',
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
    init () {
      this.tableLoading = true
      this.handleQueryUserBeans({ ...this.reqBase }).then(res => {
        this.tableLoading = false
        if (res.code === 20000) {
          debugger
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
