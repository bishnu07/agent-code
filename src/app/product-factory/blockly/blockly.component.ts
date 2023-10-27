import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from "@angular/core";
import { ElementRef, AfterViewInit, NO_ERRORS_SCHEMA } from "@angular/core";

import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/javascript"; // Or the generator of your choice
import { FieldDate } from "@blockly/field-date";

import { pamBlockDefinitions } from "./blockly-data/maturities-contracts/pam-block";
import { BlockService } from "../block.service";
import { annBlockDefinitions } from "./blockly-data/maturities-contracts/ann-block";
import { namBlockDefinitions } from "./blockly-data/maturities-contracts/nam-block";
import { umpBlockDefinitions } from "./blockly-data/non-maturities-contracts/ump-blocks";
import { swapsBlockDefinitions } from "./blockly-data/symmetric/swaps-block";
import { optnsBlockDefinitions } from "./blockly-data/options/optns-block";
import { stkBlockDefinitions } from "./blockly-data/index-based/stk-block";
import { inputFieldsBlockDefinitions } from "./blockly-data/parameters/input_fields/input-blocks";
import { listBlockDefinitions } from "./blockly-data/parameters/lists/list-blocks";
import { DefaultXml } from "./blockly-data/default-template/default-template";
import { HttpClient } from "@angular/common/http";
import { LoginService } from "app/shared/services/login.service";

