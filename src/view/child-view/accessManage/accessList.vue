<!--物业人员管理-->
<template>
  <div>
    <addFormAdmin ref="addFormAdmin"></addFormAdmin>
    <packageTable
      ref="contentBaseRef"
      :columnsData="columnsheader"
      :tableData="tableDataList"
      :reduceheight="reduceheight"
      :loading="tableLoading"
      :border="true"
      :tabletotallen="getPageTotal"
      @pageonChange="pageonChange"
      @refreshBtn="init"
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
    </packageTable>
  </div>
</template>

<script>
  import packageTable from '../comontents/packageTable'
  import packageTableMixins from '../mixins/packageTableMixins'
  import {mapActions} from 'vuex'
  import addFormAdmin from './component/addFormAdmin'
  import delCommunityForm from '../communityManage/component/delCommunity'
  export default {
    name: 'accessList',
    mixins: [packageTableMixins],
    data() {
      return {
        reqBase: {
          region_id: null,
          page:1,
          page_size:15
        },
        tableDataList:[{}],
        headBtnList: [
          // {
          //   mothod: this.add,
          //   type: 'primary',
          //   icon: '',
          //   text: '新增',
          // }
        ],
        columnsheader: [
          {
            align: 'center',
            title: '小区名称',
            key: 'region_id',
            renderHeader: (h, {row}) => {
              let vm = this;
              return h('div', {
                style: {
                  textAlign: 'center',
                  display: 'flex'
                }
              }, [
                h('span', '小区名称'),
                h('Cascader', {
                  props: {
                    value:vm.areaValue,
                    data: [],
                    transfer: true,
                    'change-on-select': true
                  },
                  on: {
                    'on-change': (value, selectedData) => {
                      //vm.CascaderOnChange(value, selectedData);
                    }
                  }
                }, [
                  h('Icon', {
                    style:{
                      fontSize:'14px',
                      cursor:"pointer",
                    },
                    props: {type: 'ios-search'}
                  })
                ])
              ])
            }
          },
          {
            align: 'center',
            title: '姓名',
            key:'',
            renderHeader: (h, {row}) => {
              let vm = this;
              return h('div', {
                style: {
                  textAlign: 'center',
                  display: 'flex'
                }
              }, [
                h('span', '姓名'),
                h('Cascader', {
                  props: {
                    value:vm.areaValue,
                    data: [],
                    transfer: true,
                    'change-on-select': true
                  },
                  on: {
                    'on-change': (value, selectedData) => {
                      //vm.CascaderOnChange(value, selectedData);
                    }
                  }
                }, [
                  h('Icon', {
                    style:{
                      fontSize:'14px',
                      cursor:"pointer",
                    },
                    props: {type: 'ios-search'}
                  })
                ])
              ])
            }
          },
          {
            align: 'center',
            title: '用户类型',
            key:'',
            renderHeader: (h, {row}) => {
              let vm = this;
              return h('div', {
                style: {
                  textAlign: 'center',
                  display: 'flex'
                }
              }, [
                h('span', '用户类型'),
                h('Cascader', {
                  props: {
                    value:vm.areaValue,
                    data: [],
                    transfer: true,
                    'change-on-select': true
                  },
                  on: {
                    'on-change': (value, selectedData) => {
                      //vm.CascaderOnChange(value, selectedData);
                    }
                  }
                }, [
                  h('Icon', {
                    style:{
                      fontSize:'14px',
                      cursor:"pointer",
                    },
                    props: {type: 'ios-search'}
                  })
                ])
              ])
            }
          },
          {
            align: 'center',
            title: '房号',
            key:'',
          },
          {
            align: 'center',
            title: '人像',
            key:'',
            renderHeader: (h, {row}) => {
              let vm = this;
              return h('div', {
                style: {
                  textAlign: 'center',
                  display: 'flex'
                }
              }, [
                h('span', '人像'),
                h('Cascader', {
                  props: {
                    value:vm.areaValue,
                    data: [],
                    transfer: true,
                    'change-on-select': true
                  },
                  on: {
                    'on-change': (value, selectedData) => {
                      //vm.CascaderOnChange(value, selectedData);
                    }
                  }
                }, [
                  h('Icon', {
                    style:{
                      fontSize:'14px',
                      cursor:"pointer",
                    },
                    props: {type: 'ios-search'}
                  })
                ])
              ])
            }
          },
          {
            align: 'center',
            title: '时间',
            key:'',
            renderHeader: (h, {row}) => {
              let vm = this;
              return h('div', {
                style: {
                  textAlign: 'center',
                  display: 'flex'
                }
              }, [
                h('span', '时间'),
                h('Cascader', {
                  props: {
                    value:vm.areaValue,
                    data: [],
                    transfer: true,
                    'change-on-select': true
                  },
                  on: {
                    'on-change': (value, selectedData) => {
                      //vm.CascaderOnChange(value, selectedData);
                    }
                  }
                }, [
                  h('Icon', {
                    style:{
                      fontSize:'14px',
                      cursor:"pointer",
                    },
                    props: {type: 'ios-search'}
                  })
                ])
              ])
            }
          },
          {
            align: 'center',
            title: '进出',
            key:'',
          }
        ]
      }
    },
    components: {
      packageTable,
      addFormAdmin
    },
    computed: {

    },
    methods: {
      ...mapActions([
        'handleGetAccessList',//获取出入记录列表
      ]),
      init() {
        this.tableLoading = true;
        this.handleGetAccessList({...this.reqBase}).then(res => {
          this.tableLoading = false;
          if (res.status === 0) {
            this.tableDataList = res.data.users?res.data.users:[];
            this.getPageTotal = res.data.total;
          } else {
            this.tableDataList = [];
            this.$Message.error(this.errorCode[res.status]);
          }
        });

      },
      /**
       * 新增物业管理人员
       */
      add(){
        this.$refs.addFormAdmin.showModal(true);
        // let vm=this;
        // let config={
        //   width:500,
        //   loading:true,
        //   render:(h)=>{
        //     return h('div',[
        //       h('h3',{slot:'header'},"添加业主"),
        //       h(addForm,{
        //         ref:'addForm',
        //         props:{
        //
        //         }
        //       })
        //     ])
        //
        //   },
        //   onOk:function(){
        //     let _this=this;
        //     let obj=this.$refs.addForm;
        //     obj.checkForm().then(res=>{
        //       if(res){
        //         //提交请求
        //       }else{
        //         _this.buttonLoading=false;
        //       }
        //     });
        //   }
        // };
        // this.$Modal.confirm(config);
      },
      importData(){

      },
      exportData(){

      },
      showQRcode(){
        let config={
          loading:true,
          width:350,
          okText:'保存',
          render:(h)=>{
            return h("div",[
              h('h3','获取二维码'),
              h('div',[
                h('img',{
                  props:{

                  },
                  attrs:{
                    src:'111'
                  }
                })
              ])
            ]);
          },
          onOk:function(){
            let _this=this;
            //下载二维码连接
          }
        };
        this.$Modal.confirm(config);
      },
      del(){
        let config={
          loading:true,
          width:350,
          render:(h)=>{
            return h("div",[
              h('h3','删除物业人员'),
              h(delCommunityForm,{
                ref:'delCommunityForm',
                props:{

                }
              }),
            ])
          },
          onOk:function(){
            let _this=this;
            let obj=this.$refs.delCommunityForm;
            obj.checkForm().then(res=>{
              if(res){
                //请求接口
              }else{
                _this.buttonLoading=false;
              }
            });
          }
        };
        this.$Modal.confirm(config);
      },

      /**
       * 删除用户
       */
      delUser() {
        let vm = this;
        if (this.selectTabelList == null || this.selectTabelList.length == 0) {
          this.$Message.error("请选中需要删除的用户");
          return;
        }
        let arr = [];
        for (let i in this.selectTabelList) {
          arr.push(this.selectTabelList[i].user_id)
        }
        let config = {
          title: '删除用户',
          content: '确定删除当前所选的用户吗？',
          loading: true,
          onOk: function () {
            vm.delUserReq(arr);
            this.$Modal.remove();
          }
        };
        this.$Modal.confirm(config);


      },
      /**
       * 调用删除方法
       */
      delUserReq(delIdList) {
        this.handleDelUser({
          del_uid: [...delIdList]
        }).then(res => {
          if (res.status === 0) {
            this.$Message.success("删除成功");
            this.init();
            this.selectTabelList=[];
          } else {
            this.$Message.error(this.errorCode[res.status]);
          }
        });
      },
      /**
       * 关联设备
       */
      relationDevice(row) {
        this.$refs.addReleationDevice.showModal(true);
        this.setCurrUserId = row.user_id;
      },

      /**
       * 显示详情
       * @param row
       */
      showDetails(row) {
        let vm = this;
        let config = {
          width: 500,
          render: (h) => {
            return h('div',[
              h('h3',{
                slot:'title'
              },'编辑'),
              h(addForm, {
                props: {
                  _vm: vm,
                  getModelData: {...row}
                }
              })
            ]);
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 禁用user
       * @param row
       */
      disableUser(row) {
        let vm = this;
        let config = {
          title: '禁用用户',
          content: '您是否想禁用这个用户',
          loading: true,
          onOk: function () {
            //调用禁用方法
            vm.handleDisableUser().then(res => {

            })
          }
        };
        this.$Modal.confirm(config);
      },
      /**
       * 重置 密码
       * @param row
       */
      resetPass(row) {

      },
      CascaderOnChange(value, selectedData) {
        let len=0;
        if(selectedData && selectedData.length>0){
          len=selectedData.length;
        }
        if (selectedData) {
          this.tagSearchList.splice(0, 1, {
            name: selectedData[len-1].region_id,
            text: selectedData[len-1].title,
            key:'region_id',
            ...selectedData[len-1]
          });
          this.reqBase.region_id=selectedData[len-1].region_id;
          this.init();
        }
      },
      /**
       * 清空tag search
       */
      clearTagSearch(){
        this.tagSearchList.splice(0,this.tagSearchList.length);
        this.areaValue=[];
        //重置筛选条件
        this.reqBase={
          region_id: null,
          page:1,
          page_size:15
        };
        this.init();
      },
      /**
       * 关闭单个筛选
       * @param name
       */
      closeTagSearch(name){
        for(let i in this.tagSearchList){
          let list=this.tagSearchList[i];
          if(name==list.name){
            //删除当前的筛选条件
            //获取删除的key,重置 单个筛选条件
            this.reqBase[list.key]=null;
            //list.key
            this.tagSearchList.splice(i,1);
            this.areaValue=[];
            this.init();
          }
        }
      },
    },
    mounted() {
      this.init();
    },
    created() {

    }
  }
</script>

<style scoped>
  .base_btn_item {
    margin-right: 5px;
  }

  .btnMargin {
    margin-left: 3px;
  }
</style>
