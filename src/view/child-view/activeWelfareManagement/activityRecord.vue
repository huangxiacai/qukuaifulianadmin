/***活跃度记录****/
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
  import {mapActions} from 'vuex'
  import {formatDate} from '@/libs/util'
  export default {
    name: "welfareRecord",
    mixins: [packageTableMixins],
    data() {
      return {
        reqBase:{
          type:-1,
          currentPage:1,
          length:15
        },
        title:'活跃度记录过滤',
        getStatus:[
          {
            label:'全部',
            value:-1
          },
          {
            label:'签到',
            value:1
          },
          {
            label:'发帖',
            value:2
          },
          {
            label:'转换成福利值',
            value:3
          },
          {
            label:'置顶帖子',
            value:4
          }
        ],
        startDate:null,
        endDate:null,
        filter_form:{
          phone:null,
          type:-1,
          startDate:null,
          endDate:null,
          nickName:null,
        },
        headBtnList: [

        ],
        columnsheader: [
          {
            title: '用户昵称',
            key: 'nickname',
            align: 'center',
            render:(h,{row})=>{
              return h('div',row.postUser.nickname);
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
            render:(h,{row})=>{
              return h('div',row.postUser.phone);
            }
          },
          {
            title: '活跃度',
            key: 'activeValue',
            align: 'center'
          },
          {
            title: '活跃度来源',
            key: 'type',
            align: 'center',
            render:(h,{row})=>{
              let vm=this;
              let result="";
              for(let s=0;s<vm.getStatus.length;s++){
                let list=vm.getStatus[s];
                if(list.value===row.type){
                  result=list.label;
                  break;
                }
              }
              return h('div',result)
            }
          },
          {
            title: '活跃度获得时间',
            key: 'createDate',
            align: 'center',
            render:(h,{row})=>{
              return h('div',formatDate('Y-m-d h:m:s',row.createDate))
            }
          },
          {
            title: '备注',
            key: 'recordDesc',
            align: 'center'
          }
        ],
      }
    },
    methods: {
      ...mapActions([
        'handleQueryActiveRecords'
      ]),
      //
      showSearchPanel(){
        this.$refs.filterBase.init();
      },
      startDateChange(value){
        this.$set(this.filter_form,"startDate",value);
      },
      endDateChange(value){
        this.$set(this.filter_form,"endDate",value);
      },
      //重置搜索条件
      resetConditions(){
        this.startDate=null;
        this.endDate=null;
        this.filter_form={
          phone:null,
          type:-1,
          startDate:null,
          endDate:null,
          nickName:null,
        }
      },

      init() {
        this.tableLoading=true;
        this.handleQueryActiveRecords({...this.reqBase}).then(res=>{
          this.tableLoading=false;
          if(res.code===20000){
            this.tableDataList=res.data.data;
            this.getPageTotal=res.data.totalCount;
          }else{
            this.tableDataList=[];
            this.getPageTotal=0;
          }
        });
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

</style>

