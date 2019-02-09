/***上一步 下一步的modal 的基本数据配置**/
export const packageNextModal={
  data(){
    return {
      hasShowModal:false,//显示模态框状态
      submitLoading:false,
      tabsIsDisabled2:true,//tabpane 是否禁用
      footerBtn:[
        {
          type:'primary',
          method:this.nextStep,
          text:'下一步',
          isDisabled:false,//是否禁用
          loading:true,
          hasShow:true,//是否显示
        },
        {
          type:'primary',
          method:this.lastStep,
          text:'上一步',
          isDisabled:false,//是否禁用
          loading:true,
          hasShow:false,//是否显示
        },
        {
          type:'default',
          method:this.cancel,
          text:'取消',
          isDisabled:false,//是否禁用
          loading:true,
          hasShow:true,//是否显示
        },
        {
          type:'primary',
          method:this.submitMesage,
          text:'提交',
          isDisabled:true,//是否禁用
          loading:true,
          hasShow:true,//是否显示
        },
      ],//底部按钮配置
      currTabsValue:'tabsName1',
      tabsName1:'tabsName1',
      tabsName2:'tabsName2',
      tabsLabel1:'标签一',//tabs 名称
      tabsLabel2:'标签二',
      tabContentRef1:'tabContentRef1',
      tabContentRef2:'tabContentRef2'
    }
  },
  methods:{
    /**
     * 控制模态框显示与否
     * @param b
     */
    showModal(b){
      this.hasShowModal=b;
    },
    /**
     * 取消
     */
    cancel(){
      this.showModal(false);
    },
  }
}
