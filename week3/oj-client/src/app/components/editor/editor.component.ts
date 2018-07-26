import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor : any;
  sessionId: string;
  public languages: string[] = ['Java', 'C++', 'Python'];
  language: string = 'Java'; //default
  programLanguages = {'Java': 'java', 'C++' : 'c_cpp', 'Python': 'python' };
  defaultContent = {
    'Java': `public class Solution {
  public static void main(String[] args) {
  //Type your code here

  }
}`,
    'C++': `#include <iostream>
      using namespace std;
      int main() {
          //Type your C++ code here
          return 0;
    }`,
    'Python': `class Solution:
    def example():
    # Write your Python code here`
  }
  constructor(@Inject('collaboration') private collaboration,
                private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params
        .subscribe(params => {
          this.sessionId = params['id']; // bind socket with problem id
          this.initEditor();
        });
  }
  initEditor() {
    this.editor = ace.edit('editor');
    this.editor.setTheme("ace/theme/monokai");
    this.resetEditor();
    this.editor.resize();
    document.getElementsByTagName('textarea')[0].focus();
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null; // avoid duplicate change broadcast

    this.editor.on('change', (e) => { // check if edit change
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e){
        this.collaboration.change(JSON.stringify(e));
      }
    });

    this.editor.getSession().getSelection().on("changeCursor", () => {
      let cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor moves:' + cursor);
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    this.collaboration.restoreBuffer();
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }
  resetEditor(): void {
    console.log(this.programLanguages['Java']);
    this.editor.getSession().setMode('ace/mode/' + this.programLanguages[this.language]);
    this.editor.setValue(this.defaultContent[this.language]);
  }
  submit(): void {
    let user_code = this.editor.getValue();
    console.log(user_code);
  }
}
