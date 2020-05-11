import React, { useCallback } from 'react'
import AceEditor from 'react-ace'
import styled from 'styled-components'
import { debounce } from 'lodash'

import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/theme-monokai'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/ext-emmet'
import 'ace-builds/src-min-noconflict/ext-beautify'
import 'ace-builds/src-min-noconflict/ext-spellcheck'
import 'ace-builds/src-min-noconflict/ext-settings_menu'
import 'ace-builds/src-min-noconflict/ext-error_marker'
import 'ace-builds/src-min-noconflict/ext-static_highlight'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/snippets/javascript'

const StyledAceEditor = styled(AceEditor)`
  width: 100% !important;
  height: 470px !important;
`

const Editor = ({ readOnly, saveFile, onChange, value }) => {
  const saveFileHandler = useCallback(
    debounce(() => {
      if (saveFile) saveFile()
      console.log('saved !')
    }, 500),
    [],
  )

  const onChangeHandler = useCallback((newValue) => {
    if(onChange) onChange(newValue)
  }, [])

  return (
    <StyledAceEditor
      placeholder="Coding Here !!!"
      mode="javascript"
      theme="monokai"
      name="editor"
      onChange={onChangeHandler}
      fontSize={18}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      commands={[
        {
          name: 'Save File', //name for the key binding.
          bindKey: { win: 'Ctrl-s', mac: 'Command-s' }, //key combination used for the command.
          exec: saveFileHandler, //function to execute when keys are pressed.
        },
      ]}
      value={value}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      readOnly={readOnly}
    />
  )
}

export default Editor
