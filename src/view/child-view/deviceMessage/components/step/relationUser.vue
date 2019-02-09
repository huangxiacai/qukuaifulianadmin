<template>
  <Modal
    v-model="showModalStatus"
    :width="width"
    :footer-hide="true"
    @on-visible-change="onVisibleChange"
    :title="title">
    <Row :gutter="8">
      <Col span="12">
        <Card>
          <div slot="title">用户列表</div>
          <div style="margin:-16px">
            <packageHeightTable
              ref="packageHeightTableRef1"
              :columnsData="columnsheader"
              :tableData="tableDataList"
              :height="tableHeight"
              :loading="tableLoading"
              :border="true"
              :tabletotallen="getPageTotal"
              @pageonChange="pageonChange"
              @showSearchParel="showSearchParel"
              @getSelect="getSelectList">
              <template slot="headLeft">
                <div>
                  <span style="margin-right: 5px;">筛选条件>:</span>
                  <Tag v-for="(item,index) in tagSearchList"
                       :name="item.name"
                       :key="index"
                       color="success"
                       closable
                       @on-close="closeTagSearch(item.name)"
                       closable>{{item.text}}
                  </Tag>
                  <Button v-show="tagSearchList.length>0" @click="clearTagSearch" size="small">清空</Button>
                </div>
              </template>
              <template slot="headRight">
                <Button v-for="(item,index) in headBtnList" @click="item.mothod" :key="index" class="base_btn_item"
                        :type="item.type" :icon="item.icon">
                  {{item.text}}
                </Button>
              </template>
            </packageHeightTable>
          </div>
        </Card>
      </Col>
      <Col span="12">

        <Card>
          <div slot="title">归属用户</div>
          <div style="margin:-16px">
            <packageHeightTable
              ref="packageHeightTableRef2"
              :columnsData="columnsheader"
              :tableData="tableDataList2"
              :height="tableHeight"
              :loading="tableLoading"
              :border="true"
              :tabletotallen="getPageTotal2"
              @pageonChange="pageonChange2"
              @showSearchParel="showSearchParel"
              @getSelect="getSelectList2">
              <template slot="headLeft">
                <div>
                  <span style="margin-right: 5px;">筛选条件>:</span>
                  <Tag v-for="(item,index) in tagSearchList"
                       :name="item.name"
                       :key="index"
                       color="success"
                       closable
                       @on-close="closeTagSearch(item.name)"
                       closable>{{item.text}}
                  </Tag>
                  <Button v-show="tagSearchList.length>0" @click="clearTagSearch" size="small">清空</Button>
                </div>
              </template>
              <template slot="headRight">
                <Button v-for="(item,index) in headBtnList1" @click="item.mothod" :key="index" class="base_btn_item"
                        :type="item.type" :icon="item.icon">
                  {{item.text}}
                </Button>
              </template>
            </packageHeightTable>
          </div>
        </Card>


      </Col>
    </Row>
  </Modal>
</template>

