/***render form 基本mixins**/
export const renderFormMixins={
  data(){
    return {
      refName:'refName',
    }
  },
  methods:{
    /**
     * 表单校验
     * @returns {Promise<any>}
     */
    checkForm(){
      return new Promise(((resolve, reject) => {
        this.$refs[this.refName].validate((valid) => {
          resolve(valid)
        })
      }))
    }
  }
};
