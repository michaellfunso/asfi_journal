// const quill = new Quill("#quilleditor", {
//   modules: {
//     toolbar: [
//       ["bold", "italic"],
//       ["link", "blockquote", "code-block", "image"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ header: [1, 2, false] }],
//       [{ color: [] }], // add color picker
//       ["clean"],
//     ],
//   },
//   theme: "snow",
// });

// export { quill };
// //   form.addEventListener('formdata', (event) => {
// //     // Append Quill content before submitting
// //     event.formData.append('article_content', JSON.stringify(quill.getContents().ops));
// //     console.log(event.formData)
// //   });





var Inline = Quill.import("blots/inline");

class UppercaseBlot extends Inline {
  static create() {
    let node = super.create();
    node.style.textTransform = "uppercase";
    return node;
  }

  static formats() {
    return true;
  }
}

UppercaseBlot.blotName = "uppercase";
UppercaseBlot.tagName = "span";
UppercaseBlot.className = "ql-uppercase";

Quill.register(UppercaseBlot);

var smallline = Quill.import("blots/inline");

class LowercaseBlot extends smallline {
  static create() {
    let node = super.create();
    node.style.textTransform = "lowercase";
    return node;
  }

  static formats() {
    return true;
  }
}

LowercaseBlot.blotName = "lowercase";
LowercaseBlot.tagName = "span";
LowercaseBlot.className = "ql-lowercase";

Quill.register(LowercaseBlot);

const quill = new Quill("#quilleditor", {
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      ["link", "blockquote", "code-block", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, false] }],
      [{ align: [] }],
      [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
      [{ color: [] }, , { background: [] }], // add color picker
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // Custom dropdown
      ["clean"],
      // ["table"], // Table embedding (with a plugin)
      // Custom button for uppercase
      [{ uppercase: "uppercase" }],
      [{ lowercase: "lowercase" }],
    ],
    table: true,
    handlers: {
      uppercase: function () {
        let range = quill.getSelection();
        if (range) {
          let format = quill.getFormat(range);
          if (format.uppercase) {
            quill.format("uppercase", false);
          } else {
            quill.format("uppercase", true);
          }
        }
      },
    },
  },
  theme: "snow",
});

export { quill };
//   form.addEventListener('formdata', (event) => {
//     // Append Quill content before submitting
//     event.formData.append('article_content', JSON.stringify(quill.getContents().ops));
//     console.log(event.formData)
//   });