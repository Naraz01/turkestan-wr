import React from "react";
import { Editor } from '@tinymce/tinymce-react';

export const EditorText = ({register, setValue, defaultValue, getValues, name, title}) => {
    return (
      <div className = "objectCreate-editor">
        <p className = "objectCreate-item__title"> { title } </p>
        <Editor
          apiKey = "wb868lo1iyt22vwn9n8104osyyz8q46i53yzflagqveboeyz"
          //onEditorChange = {log}
          //onInit = {(evt, editor) => editorRef.current = editor}
          onEditorChange={(newValue, editor) => {
            setValue(name, newValue)
          }}
          value = {getValues(name)}
          initialValue = {defaultValue}
          {...register(name)}
          init = {{
            height: 300,
            menubar: false,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
       />
       </div>
    )
};