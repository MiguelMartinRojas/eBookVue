
<template>
  <div>
    <div class="editor-container">
      <!-- https://github.com/ajaxorg/ace -->
      <editor v-model="inputContentJavacript" @init="initJavascriptEditor" lang="javascript"></editor>
      <editor v-model="inputContentHtml" @init="initHtmlEditor" lang="html"></editor>
      <editor v-model="inputContentCss" @init="initCssEditor" lang="css"></editor>
    </div>
    <div class="output">
      <span>Salida:</span>
      <iframe ref="iframe" style="border:none; width:100%" v-on:load="onLoadIframe"></iframe>
      <div id="error" class="error"></div>
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
.error {
  font-weight: bold;
  color: red;
}
.editor-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ace_editor {
  margin-bottom: 10px;
  border-top: 1px double grey;
  border-bottom: 1px double grey;
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
      result: ""
    };
  },
  props: ["contentJavacript", "contentHtml", "contentCss"],
  computed: {
    inputContentJavacript: {
      get() {
        return this.contentJavacript;
      },
      set(val) {
        this.$emit("contentJavacript", val);
      }
    },
    inputContentHtml: {
      get() {
        return this.contentHtml;
      },
      set(val) {
        this.$emit("inputContentHtml", val);
      }
    },
    inputContentCss: {
      get() {
        return this.contentCss;
      },
      set(val) {
        this.$emit("inputContentCss", val);
      }
    }
  },
  components: {
    editor: require("vue2-ace-editor")
  },
  methods: {
    initJavascriptEditor(editor) {
      this.myEditorJavascript = editor;
      this.initEditors(this.myEditorJavascript, "javascript");
    },
    initHtmlEditor(editor) {
      this.myEditorHtml = editor;
      this.initEditors(this.myEditorHtml, "html");
    },
    initCssEditor(editor) {
      this.myEditorCss = editor;
      this.initEditors(this.myEditorCss, "css");
    },
    initEditors(editor, language) {
      require("brace/ext/language_tools");
      if (language === "html") {
        require("brace/mode/html");
      } else if (language === "javascript") {
        require("brace/mode/javascript"); //language
      } else {
        require("brace/mode/css");
      }

      require("brace/mode/less");
      require("brace/theme/chrome");
      editor.setOptions({
        //fontFamily: "tahoma",
        fontSize: "12pt",
        maxLines: Infinity
      });
    },
    onLoadIframe() {},
    executeCode() {
      this.overrideConsoleOutput(this.$refs.iframe.contentWindow);
      this.overrideConsoleOutput(window);
      var javacriptType = 'type="text/javascript"';
      var cssType = 'type="text/css"';
      let javascriptCode = this.myEditorJavascript.getValue();
      let htmlCode = this.myEditorHtml.getValue();
      let cssCode = this.myEditorCss.getValue();
      var doc = this.$refs.iframe.contentWindow.document;
      this.result = "";
      doc.open();
      doc.write(`<style ${cssType}>` + cssCode + "<" + "/style>");
      doc.write(htmlCode);
      doc.write(
        `<script ${javacriptType}>` + javascriptCode + "<" + "/script>"
      );
      doc.close();
    },
    overrideConsoleOutput(myWindow) {
      // eslint-disable-next-line no-console
      const originalConsoleError = myWindow.console.error;
      // eslint-disable-next-line no-console
      myWindow.error = function(...args) {
        const myDiv = document.querySelector("#error");
        // eslint-disable-next-line no-debugger
        debugger;
        if (myDiv) {
          myDiv.textContent += args.join(" ");
          myDiv.innerHTML += "<br>";
        }
        // call original method
        return originalConsoleError.apply(this, args);
      };
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
