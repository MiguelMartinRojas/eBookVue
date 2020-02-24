
<template>
  <div>
    <div class="editor-container">
      <!-- https://github.com/ajaxorg/ace -->
      <!-- https://github.com/c9/core/blob/master/plugins/node_modules/ace_tree/lib/ace_tree/edit.js -->
      <!-- https://meta.stackoverflow.com/questions/269753/feedback-requested-runnable-code-snippets-in-questions-and-answers -->
      <editor
        v-model="contentJavacript"
        @init="initJavascriptEditor"
        lang="javascript"
        theme="chrome"
        height="300"
      ></editor>
      <editor v-model="contentHtml" @init="initHtmlEditor" lang="html" theme="chrome" height="100"></editor>
      <editor v-model="contentCss" @init="initCssEditor" lang="css" theme="chrome" height="100"></editor>
    </div>
    <div class="output">
      <h2>Salida:</h2>
      <iframe ref="iframe" style="border:none; width:100%" v-on:load="onLoadIframe"></iframe>
      <div class="error">{{result}}</div>
    </div>
  </div>
</template>

<style scoped>
.output {
  width: 100%;
  background-color: lightgoldenrodyellow;
  text-align: left;
  padding: 6px;
}
.error{
  font-weight: bold;
  color: red
}
.editor-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ace_editor {
  margin-bottom:10px;
}
</style>>


<script lang="ts">
import { eventHub } from "@/components/eventHub";
export default {
  data() {
    return {
      myEditorJavascript: null,
      myEditorHtml: null,
      myEditorCss: null,
      contentJavacript: `
//Javascript
var a = 1;
document.getElementById('ej1').textContent = a;
`,
      contentHtml: 
`
<!-- Html -->
<!DOCTYPE html>
<div id=ej1 class="estilo1"></div>

`,
      contentCss: 
`
/*Css*/
.estilo1{
    font-weight: bold;
}
`,
      result: ""
    };
  },
  components: {
    editor: require("vue2-ace-editor")
  },
  methods: {
    initJavascriptEditor(editor) {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/javascript"); //language
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
      editor.setOptions({
        //fontFamily: "tahoma",
        fontSize: "14pt"
      });
      this.myEditorJavascript = editor;
    },
    initHtmlEditor(editor) {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/less");
      require("brace/theme/chrome");
      editor.setOptions({
        //fontFamily: "tahoma",
        fontSize: "14pt"
      });
      this.myEditorHtml = editor;
    },
    initCssEditor(editor) {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/css");
      require("brace/mode/less");
      require("brace/theme/chrome");
      editor.setOptions({
        //fontFamily: "tahoma",
        fontSize: "14pt"
      });
      this.myEditorCss = editor;
    },
    onLoadIframe() {},
    executeCode() {
      var javacriptType = 'type="text/javascript"';
      var cssType = 'type="text/css"'
      let javascriptCode = this.myEditorJavascript.getValue();
      let htmlCode = this.myEditorHtml.getValue();
      let cssCode = this.myEditorCss.getValue();
      var doc = this.$refs.iframe.contentWindow.document;
      this.result = '';
      doc.open();
      doc.write(
        `<style ${cssType}>` + cssCode + "<" + "/style>"
      );
      doc.write(htmlCode);
      doc.write(
        `<script ${javacriptType}>` + javascriptCode + "<" + "/script>"
      );
      doc.close();
      try {
        this.$refs.iframe.contentWindow.eval(javascriptCode);
      } catch (e) {
          this.result = e.message.toString();
      }
    }
  },
  created() {
    eventHub.$on("execute-code-1", this.executeCode);
  },
  beforeDestroy() {
    eventHub.$off("execute-code-1", this.executeCode);
  }
};
</script>
