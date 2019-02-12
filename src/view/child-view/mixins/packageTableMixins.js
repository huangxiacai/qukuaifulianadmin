/*********封装packageTable mixins 的基本数据*******/
import packageTable from '../comontents/packageTable'
import {getToken } from '@/libs/util'
export default {
  data() {
    return {
      filterBaseSearch:"searchPanel",
      tableLoading:false,//tableloading 表格loading状态
      reduceheight:140,//默认需要 减去的高度
      selectTabelList:null,//table选中项
      reqBase: {//请求的base参数
        currentPage: 1,
        length: 15,
      },
      areaValue:[],//区域value
      getPageTotal: 0,//页面数据总数量
      getadvancedSearchModal:false,//searchpanel 状态
      tableDataList:[],//填充的数据
      tagSearchList:[],//过滤数据
    }
  },
  components: {
    packageTable
  },
  computed:{
    getAreaDataTree() {
      return this.$store.state.areaManage.areaListDataTree;
    },
  },
  methods: {

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
      debugger
      this.tagSearchList.splice(0,this.tagSearchList.length);
      this.areaValue=[];
      //重置筛选条件
      this.reqBase={
        currentPage: 1,
        length: 15,
      };
      this.init();
    },
    /**
     * 关闭单个筛选
     * @param name
     */
    closeTagSearch(name){
      debugger
      for(let i in this.tagSearchList){
        let list=this.tagSearchList[i];
        debugger
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
    /**
     * 清空tag search
     */
    // clearTagSearch(){
    //   this.tagSearchList.splice(0,this.tagSearchList.length);
    //   this.areaValue=[];
    //   this.init();
    // },
    // closeTagSearch(name){
    //   for(let i in this.tagSearchList){
    //     let list=this.tagSearchList[i];
    //     if(name==list.name){
    //       this.tagSearchList.splice(i,1);
    //       this.areaValue=[];
    //       this.init();
    //     }
    //   }
    // },
    //选择所选项
    getSelectList(section) {
      this.selectTabelList = section;
    },
    //页码change
    pageonChange(index) {
      this.reqBase.currentPage=index;
      this.init();
    },
    /**
     * 点击search
     */
    showSearchPanel() {
      this.$refs[this.filterBaseSearch].init();
    },
    /**
     * search 时请求参数的拼装
     * @param params
     */
    onSearch(params){
      //重置当前页为1
      this.reqBase.currentPage=1;
      Object.assign(this.reqBase,params);
      //重置当前的page
      this.$refs.contentBaseRef.initcurrentPage();
      this.init();
    }
  }
}
