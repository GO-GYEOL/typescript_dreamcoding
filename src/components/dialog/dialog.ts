import { Composable } from "./../page/page.js";
import { BaseComponent, Component } from "./../component.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;
  constructor() {
    super(`<section class="dialog">
                    <div class="dialog__container">
                        <button class="close">&times;</button>
                        <div id="dialog__body"></div>
                        <button class="dialog__submit">ADD</button>
                    </div>
                </section>`);
    const closeBtn = this.element.querySelector(".close")! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    const submitBtn = this.element.querySelector(
      ".dialog__submit"
    )! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
    // 항상 이벤트는 내부적으로 처리하는 것이 아니라, 리스너를 주입받아서 등록된 리스너가 있다면 그것을 호출하는 방식으로 해야한다.
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
  addChild(child: Component) {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }
}
