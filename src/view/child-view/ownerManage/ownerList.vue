<!--业主管理-->
<template>
  <div>
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
        <Select v-model="currCommunity" placeholder="请选择小区" @on-change="communityChange" style="width: 200px;">
          <Option v-for="(item,index) in communityListData"
                  :key="index"
                  :value="item.value"
                  :label="item.label">{{item.label}}</Option>
        </Select>
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
  import addForm from './component/addForm'
  import importOwner from './component/importOwner'
  import delCommunityForm from '../comontents/delCommon'

  export default {
    name: 'ownerList',
    mixins: [packageTableMixins],
    data() {
      return {
        currCommunity:'123142',
        reqBase: {
          page:1,
          page_size:15
        },
        headBtnList: [
          {
            mothod: this.add,
            type: 'primary',
            icon: '',
            text: '新增',
          },
          {
            mothod: this.importData,
            type: 'primary',
            icon: '',
            text: '导入',
          },
          {
            mothod: this.exportData,
            type: 'primary',
            icon: '',
            text: '导出',
          },
        ],
        columnsheader: [
          // {
          //   align: 'center',
          //   title: '小区名称',
          //   key: 'region_id',
          //   renderHeader: (h, {row}) => {
          //     let vm = this;
          //     return h('div', {
          //       style: {
          //         textAlign: 'center',
          //         display: 'flex'
          //       }
          //     }, [
          //       h('span', '小区名称'),
          //       h('Cascader', {
          //         props: {
          //           value:vm.areaValue,
          //           data: [],
          //           transfer: true,
          //           'change-on-select': true
          //         },
          //         on: {
          //           'on-change': (value, selectedData) => {
          //             //vm.CascaderOnChange(value, selectedData);
          //           }
          //         }
          //       }, [
          //         h('Icon', {
          //           style:{
          //             fontSize:'14px',
          //             cursor:"pointer",
          //           },
          //           props: {type: 'ios-search'}
          //         })
          //       ])
          //     ])
          //   }
          // },
          {
            align: 'center',
            title: '姓名',
            key:'owner_name',
          },
          {
            align: 'center',
            title: '身份证号',
            key:'id_number',
          },
          {
            align: 'center',
            title: '手机号',
            key:'owner_mobile',
          },
          {
            align: 'center',
            title: '房号',
            key: 'room_number'
          },
          {
            align: 'center',
            title: '人像状态',
            key:'',
          },
          {
            align: 'center',
            title: '操作',
            width:250,
            key: '',
            render: (h, {row}) => {
              return h('div', [
                h('Button', {
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
                },'编辑'),
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
                },'删除'),
              ])
            }
          },
        ]
      }
    },
    components: {
      packageTable
    },
    computed: {
      getAreaListData() {
        return this.$store.state.areaManage.areaListData;
      },
      getAreaDataTree() {
        return this.$store.state.areaManage.areaListDataTree;
      },
      communityListData(){
        return this.$store.state.communtiyListArr
      }
    },
    methods: {
      ...mapActions([
        'handleGetOwnerList',
        'handleAddOwner',
        'handleEditOwner',
        'handleDelOwner',//删除
      ]),
      init() {
        this.tableLoading = true;
        this.handleGetOwnerList({...this.reqBase}).then(res => {
          this.tableLoading = false;
          this.tableDataList=[];
          if (res.status === 0) {
            this.tableDataList = res.data.owners?res.data.owners:[];
            this.getPageTotal = res.data.total;
          } else {
            this.tableDataList = [];
            this.$Message.error(this.errorCode[res.status]);
          }
        });

      },
      communityChange(value){
        Object.assign(this.reqBase,"building_guid",value);
        this.init();
      },
      /**
       * 新增小区
       */
      add(){
        let vm=this;
        let config={
          width:500,
          loading:true,
          render:(h)=>{
            return h('div',[
              h('h3',{slot:'header'},"添加业主"),
              h(addForm,{
                ref:'addForm',
                props:{
                  communityListData:this.communityListData
                }
              })
            ])

          },
          onOk:function(){
            let _this=this;
            let obj=this.$refs.addForm;
            obj.checkForm().then(res=>{
              if(res){
                //提交请求
                let {building_guid,owner_name,owner_mobile,id_number,room_number}=obj.formModel;
                vm.handleAddOwner({
                  building_guid,
                  owner_name,
                  owner_mobile,
                  id_number,
                  room_number
                }).then(res=>{
                  if(res.status===0){
                    vm.$Message.success("添加成功");
                    vm.$Modal.remove();
                    vm.init();
                  }else{
                    _this.buttonLoading=false;
                    vm.$Message.error(this.errorCode[res.status]);
                  }
                });
              }else{
                _this.buttonLoading=false;
                vm.$Message.error(this.errorCode[res.status]);
              }
            });
          }
        };
        this.$Modal.confirm(config);
      },
      importData(){
        let vm=this;
        let config={
          width:500,
          okText:'关闭',
          render:(h)=>{
            return h('div',[
              h('h3',{slot:'header'},"批量导入业主信息"),
              h(importOwner,{
                ref:'importOwner',
                props:{
                }
              })
            ])
          }
        };
        this.$Modal.info(config);
      },
      exportData(){

      },
      del(){
        let vm=this;
        let config={
          loading:true,
          width:350,
          render:(h)=>{
            return h("div",[
              h('h3','删除业主'),
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
                vm.handleDelOwner().then(res=>{
                  if(res.status===0){
                    vm.$Modal.remove();
                    vm.$Message.success("删除成功");
                    vm.init();
                  }else{
                    vm.$Message.error(vm.errorCode[res.status]);
                    _this.buttonLoading=false;
                  }
                })
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
       * 显示详情
       * @param row
       */
      showDetails(row) {
        let vm = this;
        let config = {
          width: 500,
          loading:true,
          render: (h) => {
            return h('div',[
              h('h3',{
                slot:'title'
              },'编辑'),
              h(addForm, {
                props: {
                  _vm: vm,
                  getModelData: {...row},
                  communityListData:this.communityListData
                }
              })
            ]);
          },
          onOk:function(){
            let _this=this;
            let obj=this.$refs.addForm;
            obj.checkForm().then(res=>{
              if(res){
                //提交请求
                let {xcuid,building_guid,owner_name,owner_mobile,id_number,room_number}=obj.formModel;
                vm.handleEditOwner({
                  xcuid,
                  building_guid,
                  owner_name,
                  owner_mobile,
                  id_number,
                  room_number
                }).then(res=>{
                  if(res.status===0){
                    vm.$Message.success("修改成功");
                    vm.$Modal.remove();
                    vm.init();
                  }else{
                    _this.buttonLoading=false;
                    vm.$Message.error(this.errorCode[res.status]);
                  }
                });
              }else{
                _this.buttonLoading=false;
                vm.$Message.error(this.errorCode[res.status]);
              }
            });
          }
        };
        this.$Modal.confirm(config);
      }
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
