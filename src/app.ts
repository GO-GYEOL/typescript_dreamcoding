import { VideoComponent } from "./components/page/item/video.js";
import { ToDoComponent } from "./components/page/item/todo.js";
import { NoteComponent } from "./components/page/item/note.js";
import { ImageComponent } from "./components/page/item/image.js";
import { Composable, PageComponent } from "./components/page/page.js";
import { Component } from "./components/component.js";
class App {
  // private readonly page: PageComponent;
  private readonly page: Component & Composable;
  // page는 Component 이면서 addChild가 가능한 Composable요소이다.
  // 생성자 안에서 page 컴포넌트를 만들었다. 사실 생성자 내부에서 다른 클래스를 만드는 것은 사실 조금 위험하므로 DI를 이용해 외부로부터 주입을 받는 것이 더 확장성도 좋고 유닛테스트도 편리하다고 한다.
  // 우선은 이렇게 둔다.
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "http://picsum.photos/600/300"
    );
    // image.attachTo(appRoot, "beforeend");
    this.page.addChild(image);
    

    const video = new VideoComponent(
      "Video Title",
      "https://youtu.be/tzIzcr4EM6w"
    );
    // video.attachTo(appRoot, "beforeend");
    this.page.addChild(video);

    const note = new NoteComponent("Note Title", "Note Body");
    this.page.addChild(note);
    // note.attachTo(appRoot, "beforeend");

    const todo = new ToDoComponent("Todo Title", "Todo Item");
    this.page.addChild(todo);
    // todo.attachTo(appRoot, "beforeend");
  }
}

new App(document.querySelector(".document")! as HTMLElement);
