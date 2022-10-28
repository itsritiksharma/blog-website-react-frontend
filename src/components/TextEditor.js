// import React, { useRef, useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";

// const TextEditor = ({ name }) => {
//   const handleEditorChange = (e) => {
//     e.preventDefault();
//     props.blogContent()
//     console.log(textRef.current.value);
//   };
//   return (
//     <Editor
//       ref={textRef}
//       apiKey="jxp62z3jltvipo2nchrkjb0tc40uaq9d110qyzps4kmqoxpv"
//       init={{
//         height: 500,
//         menubar: false,
//         plugins: [
//           "advlist autolink lists link image",
//           "charmap print preview anchor help",
//           "searchreplace visualblocks code",
//           "insertdatetime media table paste wordcount",
//         ],
//         toolbar: `undo redo | formatselect | bold italic | \
//             alignleft aligncenter alignright | \
//             bullist numlist outdent indent | help`,
//       }}
//       onChange={handleEditorChange}
//     />
//   );
// };

// export default TextEditor;

import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = (props) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      props.onInput(editorRef.current.getContent());
    }
  };
  return (
    <Editor
      apiKey="jxp62z3jltvipo2nchrkjb0tc40uaq9d110qyzps4kmqoxpv"
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | code |" +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onChange={log}
    />
  );
};

export default TextEditor;
