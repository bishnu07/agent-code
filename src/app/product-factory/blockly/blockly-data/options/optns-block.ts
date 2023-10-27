import { BlocklyInterface } from "../blockly-interface";

export const optnsBlockDefinitions: BlocklyInterface[] = [
  {
    blockType: "optns1_contract_structure",
    jsonInit: function () {
      this.jsonInit({
        message0: "Contract structure %1",
        args0: [
          {
            type: "input_statement",
            name: "PAM",
            check: ["String", "Array"], // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#3e7454",
        tooltip: "Create contract structure",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "optns2_contract_structure",
    jsonInit: function () {
      this.jsonInit({
        message0: "Contract structure %1 %2",
        args0: [
          {
            type: "input_statement",
            name: "PAM",
            check: ["String", "Array"], // Allowing either Number or String inputs
          },
          {
            type: "input_statement",
            name: "ANN",
            check: ["String", "Array"], // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#3e7454",
        tooltip: "Create contract structure",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "optns3_contract_structure",
    jsonInit: function () {
      this.jsonInit({
        message0: "Contract structure %1 %2 %3",
        args0: [
          {
            type: "input_statement",
            name: "PAM",
            check: ["String", "Array"], // Allowing either Number or String inputs
          },
          {
            type: "input_statement",
            name: "ANN",
            check: ["String", "Array"], // Allowing either Number or String inputs
          },
          {
            type: "input_statement",
            name: "LAX",
            check: ["String", "Array"], // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#3e7454",
        tooltip: "Create contract structure",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "option_contracts_input",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "contractType %1 contractRole %2 contractID %3 currency %4 maturityDate %5 optionExerciseType %6  optionExerciseEndDate %7 optionStrike1 %8 optionType %9 creatorID %10 counterpartyID %11 contractDealDate %12",
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
            name: "maturityDate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "optionExerciseType",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "optionExerciseEndDate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "optionStrike1",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "optionType",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "creatorID",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "counterpartyID",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "contractDealDate",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#4c392d",
        tooltip: "Create ANN contract",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "optns4_contractPerformance",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "contractPerformance %1 seniority %2 nonPerformingDate %3 gracePeriod %4 delinquencyPeriod %5 delinquencyRate %6 deliverySettlement %7",
        args0: [
          {
            type: "input_value",
            name: "contractPerformance",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "seniority",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "nonPerformingDate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "gracePeriod",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "delinquencyPeriod",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "delinquencyRate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "deliverySettlement",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#3e7454",
        tooltip: "Create contract structure",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "optns5_exerciseDate",
    jsonInit: function () {
      this.jsonInit({
        message0: "exerciseDate %1 exerciseAmount %2",
        args0: [
          {
            type: "input_value",
            name: "exerciseDate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "exerciseAmount",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#3e7454",
        tooltip: "Create contract structure",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "optns6_optionStrike2",
    jsonInit: function () {
      this.jsonInit({
        message0: "optionStrike2 %1",
        args0: [
          {
            type: "input_value",
            name: "optionStrike2",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#3e7454",
        tooltip: "Create contract structure",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
];
