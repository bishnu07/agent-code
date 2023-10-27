import { BlocklyInterface } from "../blockly-interface";

export const swapsBlockDefinitions: BlocklyInterface[] = [
  {
    blockType: "swaps_contract_structure",
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
        colour: "#B98685",
        tooltip: "Create contract structure",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "swap_contracts_input",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "contractType %1 contractRole %2 contractID %3 currency %4 contractDealDate %5 statusDate %6 creatorID %7 counterpartyID %8",
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
            name: "contractDealDate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "statusDate",
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
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#3e7454",
        tooltip: "Create ANN contract",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "swaps_optional1_contractPerformance",
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
        colour: "#B98685",
        tooltip: "Create contract structure",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "swaps_optional2_terminationDate",
    jsonInit: function () {
      this.jsonInit({
        message0: "terminationDate %1 priceAtTerminationDate %2",
        args0: [
          {
            type: "input_value",
            name: "terminationDate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "priceAtTerminationDate",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#B98685",
        tooltip: "",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "swaps_optional3_purchaseDate",
    jsonInit: function () {
      this.jsonInit({
        message0: "purchaseDate %1 priceAtPurchaseDate %2",
        args0: [
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
        colour: "#B98685",
        tooltip: "",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "swaps_optional4_marketValueObserved",
    jsonInit: function () {
      this.jsonInit({
        message0: "marketValueObserved %1",
        args0: [
          {
            type: "input_value",
            name: "marketValueObserved",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#B98685",
        tooltip: "",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "swaps_optional5_settlementCurrency",
    jsonInit: function () {
      this.jsonInit({
        message0: "settlementCurrency %1",
        args0: [
          {
            type: "input_value",
            name: "settlementCurrency",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#B98685",
        tooltip: "",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "swaps_optional6_marketObjectCode",
    jsonInit: function () {
      this.jsonInit({
        message0: "marketObjectCode %1",
        args0: [
          {
            type: "input_value",
            name: "marketObjectCode",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#B98685",
        tooltip: "",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
];
