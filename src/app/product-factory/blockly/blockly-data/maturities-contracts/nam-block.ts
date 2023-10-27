import { BlocklyInterface } from "../blockly-interface";

export const namBlockDefinitions:BlocklyInterface[] = [
  {
    blockType: "NAM_ATTRIBUTES",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "contractType %1 contractRole %2 contractID %3 currency %4 nominalInterestRate %5 dayCountConvention %6 initialExchangeDate %7  notionalPrincipal %8 nextPrincipalRedemptionPayment %9 rateSpread %10 marketObjectCodeOfRateReset %11",
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
            check: "Number", // Allowing either Number or String inputs
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
            name: "notionalPrincipal",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "nextPrincipalRedemptionPayment",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "rateSpread",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "input_value",
            name: "marketObjectCodeOfRateReset",
            check: "String", // Allowing either Number or String inputs
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#99725a",
        tooltip: "Create PAM contract",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },
  {
    blockType: "nam_businessDayConvention",
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
        colour: "#cc9878",
        tooltip: "businessDayConvention",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "nam_endOfMonthConvention",
    jsonInit: function () {
      this.jsonInit({
        message0: "businessDayConvention %1",
        args0: [
          {
            type: "input_value",
            name: "endOfMonthConvention",
            check: "String",
          },
        ],
        colour: "#cc9878",
        tooltip: "endOfMonthConvention",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "nam_cycleAnchorDateOfPrincipalRedemption",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "cycleAnchorDateOfPrincipalRedemption %1 cycleOfPrincipalRedemption %2",
        args0: [
          {
            type: "input_value",
            name: "cycleAnchorDateOfPrincipalRedemption",
            check: "String",
          },
          {
            type: "input_value",
            name: "cycleOfPrincipalRedemption",
            check: "String",
          },
        ],
        colour: "#cc9878",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
];
