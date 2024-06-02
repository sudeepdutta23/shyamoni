import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import * as Editor from '../../ckeditor5/build/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
})
export class TextEditorComponent implements OnInit {
  @Output() editorData = new EventEmitter<any>();
  @Input() initialData = '';

  @ViewChild('myckeditor') ckeditor: any;
  public Editor : any = Editor;
  public config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'imageUpload',
        'blockQuote',
        'mediaEmbed',
        'undo',
        'redo',
        'CKFinder',
        'alignment',
        'fontBackgroundColor',
        'fontColor',
        'fontSize',
        'fontFamily',
        'highlight',
        'horizontalLine',
        'imageInsert',
        'specialCharacters',
        'strikethrough',
        'subscript',
        'superscript',
        'underline',
      ],
    },
    language: 'en',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:full',
        'imageStyle:side',
        'linkImage',
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties',
      ],
    },
    // simpleUpload: {
    //   // The URL that the images are uploaded to.
    //   uploadUrl: `${environment.baseURI}saveBlogImage`,
    // },
    uiColor: '#7AC170',
    autoGrow_maxHeight: 1000,
    height: '70vh',
    mediaEmbed: {
      previewsInData: true,
    },
  };

  constructor() {}

  ngOnInit(): void {}

  sendEditorData = ({ editor }: ChangeEvent) => {
    const data = editor.getData();
    this.editorData.emit(data);
  }
}
