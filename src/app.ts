import { VideoComponent } from "./components/page/item/video.js";
import { ToDoComponent } from "./components/page/item/todo.js";
import { NoteComponent } from "./components/page/item/note.js";
import { ImageComponent } from "./components/page/item/image.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";
import { Component } from "./components/component.js";
class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "http://picsum.photos/600/300"
    );
    this.page.addChild(image);

    const video = new VideoComponent(
      "Video Title",
      "https://youtu.be/tzIzcr4EM6w"
    );
    this.page.addChild(video);

    const note = new NoteComponent("Note Title", "Note Body");
    this.page.addChild(note);

    const todo = new ToDoComponent("Todo Title", "Todo Item");
    this.page.addChild(todo);
  }
}

new App(document.querySelector(".document")! as HTMLElement);
