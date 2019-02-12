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
        <FormItem label="状态:" class="ivu-col ivu-col-span-6 m-b-10">
          <Select v-model="filter_form.status" placeholder="请选择状态">
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
  export default {
    name: "userActiveValue",
    mixins: [packageTableMixins],
    data() {
      return {
        title:'用户活跃度福利值过滤',
        getStatus:[
          {
            label:'全部',
            value:-1
          },
          {
            label:'正常',
            value:1
          },
          {
            label:'冻结',
            value:2
          }
        ],
        filter_form:{
          phone:null,
          status:-1,
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
            title: '有效的福利值',
            key: 'welfareValue',
            align: 'center'
          },
          {
            title: '有效的活跃度',
            key: 'activeValue',
            align: 'center'
          },
          {
            title: '被系统冻结的福利值',
            key: 'freezeWelfareValue',
            align: 'center'
          },
          {
            title: '被系统冻结的活跃度',
            key: 'freezeActive',
            align: 'center'
          }
        ],
      }
    },
    methods: {
      ...mapActions([
        'handleQueryUserValues'
      ]),
      //
      showSearchPanel(){
        this.$refs.filterBase.init();
      },

      //重置搜索条件
      resetConditions(){
        this.filter_form={
          phone:null,
          status:-1,
        }
      },

      init() {
        this.tableLoading=true;
        this.handleQueryUserValues({...this.reqBase}).then(res=>{
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
