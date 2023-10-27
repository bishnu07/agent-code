import { BlocklyInterface } from "../blockly-interface";

export const stkBlockDefinitions: BlocklyInterface[] = [
  {
    blockType: "STK_ATTRIBUTES",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "contractType %1 contractRole %2 contractID %3 currency %4 purchaseDate %5 priceAtPurchaseDate %6",
        args0: [
          {
            type: "input_value",
            name: "contractType",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "contractRole",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "contractID",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "currency",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "purchaseDate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "priceAtPurchaseDate",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#4c3b1e",
        tooltip: "",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "stk_terminationDate",
    jsonInit: function () {
      this.jsonInit({
        message0: "terminationDate %1 priceAtTerminationDate %2",
        args0: [
          {
            type: "input_value",
            name: "terminationDate",
            check: "String",
          },
          {
            type: "input_value",
            name: "priceAtTerminationDate",
            check: "String",
          },
        ],
        colour: "#7f6232",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
];
