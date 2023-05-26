import { h } from "snabbdom";
import { DomEditor } from "@wangeditor/editor";

function editorPlugin(editor) {
  const { isInline, isVoid } = editor;
  const newEditor = editor;

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "attachment") return true;
    return isInline(elem);
  };

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "attachment") return true;
    return isVoid(elem);
  };

  return newEditor;
}

function renderAttachment(elem) {
  // 获取“附件”的数据，参考上文 myResume 数据结构
  const { fileName = "", link = "" } = elem;
  const iconVnode = h(
    // HTML tag
    "img",
    // HTML 属性
    {
      props: {
        src: "https://img0.baidu.com/it/u=726620871,4203188840&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
      }, // HTML 属性，驼峰式写法
      style: { width: "1em", marginRight: "0.1em" /* 其他... */ }, // HTML style ，驼峰式写法
    }
    // img 没有子节点，所以第三个参数不用写
  );
  // 附件元素 vnode
  const attachVnode = h(
    // HTML tag
    "span",
    // HTML 属性、样式、事件
    {
      props: { contentEditable: false }, // HTML 属性，驼峰式写法
      style: { display: "inline-block", marginLeft: "3px" /* 其他... */ }, // style ，驼峰式写法
      on: {
        click() {
          console.log("clicked", link);
        },
      },
    },
    // 子节点
    [iconVnode, fileName]
  );
  return attachVnode;
}

const renderElemConf = {
  type: "attachment", // 新元素 type ，重要！！！
  renderElem: renderAttachment,
};

const module = {
  editorPlugin: editorPlugin,
  renderElems: [renderElemConf],
};

export default module;
