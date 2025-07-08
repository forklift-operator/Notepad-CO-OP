import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef, useState } from 'react';
import Image from './editorjsPlugins/Image';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 

function App() {
  const editorRef = useRef(null);
  const [editorReady, setEditorReady] = useState(false);
  const [editor, setEditor] = useState<EditorJS | null>(null)
  let newEditor: EditorJS;
  
  useEffect(() => {
    if(!editorRef.current) return;
    if(editorReady) return;

    newEditor = new EditorJS({
      holder: editorRef.current,
      placeholder: 'Type text',
      autofocus: true,
      tools:{
        header: Header,
        list: List,
        image: {
          class: Image,
          inlineToolbar: true,
        },
      },
      data: {
          "time": 1751961169720,
          "blocks": [
              {
                  "id": "I76-75oKcb",
                  "type": "image",
                  "data": {
                      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyo3qMCq0G7QMiIGlcsJaAPNWHmFmcguFA3yYT1bzX_l-qnRQXxPxnFO1kgdkrqM2bkA&usqp=CAU",
                      "caption": ""
                  }
              }
          ],
          "version": "2.31.0-rc.7"
      }
    });

    setEditor(newEditor);

    setEditorReady(true);

    return () => {
      newEditor.destroy()
    }
    
  }, [])

  const handleSave = async () => {
    if(!editor) return;

    try {
      const data = await editor.save();
      console.log(data);
      
    } catch (e) {
      console.log((e as Error).message);
      
    }
  }
  

  
  return (
    <div className='flex flex-col items-center h-screen w-sreen relative'>
      
      <div className='w-full md:w-[70%] flex flex-row items-center justify-center p-4 bg-white/30 backdrop-blur-sm border-2 border-solid border-white/30 rounded-2xl shadow-xl absolute z-100 top-4 left-1/2 -translate-x-1/2'>
        <h1 className='text-3xl font-bold'>Notepad Co-Op</h1>
      </div>

      <div className="overflow-y-auto w-full h-full flex flex-col items-center py-25 overflow-y-auto hide-scrollbar">

        <div className="w-[70%] h-fit bg-[#f8f8d5] [--color:rgba(12,12,12,0.085)] 
          [background-image:linear-gradient(0deg,transparent_24%,var(--color)_25%,var(--color)_26%,transparent_27%,transparent_74%,var(--color)_75%,var(--color)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,var(--color)_25%,var(--color)_26%,transparent_27%,transparent_74%,var(--color)_75%,var(--color)_76%,transparent_77%,transparent)] 
          [background-size:55px_55px] p-4 rounded-lg shadow-xl">
          <div ref={editorRef} className="bg-transparent min-h-[550px]"></div>
        </div>

      </div>

      <div className="w-[40%] p-4 bg-white/30 backdrop-blur-sm border-2 border-solid border-white/30 rounded-2xl shadow-xl absolute bottom-4 left-1/2 -translate-x-1/2 z-100">
        <h1>Active users:</h1>
        <button onClick={handleSave}>Save</button>
      </div>



    </div>
  )
}

export default App
