import * as Blockly from "blockly/core";
import { BlocklyInterface } from "../blockly-interface";

export const pamBlockDefinitions: BlocklyInterface[] = [
  // {
  //   blockType: "pam_do_statement",
  //   jsonInit: function () {
  //     this.jsonInit({
  //       message0: "%1 %2",
  //       args0: [
  //         {
  //           type: "field_label",
  //           name: "number_value",
  //           text: "PAM",
  //         },
  //         {
  //           type: "input_statement",
  //           name: "ann_statement",
  //           align: "BOTTOM",
  //         },
  //       ],
  //       output: "String",
  //       colour: 230,
  //       tooltip: "This block has a fixed value: 'PAM'",
  //     });
  //   },
  // },

  {
    blockType: "Basic contract",
    jsonInit: function () {
      this.jsonInit({
        message0: "Basic Contract %1",
        args0: [
          {
            type: "input_statement",
            name: "STACK",
            align: "BOTTOM",
          },
        ],
        // previousStatement: null,
        // nextStatement: null,
        colour: "#996633",
        tooltip: "Define a custom procedure",
      });
    },
  },
  {
    blockType: "cycleAnchorDateOfInterestPayment",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "cycleAnchorDateOfInterestPayment %1 cycleOfInterestPayment %2",
        args0: [
          {
            type: "input_value",
            name: "cycleAnchorDateOfInterestPayment",
            check: "String",
          },
          {
            type: "input_value",
            name: "cycleOfInterestPayment",
            check: "String",
          },
        ],
        colour: "#e71950",
        tooltip:
          "Enter cycleAnchorDateOfInterestPayment & cycleOfInterestPayment value",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "cycleAnchorDateOfRateReset",
    jsonInit: function () {
      this.jsonInit({
        message0: "cycleAnchorDateOfRateReset %1 cycleOfRateReset %2",
        args0: [
          {
            type: "input_value",
            name: "cycleAnchorDateOfRateReset",
            check: "String",
          },
          {
            type: "input_value",
            name: "cycleOfRateReset",
            check: "String",
          },
        ],
        colour: "#e71950",
        tooltip: "Enter cycleAnchorDateOfRateReset & cycleOfRateReset value",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "businessDayConvention",
    jsonInit: function () {
      this.jsonInit({
        message0: "businessDayConvention %1",
        args0: [
          {
            type: "input_value",
            name: "businessDayConvention",
            check: "String",
          },
        ],
        colour: "#e71950",
        tooltip: "Enter businessDayConvention",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "businessDayConvention",
    jsonInit: function () {
      this.jsonInit({
        message0: "businessDayConvention %1",
        args0: [
          {
            type: "input_value",
            name: "businessDayConvention",
            check: "String",
          },
        ],
        colour: "#e71950",
        tooltip: "Enter businessDayConvention",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "endOfMonthConvention",
    jsonInit: function () {
      this.jsonInit({
        message0: "endOfMonthConvention %1",
        args0: [
          {
            type: "input_value",
            name: "endOfMonthConvention",
            check: "String",
          },
        ],
        colour: "#e71950",
        tooltip: "Enter endOfMonthConvention",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "PAM_ATTRIBUTES",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "contractType %1 contractRole %2 contractID %3 currency %4 nominalInterestRate %5 dayCountConvention %6 initialExchangeDate %7 maturityDate %8 notionalPrincipal %9 creatorID %10 statusDate %11 counterpartyID %12 contractDealDate %13",
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
            name: "nominalInterestRate",
            check: "String", // Allowing either String inputs
          },
          {
            type: "input_value",
            name: "dayCountConvention",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "initialExchangeDate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "maturityDate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "notionalPrincipal",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "creatorID",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "statusDate",
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
        colour: "#e5003d",
        tooltip: "Create PAM contract",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "PAM_ATTRIBUTES_OPTIONAL1",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "contractPerformance %1 seniority %2 nonPerformingDate %3 gracePeriod %4 delinquencyPeriod %5 delinquencyRate %6",
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
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#e71950",
        tooltip: "",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "PAM_ATTRIBUTES_OPTIONAL2",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "feeRate %1 cycleAnchorDateOfFee %2 cycleOfFee %3 feeBasis %4 feeAccrued %5",
        args0: [
          {
            type: "input_value",
            name: "feeRate",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "cycleAnchorDateOfFee",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "cycleOfFee",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "feeBasis",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "feeAccrued",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#e71950",
        tooltip: "",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "PAM_ATTRIBUTES_OPTIONAL3",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "cycleAnchorDateOfInterestPayment %1 cycleOfInterestPayment %2 cyclePointOfInterestPayment %3",
        args0: [
          {
            type: "input_value",
            name: "cycleAnchorDateOfInterestPayment",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "cycleOfInterestPayment",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "cyclePointOfInterestPayment",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#e71950",
        tooltip: "",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
];
