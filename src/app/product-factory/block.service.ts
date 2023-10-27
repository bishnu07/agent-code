// blockly.service.ts

import { Injectable } from "@angular/core";
import * as Blockly from "blockly/core";

@Injectable({
  providedIn: "root",
})
export class BlockService {
  initializeWorkspace(blocklyDiv: HTMLElement): Blockly.WorkspaceSvg {
    return Blockly.inject(blocklyDiv, {
      // Configuration options for the workspace
    });
  }

  // Add other methods related to Blockly here...

  applyBlockJsonInit(blockType: string, jsonInit: any) {
    Blockly.Blocks[blockType] = {
      init: jsonInit,
    };
  }
}
