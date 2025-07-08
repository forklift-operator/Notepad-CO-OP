import type { BlockTool, BlockToolConstructorOptions, BlockToolData } from "@editorjs/editorjs";
import './Image.css'

type ImageData = {
    url?: string,
    caption?: string,
}

export default class Image implements BlockTool {
    data: ImageData;
    wrapper: HTMLElement | undefined;

    static get toolbox() {
        return {
            title: 'Image',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        }
    }

    constructor({ data }: BlockToolConstructorOptions<ImageData>) {
        this.data = data || {};
        this.wrapper = undefined;
    }

    render(): HTMLElement {
        this.wrapper = document.createElement('div')
        const input = document.createElement('input');

        if(this.data && this.data.url) {
            this._createImage(this.data.url, this.data.caption);
            return this.wrapper;
        }
        
        this.wrapper.classList.add('editor-image');
        this.wrapper.appendChild(input);

        input.placeholder = 'Paste image URL here...';
        input.value = this.data && this.data.url ? this.data.url : '';

        input.addEventListener('paste', (event) => {
            this._createImage(event.clipboardData!.getData('text'));
        });


        return this.wrapper;
    }

    _createImage(url: string, captionText?: string) {
        console.log(url);
        const image = document.createElement('img');
        const caption = document.createElement('div');

        image.src = url;
        caption.contentEditable = 'true';
        caption.innerHTML = captionText || '';


        this.wrapper!.innerHTML = '';
        this.wrapper!.appendChild(image);
        this.wrapper!.appendChild(caption);
    }
    
    save(blockContent: HTMLElement) {
        const image = blockContent.querySelector('img'); 
        const caption = blockContent.querySelector('[contenteditable]');

        return {
            url: image?.src,
            caption: caption?.innerHTML || '',
        }
    }

    validate(blockData: BlockToolData): boolean {
        console.log(blockData);
        
        if (!(blockData as ImageData).url?.trim()) {
            return false;
        }
        
        return true;
    }
}