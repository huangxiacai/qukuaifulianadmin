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
  import {mapActions} from 'vuex'
  export default {
    name: "accessManage",
    mixins: [packageTableMixins],
    data() {
      return {
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
            title: '用户昵称',
            key: 'nickname',
            align: 'center'
          },
          {
            title: '用户id',
            key: 'userId',
            align: 'center'
          },
          {
            title: '手机号',
            key: 'phone',
            align: 'center'
          },
          {
            title: '平台',
            key: 'type',
            align: 'center',
            render:(h,{row})=>{
              let result="";
              if(row.type===1){
                result="后台"
              }else if(row.type===2){
                result="安卓"
              }else if(row.type===3){
                result="ios"
              }
              return h('div',result)
            }
          },

          {
            title: '创建时间',
            key: 'createDate',
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render:(h,{row})=>{
              let result="";
              if(row.status===1){
                result="正常"
              }else if(row.status===2){
                result="冻结"
              }
              return h('div',result)
            }
          },
          {
            title: '操作',
            key: '',
            align: 'center',
            render: (h, {row}) => {
              let result = "";
              if (row.status === 1) {
                result = "冻结"
              } else if (row.status === 2) {
                result = "冻结"
              }
              return h('Button', {
                on: {
                  click: this.updateUserStatus(row)
                }
              }, result)
            }
          },
        ],
      }
    },
    methods: {
      ...mapActions([
        'handleGetqueryUsers'
      ]),
      add() {

      },
      /**
       * 改变用户状态
       * @param userid
       * @param state
       */
      updateUserStatus({userid, state}) {

      },
      init() {
        this.handleGetqueryUsers({}).then(res=>{
          debugger
          if(res.code===20000){
            this.tableDataList=res.data.data;
            this.getPageTotal=res.data.totalCount;
          }else{
            this.tableDataList=[];
            this.getPageTotal=0;
          }
        });
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

</style>
