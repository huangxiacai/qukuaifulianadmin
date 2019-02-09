<template>
  <div class="baseDetails">
    <Form :model="formItem" :label-width="80" inline>
      <FormItem label="设备ID" class="layout50">
        <Input v-model="formItem.did" readonly></Input>
      </FormItem>
      <FormItem label="设备名称" class="layout50">
        <Input v-model="formItem.name" readonly></Input>
      </FormItem>
      <FormItem label="所属区域" class="layout50">
        <Input :value="withIdShowText(formItem.region_id)" readonly></Input>
      </FormItem>
      <FormItem label="安装地址" class="layout50">
        <Input v-model="formItem.addr" readonly></Input>
      </FormItem>

      <FormItem label="地址经度" class="layout50">
        <Input v-model="formItem.longitude" readonly></Input>
      </FormItem>
      <FormItem label="地址纬度" class="layout50">
        <Input v-model="formItem.latitude" readonly></Input>
      </FormItem>
      <FormItem label="创建人" class="layout50">
        <Input v-model="formItem.owner_full_name" readonly></Input>
      </FormItem>
      <FormItem label="创建时间" class="layout50">
        <Input :value="showTimestampToTime(formItem.create_timesec)" readonly></Input>
      </FormItem>
    </Form>
    <div>生效密码</div>
    <packageHeightTable
      ref="packageHeightTableRef"
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
          <Tag  v-for="(item,index) in tagSearchList"
                :name="item.name"
                :key="index"
                color="success"
                closable
                @on-close="closeTagSearch(item.name)"
                closable>{{item.text}}</Tag>
          <Button v-show="tagSearchList.length>0" @click="clearTagSearch" size="small">清空</Button>
        </div>
      </template>

    </packageHeightTable>
  </div>
</template>

<script>
  import {timestampToTime} from '@/libs/util'
  import packageHeightTableMixins from '../../../mixins/packageHeightTableMixins'
  export default {
    name: "baseDetails",
    mixins: [packageHeightTableMixins],
    data() {
      return {
        tableHeight:300,
        columnsheader:[
          {
            title: '锁用户Id',
            key: 'pwd_idx',
            align: 'center',
          },
          {
            title: '密码名称',
            key: 'pwd_name',
            align: 'center',
          },
          {
            title: '密码类型',
            key: 'pwd_type',
            align: 'center',
            render:(h,{row})=>{
              return h('div',this.showTextWithTypeId(row.pwd_type));
            }
          }
        ],
        baseDetalisDataList: [
          {
            label: '设备ID',
            value: this.formItem.deviceId,
            placeholder: '',
            key:'did',
          },
          {
            label: '设备名称',
            value: '',
            placeholder: '',
            key:'name'
          },
          {
            label: '所属区域',
            value: '',
            placeholder: '',
            key:'region_id',
          },
          {
            label: '安装地址',
            value: '',
            placeholder: '',
            key:'attr'
          },
          // {
          //   label: '归属用户',
          //   value: '',
          //   placeholder: '',
          //   key:'owner_uid'
          // },
          // {
          //   label: '网络信号',
          //   value: '',
          //   placeholder: ''
          // },
          // {
          //   label: '电池电量',
          //   value: '',
          //   placeholder: ''
          // },
          // {
          //   label: '固件版本',
          //   value: '',
          //   placeholder: ''
          // },
          {
            label: '地址经度',
            value: '',
            placeholder: '',
            key:'longitude'
          },
          {
            label: '地址纬度',
            value: '',
            placeholder: '',
            key:'latitude'
          },
          {
            label: '创建人',
            value: '',
            placeholder: '',
            key:'owner_uid'
          },
          {
            label: '创建时间',
            value: '',
            placeholder: '',
            key:'create_timesec'
          },
        ],
        passType: [
          {
            value: '1',
            label: '管理员',
          },
          {
            value: '2',
            label: '普通用户',
          },
          {
            value: '3',
            label: '单次用户',
          },
          {
            value: '4',
            label: '劫持密码',
          }
        ],
      }
    },
    props:{
      _vm:{
        type:Object
      },
      formItem: {
        type:Object,
        default:function(){
          return {
            deviceId:'111'
          }
        }
      }
    },
    components: {},
    computed: {
      getAreaListData(){
        if(this._vm!=undefined){
          return this._vm.$store.state.areaManage.areaListData;
        }
        return ''
      }
    },
    methods: {
      //初始化获取基本数据和生效密码列表
      init() {
        this.tableLoading = true;
        this._vm.$store.dispatch('handleGetPassList',{
          "did": this.formItem.did,
          "sdid": this.formItem.sdid,
        }).then(res => {
          this.tableLoading = false;
          if (res.status === 0) {
            this.tableDataList = res.data.pwd_lists;
            this.getPageTotal=res.data.total;
          } else {
            this.tableDataList = [];
            this.getPageTotal = 0;
            this._vm.$Message.error(this.errorCode[res.status]);
          }
        });
      },
      showTextWithTypeId(id){
        let result="";
        for(let i=0;i<this.passType.length;i++){
          if(id==this.passType[i].value){
            result= this.passType[i].label;
            break;
          }
        }
        return result;
      },
      withIdShowText(id){
        let result="";
        for(let i=0;i<this.getAreaListData.length;i++){
          if(this.getAreaListData[i].region_id==id){
            result=this.getAreaListData[i].region_name;
            break;
          }
        }
        return result;
      },
      showTimestampToTime(params){
        let result="";
        if(params){
          result=timestampToTime(params);
        }
        return result;

      }
    },
    mounted() {

    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .layout50, .layout100 {
    margin-bottom: 15px;
  }

  .layout50 {
    width: calc(50% - 12px);
  }

  .layout100 {
    width: calc(100% - 12px);
  }
  .baseDetails{
    height: 400px;
    overflow-y:auto;
  }
</style>
