import { BaseComponent, Component } from "./../component.js";

export interface Composable {
  addChild(child: Component): void;
}

// 타입 정의해줌
type OnCloseListener = () => void;

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private closeListener? : OnCloseListener
  // 외부로부터 전달받을 콜백함수를 저장하고 있을 변수를 만들었다.
  constructor() {
    super(`<li class="page-item">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                  <button class="close">&times;</button>
                </div>
              </li>
  `);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      // this.element.remove() 해도 되지만, (실제로 지금은 이 방법이 맞음)
      // 모든 pageItemComponent 들은 PageItem 내부에 존재하고 있다. 데이터는 직접 자신이 삭제하기 보다는, 전체적으로 관리 하고 있는 대상에서 위임하는것이 더 안전한 코딩 방법이다. 
      // 그래서 존재하는 모든 페이지 아이템들에 대해 관리해야하는 경우, 페이지 아이템이 삭제가 되는 장소인 페이지가 삭제 로직을 가지고 처리해주는 것이 좋다고 함.
      this.closeListener && this.closeListener();
    }
  }
  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener : OnCloseListener){
    this.closeListener = listener;
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super('<ul class="page">asd</ul>');
  }
  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(()=> {
      item.removeFrom(this.element);
    })
  }
}
