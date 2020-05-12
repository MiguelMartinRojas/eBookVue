
<template>
  <div>
    <div class="editor-container">
      <!-- https://github.com/ajaxorg/ace -->
      <editor v-model="inputContentJavacript" @init="initJavascriptEditor" lang="javascript"></editor>
      <editor v-model="inputContentHtml" @init="initHtmlEditor" lang="html"></editor>
      <editor v-model="inputContentCss" @init="initCssEditor" lang="css"></editor>
    </div>
    <div class="output">
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
      result: "",
      myTask: null
    };
  },
  props: { task: {}, solution: {}, id: Number, edition: Boolean },
  watch: {
    task: function(newVal, oldVal) {
      this.myTask = newVal;
    }
  },
  computed: {
    inputContentJavacript: {
      get() {
        return this.inputTask.contentJavascript;
      },
      set(val) {
        this.inputTask.contentJavascript = val;
      }
    },
    inputContentHtml: {
      get() {
        return this.inputTask.contentHtml;
      },
      set(val) {
        this.inputTask.contentHtml = val;
      }
    },
    inputContentCss: {
      get() {
        return this.inputTask.contentCss;
      },
      set(val) {
        this.inputTask.contentCss = val;
      }
    },
    inputTask: {
      get() {
        return this.myTask;
      },
      set(val) {
        this.myTask = val;
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
        require("brace/mode/javascript");
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
      doc.write(`<h3> Salida:</h3><div>` + htmlCode + `<div>`);

      var solutionJavascript = "";
      if (this.solution) {
        solutionJavascript =
          `<script ${javacriptType}>` +
          this.solution.contentJavascript +
          "<" +
          "/script>";
      }
      doc.write(
        `<script ${javacriptType}>` +
          javascriptCode +
          "<" +
          "/script>" +
          solutionJavascript
      );
      doc.close();
      this.setScore();
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
    },
    setScore() {
      if (!this.edition) {
        var doc = this.$refs.iframe.contentWindow.document;
        var score = doc.getElementById("score");
        score.setAttribute("style", "position:absolute;bottom:0;right:0");
        this.insertOrReplaceTask();
        eventHub.$emit("unlock-building", {
          score: parseInt(score.innerText),
          area: "green",
          title: this.inputTask.title
        });
        
      }
    },
    insertOrReplaceTask() {
      var game = JSON.parse(localStorage.getItem("game"));
      var index = game.findIndex(
        element => element.title == this.inputTask.title
      );
      if (index !== -1) {
        game[index] = this.inputTask;
      } else {
        game.push(this.inputTask);
      }
      localStorage.setItem("game", JSON.stringify(game));
    },
    initializeGame() {
      var game = JSON.parse(localStorage.getItem("game"));
      if (game.find(element => element.title == this.inputTask.title)) {
        this.inputTask = game.find(
          element => element.title == this.inputTask.title
        );
      }
    }
  },
  created() {
    eventHub.$on("execute-code-" + this.id, this.executeCode);
    if (!this.edition) {
      eventHub.$on("game-changed", this.initializeGame);
    }
    this.inputTask = this.task;
  },
  mounted() {
    if (!this.edition) {
      this.initializeGame();
    }
  },
  beforeDestroy() {
    eventHub.$off("execute-code-" + this.id, this.executeCode);
    if (!this.edition) {
      eventHub.$on("game-changed", this.initializeGame);
    }
  }
};
</script>
