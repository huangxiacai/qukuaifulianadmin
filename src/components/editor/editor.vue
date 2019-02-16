<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { oneOf } from '@/libs/tools'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: 'html',
      validator: (val) => {
        return oneOf(val, ['html', 'text'])
      }
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    editorId () {
      return `editor${this._uid}`
    }
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    }
  },
  mounted () {
    let vm=this;
      vm.editor = new Editor(`#${vm.editorId}`)
      vm.editor.customConfig.onchange = (html) => {
        let text = vm.editor.txt.text()
        if (vm.cache) localStorage.editorCache = html
        vm.$emit('input', vm.valueType === 'html' ? html : text)
        vm.$emit('on-change', html, text)
      }
      vm.editor.customConfig.onchangeTimeout = vm.changeInterval
      // create这个方法一定要在所有配置项之后调用
      vm.editor.create()
      // 如果本地有存储加载本地存储内容
      let html = vm.value || localStorage.editorCache
      if (html) vm.editor.txt.html(html)

  }
}
</script>

<style>

</style>
