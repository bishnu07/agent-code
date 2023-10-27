import { BlocklyInterface } from "../blockly-interface";

export const umpBlockDefinitions: BlocklyInterface[] = [
  {
    blockType: "UMP_ATTRIBUTES",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "contractType %1 statusDate %2 contractRole %3 creatorID %4 contractID %5 counterpartyID %6 nominalInterestRate %7 dayCountConvention %8 currency %9 notionalPrincipal %10",
        args0: [
          {
            type: "input_value",
            name: "contractType",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "statusDate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "contractRole",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "creatorID",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "contractID",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "counterpartyID",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "nominalInterestRate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "dayCountConvention",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "currency",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "notionalPrincipal",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#ffbf54",
        tooltip: "Create PAM contract",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "ump_accruedInterest",
    jsonInit: function () {
      this.jsonInit({
        message0: "accruedInterest %1",
        args0: [
          {
            type: "input_value",
            name: "accruedInterest",
            check: "String",
          },
        ],
        colour: "#ffc565",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "ump_settlementCurrency",
    jsonInit: function () {
      this.jsonInit({
        message0: "settlementCurrency %1",
        args0: [
          {
            type: "input_value",
            name: "settlementCurrency",
            check: "String",
          },
        ],
        colour: "#ffc565",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "ump_cycleAnchorDateOfInterestPayment",
    jsonInit: function () {
      this.jsonInit({
        message0: "cycleAnchorDateOfInterestPayment %1",
        args0: [
          {
            type: "input_value",
            name: "cycleAnchorDateOfInterestPayment",
            check: "String",
          },
        ],
        colour: "#ffc565",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "ump_cycleOfInterestPayment",
    jsonInit: function () {
      this.jsonInit({
        message0: "cycleOfInterestPayment %1",
        args0: [
          {
            type: "input_value",
            name: "cycleOfInterestPayment",
            check: "String",
          },
        ],
        colour: "#ffc565",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
];