<script>
  import {setToken, getToken, withIdShowText} from '@/libs/util'
  import {modalTemplateMixins} from '../../../mixins/modalTemplateMixins'
  import packageHeightTableMixins from '../../../mixins/packageHeightTableMixins'

  export default {
    name: "relationUser",
    mixins: [packageHeightTableMixins, modalTemplateMixins],
    data() {
      return {
        tableLoading: false,
        tagSearchList: [],
        reqBase2: {
          did:null
        },
        selectTabelList2: null,//table选中项
        tableDataList2: [],
        getPageTotal2: 0,
        fristLoading: true,
        headBtnList: [
          {
            mothod: this.addUserToDevice,
            type: 'primary',
            icon: '',
            text: '添加',
          },

        ],
        headBtnList1: [
          {
            mothod: this.delUserFromDevice,
            type: 'primary',
            icon: '',
            text: '删除',
          },
        ],
        columnsheader: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '帐号(手机)',
            key: 'mobile',
          },
          {
            title: '用户名称',
            key: 'full_name',
          },
          {
            title: '所属区域',
            key: 'region_id',
            render: (h, {row}) => {
              return h('div', withIdShowText(this.getAreaListData, row.region_id))
            }
          },
          // {
          //   title:'上级名称',
          //   key:'',
          // }
        ],
      }
    },
    props: {
      tableHeight: {
        type: Number,
        default: 400
      },
      title: {
        type: String,
        default: '关联用户'
      },
      width: {
        type: Number,
        default: 900
      },
      did:{
        type:String
      }
    },

    components: {},
    computed: {
      getAreaListData() {
        return this.$store.state.areaManage.areaListData;
      }
    },
    methods: {
      init() {
        this.selectTabelList2=[];
        this.selectTabelList=[];
        this.getAllUser();
        this.getRegionUser();
      },
      //获取所有用户
      getAllUser() {
        //获取用户列表
        this.tableLoading = true;
        this.$store.dispatch('handleGetUserManageList', {...this.reqBase}).then(res => {
          this.tableLoading = false;
          if (res.status === 0) {
            this.tableDataList = res.data.users||[];
            this.getPageTotal = res.data.total;
          } else {
            this.tableDataList = [];
            this.$Message.error(this.errorCode[res.status]);
          }
        });
      },
      //获取归属用户
      getRegionUser() {
        //获取此设备下关联的用户
        this.$store.dispatch('handleGetUserOperationDevice', {...this.reqBase2}).then(res => {
          if (res.status === 0) {
            this.getUserMessageList(res.data.uids);
            this.getPageTotal2 = res.data.uids?res.data.uids.length:0;
          } else {
            this.tableDataList2 = [];
            this.getPageTotal2 = 0;
            this.$Message.error(this.errorCode[res.status]);
          }
        });
      },
      //重置状态
      reset() {
        this.fristLoading = true;
      },
      //给设备添加用户
      addUserToDevice() {
        //是否有选中的用户
        if (this.selectTabelList != null && this.selectTabelList.length > 0) {
          for(let i in this.selectTabelList){
            //设置⽤⼾可访问设备授权
            this.$store.dispatch("handleBuserdeviceaclset", {
              "did": this.did,
              "user_id": this.selectTabelList[i].user_id,
              "acl": [49]
            }).then(res => {
              if(res.status===0){
                this.$Message.success("添加成功");
                this.init();
              }else{
                this.$Message.error(this.errorCode[res.status]);
              }
            });
          }
        } else {
          this.$Message.error("请选择需要添加的设备");
        }
      },
      //删除授权用户
      delUserFromDevice() {
        //是否有选中的设备
        if (this.selectTabelList2 != null && this.selectTabelList2.length > 0) {
          for (let i in this.tableDataList2) {
            this.$store.dispatch("handleDelBuserdeviceaclset", {
              "did": this.did,
              "user_id": this.tableDataList2[i].user_id,
            }).then(res => {
              if(res.status===0){
                this.init();
              }else{
                this.$Message.error(this.errorCode[res.status]);
              }
            });
          }
        } else {
          this.$Message.error("请选择需要删除的设备");
        }
      },
      //根据 id 获取用户详细信息
      getUserMessageList(arr){
        let _arr=[];
        for(let i in arr){
          _arr.push(arr[i].user_id);
        }
        this.$store.dispatch("handleGetUserListprofileget",{user_id:_arr}).then(res=>{
          if(res.status===0){
            this.tableDataList2=res.data.profiles||[];
          }else{
            this.$Message.error(this.errorCode[res.status]);
          }
        });
      },
      //选择所选项
      getSelectList2(section) {
        this.selectTabelList2 = section;
      },
      pageonChange2(index) {
        this.reqBase2.page = index;
        this.init();
      },
      pageonChange(index) {
        this.reqBase.page = index;
        this.init();
      },
      /**
       * 显示状态发生变化时触发
       */
      onVisibleChange(b) {
        if (b) {
          this.reqBase2.did=this.did;
          this.init();
        } else {
          this.tableDataList=[];
          this.tableDataList2=[];

        }
      },
    },
    mounted() {
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
