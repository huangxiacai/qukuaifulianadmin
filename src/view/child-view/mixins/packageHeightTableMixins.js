/*********封装packageTable mixins 的基本数据*******/
import packageHeightTable from '../comontents/packageHeightTable'
import {getToken } from '@/libs/util'
export default {
  data() {
    return {
      tableLoading:false,//tableloading 表格loading状态
      reduceheight:140,//默认需要 减去的高度
      selectTabelList:null,//table选中项
      tagSearchList:[],//需要显示 的筛选条件
      reqBase: {//请求的base参数
        access_token:getToken(),
        page: 1,
        page_size: 15,
      },
      getPageTotal: 0,//页面数据总数量
      getadvancedSearchModal:false,//searchpanel 状态
      tableDataList:[],//填充的数据
    }
  },
  components: {
    packageHeightTable
  },
  methods: {
    //清空筛选条件
    clearTagSearch(){
      this.tagSearchList.splice(0,this.tagSearchList.length)
    },
    closeTagSearch(name){
      for(let i in this.tagSearchList){
        debugger
        let list=this.tagSearchList[i];
        if(name==list.name){
          this.tagSearchList.splice(i,1)
        }
      }
    },
    //选择所选项
    getSelectList(section) {
      this.selectTabelList = section;
    },
    //页码change
    pageonChange(index) {
      this.reqBase.page=index;
      this.init();
    },
    /**
     * 点击search
     */
    showSearchParel() {
      this.getadvancedSearchModal=true;
      this.$refs.filterBaseSearch.init();
    },
    /**
     * search 时请求参数的拼装
     * @param params
     */
    onSearch(params){
      //重置当前页为1
      this.reqBase.page=1;
      Object.assign(this.reqBase,params);
      //重置当前的page
      this.$refs.contentBaseRef.initcurrentPage();
      this.init();
    }
  }
}
