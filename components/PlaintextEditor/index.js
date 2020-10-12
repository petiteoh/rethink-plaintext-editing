import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './style.css';

function PlaintextEditor({ file, write }) {
  // console.log(file, write);

  const [fileText, setFileText] = useState("");

  function saveFile(e) {
    e.preventDefault();
    const savedFile = new File(
      [fileText], file.name, {
      type: file.type,
      lastModified: new Date(),
      }
    );

    write(savedFile);
  };

  function changeFile(e) {
    setFileText(e.target.value)
  };

  useEffect(() => {
    (async () => {
      setFileText(await file.text());
    })();
  }, [file]);

  let fileReader = new FileReader();
  fileReader.readAsText(file);
  let fileContents = fileReader.result;

  return (
    <div className={css.editor}>
      <form >
        <textarea id="editarea" value={fileText} onChange={changeFile}>

        </textarea>
        <button onClick={saveFile}>save</button>
      </form>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
