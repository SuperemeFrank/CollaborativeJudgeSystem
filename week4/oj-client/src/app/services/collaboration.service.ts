import { Injectable } from '@angular/core';
import { COLORS } from '../../assets/colors';
declare var io: any;
declare var ace: any;
@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

collaboration_socket: any;

clientsInfo: object = {};
clientNum: number = 0;
  constructor() { }

  init(editor: any, sessionId: string): void { // init the socket link
    this.collaboration_socket = io(window.location.origin, {query: 'sessionId=' + sessionId });

    this.collaboration_socket.on("change", (delta: string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    this.collaboration_socket.on("cursorMove", (cursor) => {
      console.log("cursor move: " + cursor);
      let session = editor.getSession();
      cursor = JSON.parse(cursor);
      let x = cursor['row'];
      let y = cursor['column'];
      let changeClientId = cursor['socketId'];
      console.log(x + ' ' + y + ' ' + changeClientId);

      if (changeClientId in this.clientsInfo) {
        session.removeMarker(this.clientsInfo[changeClientId]['marker']);
      } else {
        this.clientsInfo[changeClientId] = {};
        let css = document.createElement("style"); // random the cursor color
        css.type = "text/css";
        css.innerHTML = ".editor_cursor_" + changeClientId +
              " { position: absolute; background:" + COLORS[this.clientNum] + ";"
              + "z-index: 100;  width: 3px !important;}";

        document.body.appendChild(css);
        this.clientNum++;
      }
      let Range = ace.require('ace/range').Range;
      let newMarker = session.addMarker(new Range(x, y, x, y + 1), 'editor_cursor_'+ changeClientId, true);
      this.clientsInfo[changeClientId]['marker'] = newMarker;
    });
    //Test
    this.collaboration_socket.on("message", (message) => {
      console.log("received: " + message);
    });
  }

  change(delta: string): void {
    this.collaboration_socket.emit("change", delta);
  }

  cursorMove(cursor : string): void {
    this.collaboration_socket.emit("cursorMove", cursor);
  }

  restoreBuffer(): void {
    this.collaboration_socket.emit("restoreBuffer"); // ask for restore
  }
}