@Component({
  selector: "app-blockly",
  templateUrl: "./blockly.component.html",
  styleUrls: ["./blockly.component.scss"],
})
export class BlocklyComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  workspace: Blockly.WorkspaceSvg;

  private defaultXml: DefaultXml = new DefaultXml(this.httpClient);

  constructor(
    private el: ElementRef,
    private blocklyService: BlockService,
    private loginService: LoginService,
    private httpClient: HttpClient
  ) {}

  ngAfterViewInit(): void {
    const blocklyDiv = this.el.nativeElement.querySelector("#blocklyDiv");
    // const toolbox = this.el.nativeElement.querySelector("#toolbox-categories");

    // Blockly.Blocks["set_value"] = {
    //   init: function () {
    //     this.jsonInit({
    //       message0: "set %1 to %2",
    //       args0: [
    //         {
    //           type: "field_variable",
    //           name: "VAR",
    //           variable: "item",
    //           variableTypes: [""],
    //         },
    //         {
    //           type: "input_value",
    //           name: "VALUE",
    //         },
    //       ],
    //       previousStatement: null,
    //       nextStatement: null,
    //     });
    //   },
    // };

    // PAM contract blocks

    pamBlockDefinitions.forEach(({ blockType, jsonInit }) => {
      this.blocklyService.applyBlockJsonInit(blockType, jsonInit);
    });

    // NAM contract blocks

    namBlockDefinitions.forEach(({ blockType, jsonInit }) => {
      this.blocklyService.applyBlockJsonInit(blockType, jsonInit);
    });

    // ANN contract blocks

    annBlockDefinitions.forEach(({ blockType, jsonInit }) => {
      this.blocklyService.applyBlockJsonInit(blockType, jsonInit);
    });

    // UMP BLOCKS

    umpBlockDefinitions.forEach(({ blockType, jsonInit }) => {
      this.blocklyService.applyBlockJsonInit(blockType, jsonInit);
    });

    // STK BLOCKS

    stkBlockDefinitions.forEach(({ blockType, jsonInit }) => {
      this.blocklyService.applyBlockJsonInit(blockType, jsonInit);
    });

    // SWAP BLOCKS

    swapsBlockDefinitions.forEach(({ blockType, jsonInit }) => {
      this.blocklyService.applyBlockJsonInit(blockType, jsonInit);
    });

    // OPTNS BLOCKS

    optnsBlockDefinitions.forEach(({ blockType, jsonInit }) => {
      this.blocklyService.applyBlockJsonInit(blockType, jsonInit);
    });

    // INPUT FIELDS BLOCKS

    inputFieldsBlockDefinitions.forEach(({ blockType, jsonInit }) => {
      this.blocklyService.applyBlockJsonInit(blockType, jsonInit);
    });

    // LIST FIELDS BLOCKS

    listBlockDefinitions.forEach(({ blockType, jsonInit }) => {
      this.blocklyService.applyBlockJsonInit(blockType, jsonInit);
    });

    this.workspace = Blockly.inject(blocklyDiv, {
      readOnly: false,
      // media: "media/",
      // trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true,
      },
      grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
      toolbox: document.getElementById("toolbox"),
    } as Blockly.BlocklyOptions);

    Blockly.Blocks["date_picker"] = {
      init: function () {
        this.appendDummyInput().appendField(
          new FieldDate("yyyy-mm-dd"),
          "FIELDNAME"
        );
        this.jsonInit({
          message0: "%1",
          args0: [
            {
              type: "field_dropdown",
              name: "String_Value",
              options: [
                ["T00:00:00", "T00:00:00"],
                ["T23:59:59", "T23:59:59"],
              ],
            },
          ],
          colour: "#333f56",
          tooltip: "Pick a date",
          output: "String",
          inputsInline: true,
        });
      },
    };

    // Returns an arry of XML nodes.
    const coloursFlyoutCallback = function (workspace) {
      // Returns an array of hex colours, e.g. ['#4286f4', '#ef0447']
      var colourList = ["#4286f4", "#ef0447"];
      var blockList = [];
      for (var i = 0; i < colourList.length; i++) {
        var block = document.createElement("block");
        block.setAttribute("type", "colour_picker");
        var field = document.createElement("field");
        field.setAttribute("name", "COLOUR");
        field.innerText = colourList[i];
        block.appendChild(field);
        blockList.push(block);
      }
      return blockList;
    };

    // Associates the function with the string 'COLOUR_PALETTE'
    this.workspace.registerToolboxCategoryCallback(
      "custom_input",
      coloursFlyoutCallback
    );

    const button = this.workspace.registerButtonCallback(
      "myFirstButtonPressed",
      () => {
        const name = prompt("New variable name");
        alert(name);
      }
    );
    // Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, 'panda');

    this.workspace.addChangeListener((block) => {
      if (block["newValue"] === "Load") {
        console.error(block);
        let code = `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="ANN_ATTRIBUTES" id="[~ebs8n!r%gMeG[uG_p" x="-70" y="-10">
          <value name="contractRole">
            <block type="contract_string_value" id="8%is{~Hm1VxsqPwxH,Ig">
              <field name="String_Value">RPL</field>
            </block>
          </value>
          <next>
            <block type="optns1_contract_structure" id="DdUlmrJl{ChPwE9!8NA%">
              <statement name="PAM">
                <block type="option_contracts_input" id="o2td_/XZ$y9jM1XP:yAi">
                  <value name="contractType">
                    <block type="contract_number_value" id="R-Hfd!dI(|R@($nG+[.O"></block>
                  </value>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>`;
        // Blockly.Xml.textToDom(code)
        // Load the XML into the workspace
        Blockly.Xml.domToWorkspace(
          this.parseXMLStringToDOM(code),
          this.workspace
        );
      }
      // if (workspace.getBlocksByType("PAM_ATTRIBUTES", true).length > 0) {
      //   console.log(workspace.getBlocksByType("PAM_ATTRIBUTES", true)[0]);
      //   console.log(
      //     workspace.getBlocksByType("PAM_ATTRIBUTES", true)[0].getChildren(true)
      //   );
      // }
      // if (block["newInputName"] === "contractType") {
      //   const blockId = workspace.getBlockById(block["blockId"]);
      //   if (blockId && blockId.getFieldValue("number_value")) {
      //     let value = blockId.getFieldValue("number_value");

      //     // let value: string = workspace
      //     //   .getBlocksByType("contract_number_value", true)[0]
      //     //   .getFieldValue("number_value");

      //     if (value != "PAM") {
      //       // workspace.getBlocksByType("contract_number_value", true)[0].unplug();
      //       blockId.unplug();
      //     }
      //   }
      // }

      // if (block["newInputName"] === "contractRole") {
      //   // Call your function here.
      //   console.log(block.toJson());

      //   let value: string = workspace
      //     .getBlocksByType("contract_string_value", true)[0]
      //     .getFieldValue("String_Value");

      //   console.log(typeof value, value);
      //   console.log(value.length, "RPA".length);

      //   const val = JSON.stringify(value) == "RPA";

      //   console.log(val);

      //   if (val) {
      //     console.log(value);
      //     // workspace.getBlocksByType("contract_string_value", true)[0].unplug();
      //   }
      // }
    });
  }
  // Function to get the value of a connected block
  getValueOfConnectedBlock(block) {
    console.log(block);
    // Check if the input is connected
    if (block && block.getInput("VALUE").connection.isConnected()) {
      // Get the connected block
      var connectedBlock = block.getInput("VALUE").connection.targetBlock();

      // Check if the connected block exists and has a value
      if (connectedBlock) {
        // Get the value from the connected block
        var value = connectedBlock.getFieldValue("FIELD_NAME"); // Replace 'FIELD_NAME' with the name of your field
        return value;
      }
    }

    // Return null or handle the case where no block is connected
    return null;
  }

  parseXMLStringToDOM(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    return xmlDoc.documentElement;
  }

  blockToJSON(block) {
    let json = {
      type: block.type,
      inputs: {},
    };
    if (block.inputList) {
      json.inputs = {};
      block.inputList.forEach(function (input) {
        if (input.name) {
          json.inputs[input.name] = input.connection.targetBlock()
            ? this.blockToJSON(input.connection.targetBlock())
            : null;
        }
      });
    }
    return json;
  }

  workspaceToJSON(workspace) {
    var json = [];
    var topBlocks = workspace.getTopBlocks(true); // Get all top-level blocks

    topBlocks.forEach(function (block) {
      json.push(this.blockToJSON(block));
    });

    return json;
  }

  xmlToJson(xml) {
    var obj = {};

    if (xml.nodeType == Node.ELEMENT_NODE) {
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == Node.TEXT_NODE) {
      obj = xml.nodeValue.trim();
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        let item = xml.childNodes[i];
        let nodeName = item.nodeName;
        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (!Array.isArray(obj[nodeName])) {
            let old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }

    return obj;
  }

  convertBlocksToJson() {
    const workspace = Blockly.getMainWorkspace();
    var workspaceXml = Blockly.Xml.workspaceToDom(workspace);

    var xmlText = Blockly.Xml.domToPrettyText(workspaceXml);
    // let workspaceXml = window.parent.postMessage(workspace);

    // Convert XML to JSON
    const jsonString = this.xmlToJson(workspaceXml);

    // const json = this.xmlToJson(jsonString);
    console.error(xmlText);
  }

  getDefaultTemplateOfXml(templateName: string) {
    this.workspace.clear();
    if (templateName) {
      this.defaultXml.getDefaultBlocksInXml(templateName).subscribe((res) => {
        Blockly.Xml.domToWorkspace(
          this.parseXMLStringToDOM(res),
          this.workspace
        );
      });
    }
  }
}
