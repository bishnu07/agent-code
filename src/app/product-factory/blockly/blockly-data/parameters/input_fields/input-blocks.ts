import * as Blockly from "blockly/core";
import { BlocklyInterface } from "../../blockly-interface";

export const inputFieldsBlockDefinitions: BlocklyInterface[] = [
  {
    blockType: "ANN_CONTRACT",
    jsonInit: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_label",
            name: "number_value",
            text: "ANN",
          },
        ],
        output: "String",
        colour: "#333f56",
        tooltip: "This block has a fixed value: 'ANN'",
      });
    },
  },

  {
    blockType: "contract_number_value",
    jsonInit: function () {
      const initialValue = "PAM";

      // Create a read-only text input field
      const field = new Blockly.FieldLabel(initialValue);

      this.appendDummyInput().appendField(field, "number_value");

      this.setOutput(true, "String");
      this.setColour("#333f56");
      this.setTooltip('This block has a fixed value: "PAM"');
    },
  },
  {
    blockType: "input_field_value",
    jsonInit: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_input",
            name: "String_Value",
            value: "",
          },
        ],
        colour: "#333f56",
        tooltip: "Enter value",
        output: "String",
      });
    },
  },
  {
    blockType: "input_field_text",
    jsonInit: function () {
      this.jsonInit({
        message0: " “ %1 ” ",
        args0: [
          {
            type: "field_input",
            name: "String_Value",
            value: "",
          },
        ],
        colour: "#333f56",
        tooltip: "Enter value",
        output: "String",
      });
    },
  },
];
