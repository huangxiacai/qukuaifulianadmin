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
  import delCommunityForm from '../comontents/delCommon'
  import {getEnumArrText} from '@/libs/util'
  import addForm from './component/addForm'

  export default {
    name: 'propertyList',
    mixins: [packageTableMixins],
    data() {
      return {
        reqBase: {
          region_id: null,
          page: 1,
          page_size: 15
        },
        tableDataList: [{}],
        headBtnList: [
          {
            mothod: this.add,
            type: 'primary',
            icon: '',
            text: '新增',
          }
        ],
        columnsheader: [
          {
            align: 'center',
            title: '姓名',
            key: 'nickname',
          },
          {
            align: 'center',
            title: '身份证号码',
            key: 'id_number',
          },
          {
            align: 'center',
            title: '手机号码',
            key: 'mobile',
          },
          {
            align: 'center',
            title: '人脸',
            key: '',
          },
          {
            align: 'center',
            title: '所属小区',
            key: 'building_guid',
            render: (h, {row}) => {
              return h("div", getEnumArrText(this.communtiyList, row.building_guid))
            }
          },
          {
            align: 'center',
            title: '状态',
            key: 'states',
            render: (h, {row}) => {
              let result = "";
              if (row.states === 1) {
                result = "可用"
              } else if (row.states === 2) {
                result = "禁用"
              }
              return h('div', result);
            }
          },
          {
            align: 'center',
            title: '操作',
            width: 250,
            key: '',
            render: (h, {row}) => {
              let basearr = [h('Button', {
                style: {
                  marginLeft: '3px'
                },
                props: {
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showDetails(row)
                  }
                }
              }, '编辑'),
                h('Button', {
                  style: {
                    marginLeft: '3px'
                  },
                  props: {
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.del(row)
                    }
                  }
                }, '删除'),];
              if (row.states === 1) {
                basearr.unshift(
                  h('Button', {
                    style: {
                      marginLeft: '3px'
                    },
                    props: {
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.closeProhibit(row)
                      }
                    }
                  }, '禁用')
                );
              } else if (row.states === 2) {
                basearr.unshift(
                  h('Button', {
                    style: {
                      marginLeft: '3px'
                    },
                    props: {
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.openProhibit(row)
                      }
                    }
                  }, '启用')
                )
              }
              return h('div', basearr)
            }
          },
        ]
      }
    },
    components: {
      packageTable,
      addFormAdmin
    },
    computed: {
      communtiyList() {
        return this.$store.state.communtiyListArr;
      }
    },
    methods: {
      ...mapActions([
        'handleGetAdminList',//获取物业管理员
        'handleAddAdmin',
        'handleEditAdmin',
        'handleDelAdmin',//删除物业人员
        'handleSetAdminStatus'
      ]),
      init() {
        this.tableLoading = true;
        this.handleGetAdminList({...this.reqBase}).then(res => {
          this.tableLoading = false;
          if (res.status === 0) {
            this.tableDataList = res.data.users ? res.data.users : [];
            this.getPageTotal = res.data.total;
          } else {
            this.tableDataList = [];
            this.$Message.error(this.errorCode[res.status]);
          }
        });

      },
      //启用
      openProhibit(row) {
        let vm = this;
        let title = "启用管理员";
        let content = "您确定要启用管理员帐号吗";
        this.$Modal.confirm({
          title: title,
          content: content,
          loading: true,
          onOk: function () {
            let _this = this;
            let {org_code,user_id,building_guid} =row;
            vm.handleSetAdminStatus(
              {
                org_code,
                user_id,
                building_guid,
                "states": 1
              }
            ).then(res => {
              if (res.status === 0) {
                vm.$Message.success("启用成功");
                vm.$Modal.remove();
                vm.init();
              } else {
                vm.$Message.error(vm.errorCode[res.status]);
                _this.buttonLoading = false;
              }
            });
          }
        });
      },
      //禁用
      closeProhibit(row) {
        let vm = this;
        let title = "禁用管理员";
        let content = "您确定要禁用管理员帐号吗";
        this.$Modal.confirm({
          title: title,
          content: content,
          loading: true,
          onOk: function () {
            let _this = this;
            let {org_code,user_id,building_guid} =row;
            vm.handleSetAdminStatus(
              {
                org_code,
                user_id,
                building_guid,
                "states": 2
              }
            ).then(res => {
              if (res.status === 0) {
                vm.$Message.success("禁用成功");
                vm.$Modal.remove();
                vm.init();
              } else {
                vm.$Message.error(vm.errorCode[res.status]);
                _this.buttonLoading = false;
              }
            });
          }
        });
      },
      /**
       * 新增物业管理人员
       */
      add() {
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
      importData() {

      },
      exportData() {

      },
      showQRcode() {
        let config = {
          loading: true,
          width: 350,
          okText: '保存',
          render: (h) => {
            return h("div", [
              h('h3', '获取二维码'),
              h('div', [
                h('img', {
                  props: {},
                  attrs: {
                    src: '111'
                  }
                })
              ])
            ]);
          },
          onOk: function () {
            let _this = this;
            //下载二维码连接
          }
        };
        this.$Modal.confirm(config);
      },
      del() {
        let config = {
          loading: true,
          width: 350,
          render: (h) => {
            return h("div", [
              h('h3', '删除物业人员'),
              h(delCommunityForm, {
                ref: 'delCommunityForm',
                props: {}
              }),
            ])
          },
          onOk: function () {
            let _this = this;
            let obj = this.$refs.delCommunityForm;
            obj.checkForm().then(res => {
              if (res) {
                //请求接口
              } else {
                _this.buttonLoading = false;
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
            this.selectTabelList = [];
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
            return h('div', [
              h('h3', {
                slot: 'title'
              }, '编辑'),
              h(addForm, {
                ref: 'editForm',
                props: {
                  _vm: vm,
                  getModelData: {...row}
                }
              })
            ]);
          },
          onOk: function () {
            let _this = this;

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
        let len = 0;
        if (selectedData && selectedData.length > 0) {
          len = selectedData.length;
        }
        if (selectedData) {
          this.tagSearchList.splice(0, 1, {
            name: selectedData[len - 1].region_id,
            text: selectedData[len - 1].title,
            key: 'region_id',
            ...selectedData[len - 1]
          });
          this.reqBase.region_id = selectedData[len - 1].region_id;
          this.init();
        }
      },
      /**
       * 清空tag search
       */
      clearTagSearch() {
        this.tagSearchList.splice(0, this.tagSearchList.length);
        this.areaValue = [];
        //重置筛选条件
        this.reqBase = {
          region_id: null,
          page: 1,
          page_size: 15
        };
        this.init();
      },
      /**
       * 关闭单个筛选
       * @param name
       */
      closeTagSearch(name) {
        for (let i in this.tagSearchList) {
          let list = this.tagSearchList[i];
          if (name == list.name) {
            //删除当前的筛选条件
            //获取删除的key,重置 单个筛选条件
            this.reqBase[list.key] = null;
            //list.key
            this.tagSearchList.splice(i, 1);
            this.areaValue = [];
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
