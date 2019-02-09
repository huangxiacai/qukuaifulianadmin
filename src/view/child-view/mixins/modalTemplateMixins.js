/***render form 基本mixins**/
export const modalTemplateMixins={
  data(){
    return {
      showModalStatus:false,//动感绑定的modal v-modal
    }
  },
  methods:{
    /**
     * 显示与隐藏modal
     * @returns {Promise<any>}
     */
    showModal(b){
      this.showModalStatus=b;
    }
  }
};
