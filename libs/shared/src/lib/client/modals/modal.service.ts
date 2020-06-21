import { Injectable } from "@angular/core";
import { DomService } from "../dom.service";

@Injectable()
export class ModalService {
  constructor(private domService: DomService) {}

  private modalElementId = "modal-container";
  private overlayElementId = "overlay";
  private componentConfig: { inputs: any; outputs: any };

  init(component: any, inputs?: object, outputs?: object) {
    this.componentConfig = {
      inputs: inputs,
      outputs: outputs,
    };
    this.domService.appendComponentTo(
      this.modalElementId,
      component,
      this.componentConfig
    );
    document.getElementById(this.modalElementId).className = "show";
    document.getElementById(this.overlayElementId).className = "show";
  }

  getInputs() {
    return this.componentConfig.inputs;
  }

  destroy() {
    this.domService.removeComponent();
    document.getElementById(this.modalElementId).className = "hidden";
    document.getElementById(this.overlayElementId).className = "hidden";
  }
}
