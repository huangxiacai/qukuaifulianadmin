/***公告管理****/
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
      <Modal v-model="showModal"
             :title="titleModal"
             @on-visible-change="visibleChange"
             width="1000">
        <Form :ref="refName"
              :model="getData"
              :rules="getRult"
              label-position="top"
              class="show_area" inline>
          <FormItem label="公告标题" class="qdd_layout100" prop="noticeTitle">
            <Input v-model="getData.noticeTitle"  placeholder="请输入公告标题"
                   class="setfill"></Input>
          </FormItem>
          <FormItem label="公告内容" prop="noticeContent" class="qdd_layout100">
            <Editor ref="editor"
                    :value="getData.noticeContent"
                    :cache='cache'
                    @on-change="handleChange"></Editor>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button @click="cancel">取消</Button>
          <Button type="primary" :loading="modalLoading" @click="modelOk">添加</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
  import packageTableMixins from '../mixins/packageTableMixins'
  import {mapActions} from 'vuex'
  import {formatDate} from '@/libs/util'
  import addNotice from './components/addNotice'
  import Editor from '_c/editor'
  export default {
    name: 'mageManage',
    mixins: [packageTableMixins],
    data() {
      return {
        cache:false,
        modalLoading:false,
        titleModal:'添加公告',
        showModal:false,
        getData:{
          noticeTitle:null,
          noticeContent:null
        },
        getRult:{
          noticeTitle:[
            { required: true, message: '请填写公告标题', trigger: 'blur' }
          ],
          noticeContent:[
            { required: true, message: '请填写公告内容', trigger: 'change' }
          ]
        },
        refName:'refName',
        reqBase: {},
        title: '公告管理过滤',
        getStatus: [
          {
            value: 0,
            label: '正常',
          },
          {
            value: 1,
            label: '到期',
          },
          {
            value: 2,
            label: '删除',
          }
        ],
        getType: [
          {
            value: 1,
            label: '支付宝',
          },
          {
            value: 2,
            label: '银行卡',
          }
        ],
        startDate: null,
        endDate: null,
        filter_form: {
          startDate: null,
          endDate: null,
          phone: null,
          nickName: null,
          rabbiName:null,
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
            title: '公告标题',
            key: 'noticeTitle',
            align: 'center'
          },
          {
            title: '公告内容',
            key: 'noticeContent',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createDate',
            align: 'center',
            render: (h, {row}) => {
              return h('div', formatDate('Y-m-d H:i:s', row.createDate))
            }
          },
          {
            title: '操作',
            key: '',
            align: 'center',
            fixed: 'right',
            width: 150,
            render: (h, {row}) => {
              let vm = this;
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: function () {
                        vm.edit(row)
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: function () {
                        vm.del(row)
                      }
                    }
                  }, '删除')
                ]);
              }
          }
        ]
      }
    },
    components:{
      Editor
    },
    computed:{
      //文件前缀
      fileImgPrefix(){
        let root=this.$config.imgUrl.pro;
        if(process.env.NODE_ENV !== 'production'){
          root=this.$config.imgUrl.dev;
        }
        return root;
      }
    },
    methods: {
      ...mapActions([
        'handlequeryNotices',//分页
        'handlesaveOrUpdateNotice',//del
        'handledeleteNotice'
      ]),
      //
      showSearchPanel() {
        this.$refs.filterBase.init()
      },
      startDateChange(value) {
        this.$set(this.filter_form, 'startDate', value)
      },
      endDateChange(value) {
        this.$set(this.filter_form, 'endDate', value)
      },
      handleChange(html, text){
        this.$set(this.getData, 'noticeContent', html);
      },
      visibleChange(b){
        if(b){
          if(this.getData.noticeContent!=null){
            this.$refs.editor.setHtml(this.getData.noticeContent);
            this.handleChange(this.getData.noticeContent);
          }else{
            this.$refs.editor.setHtml("");
            this.handleChange("");
          }
        }else{
          this.showModal=false;
          this.getData={
            noticeTitle:null,
              noticeContent:null
          }
        }
      },
      cancel(){
        this.showModal=false;
      },
      //保存公告
      saveNotice(params,text){
        let vm=this;
        this.handlesaveOrUpdateNotice({
          ...params
        }).then(res=>{
          this.modalLoading=false;
          if(res.code===20000){
            this.showModal=false;
            this.init();
            this.$Message.success(text+"公告成功");
          }else{
            this.$Message.error(res.msg);
          }
        });
      },
      modelOk(){
        this.$refs[this.refName].validate((valid) => {
          debugger
          if(valid){
            this.modalLoading=true;
            if(this.getData.noticeId!=undefined){
              this.saveNotice(this.getData,'修改');
              this.titleModal='修改公告';
            }else{
              this.titleModal='添加公告';
              this.saveNotice(this.getData,'添加')
            }
          }else{
          }
        });
      },
      add() {
        this.showModal=true;
      },
      edit(row) {
        this.showModal=true;
        this.$set(this.getData,"noticeId",row.noticeId);
        this.$set(this.getData,"noticeContent",row.noticeContent);
        this.$set(this.getData,"noticeTitle",row.noticeTitle);
      },
      // 重置搜索条件
      resetConditions() {
        this.startDate = null;
        this.endDate = null;
        this.filter_form = {
          startDate: null,
          endDate: null,
          phone: null,
          nickName: null,
          rabbiName:null,
        }
      },

      init() {
        this.tableLoading = true;
        this.handlequeryNotices({...this.reqBase}).then(res => {
          this.tableLoading = false;
          if (res.code === 20000) {
            this.tableDataList = res.data.data||[];
            this.getPageTotal = res.data.totalCount;
          } else {
            this.tableDataList = [];
            this.getPageTotal = 0
          }
        })
      },
      //上架或者下载
      changeMageStatus(row, title) {
        debugger
        let vm = this;
        let config = {
          title: title + '法师',
          content: "您确定要" + title + "法师吗？",
          loading: true,
          onOk: function () {
            let _this = this;
            vm.handleisSellRabbi(
              {
                rabbiId: row.rabbiId,
                isSell: title=="上架"?1:2
              }
            ).then(res => {
              if (res.code === 20000) {
                vm.$Message.success(title + '法师成功！');
                vm.$Modal.remove();
                vm.init()
              } else {
                vm.$Message.error(res.msg);
                _this.buttonLoading = false
              }
            });
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 撤销锁仓
       * @param row
       */
      del(row) {
        let vm = this;
        let config = {
          title: '删除公告',
          content: "您确定要删除此条公告吗？",
          loading: true,
          onOk: function () {
            let _this = this;
            vm.handledeleteNotice({
              noticeId: row.noticeId
            }).then(res => {
              if (res.code === 20000) {
                vm.$Message.success('删除公告成功！');
                vm.$Modal.remove();
                vm.init()
              } else {
                vm.$Message.error(res.msg);
                _this.buttonLoading = false
              }
            });
          }
        };
        this.$Modal.confirm(config);
      }

    },
    mounted() {
      this.init()
    },
    created() {

    }
  }
</script>

<style scoped>
  .setfill {
    width: 100%;
  }

  .show_area {
    height: 500px;
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
</style>

