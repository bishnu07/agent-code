import * as Blockly from "blockly/core";
import { BlocklyInterface } from "../../blockly-interface";

export const listBlockDefinitions: BlocklyInterface[] = [
  {
    blockType: "enum_contractRole",
    jsonInit: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "String_Value",
            options: [
              ["RPA", "RPA"],
              ["RPL", "RPL"],
              ["LG", "LG"],
              ["ST", "ST"],
              ["RFL", "RFL"],
              ["PFL", "PFL"],
              ["BUY", "BUY"],
              ["SEL", "SEL"],
              ["COL", "COL"],
              ["CNO", "CNO"],
              ["GUA", "GUA"],
              ["OBL", "OBL"],
            ],
          },
        ],
        colour: "#333f56",
        tooltip: "",
        output: "String",
      });
    },
  },
  {
    blockType: "enum_businessDayConvention",
    jsonInit: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "String_Value",
            options: [
              ["NOS", "NOS"],
              ["SCF", "SCF"],
              ["SCMF", "SCMF"],
              ["CSF", "CSF"],
              ["CSMF", "CSMF"],
              ["SCP", "SCP"],
              ["SCMP", "SCMP"],
              ["CSP", "CSP"],
              ["CSMP", "CSMP"],
            ],
          },
        ],
        colour: "#333f56",
        tooltip: "",
        output: "String",
      });
    },
  },
  {
    blockType: "enum_dayCountConvention",
    jsonInit: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "String_Value",
            options: [
              ["AA", "AA"],
              ["A360", "A360"],
              ["A365", "A365"],
              ["30E360ISDA", "30E360ISDA"],
              ["30E360", "30E360"],
              ["28E336", "28E336"],
            ],
          },
        ],
        colour: "#333f56",
        tooltip: "",
        output: "String",
      });
    },
  },
  {
    blockType: "enum_endOfMonthConvention",
    jsonInit: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "String_Value",
            options: [
              ["EOM", "EOM"],
              ["SD", "SD"],
            ],
          },
        ],
        colour: "#333f56",
        tooltip: "",
        output: "String",
      });
    },
  },
  {
    blockType: "enum_contractType",
    jsonInit: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "String_Value",
            options: [
              ["PAM", "PAM"],
              ["ANN", "ANN"],
              ["NAM", "NAM"],
              ["LAM", "LAM"],
              ["LAX", "LAX"],
              ["CLM", "CLM"],
              ["UMP", "UMP"],
              ["CSH", "CSH"],
              ["STK", "STK"],
              ["COM", "COM"],
              ["SWAPS", "SWAPS"],
              ["SWPPV", "SWPPV"],
              ["FXOUT", "FXOUT"],
              ["CAPFL", "CAPFL"],
              ["FUTUR", "FUTUR"],
              ["OPTNS", "OPTNS"],
              ["CEG", "CEG"],
              ["CEC", "CEC"],
            ],
          },
        ],
        colour: "#333f56",
        tooltip: "",
        output: "String",
      });
    },
  },

  {
    blockType: "enum_contractPerformance",
    jsonInit: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "String_Value",
            options: [
              ["PF", "PF"],
              ["DL", "DL"],
              ["DQ", "DQ"],
              ["DF", "DF"],
            ],
          },
        ],
        colour: "#333f56",
        tooltip: "",
        output: "String",
      });
    },
  },
  {
    blockType: "enum_currency",
    jsonInit: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "String_Value",
            options: [
              ["USD", "USD"],
              ["CAD", "CAD"],
              ["EUR", "EUR"],
              ["CHF", "CHF"],
              ["GBP", "GBP"],
              ["ILS", "ILS"],
              ["AED", "AED"],
              ["ZAR", "ZAR"],
              ["INR", "INR"],
              ["CNY", "CNY"],
              ["JPY", "JPY"],
            ],
          },
        ],
        colour: "#333f56",
        tooltip: "",
        output: "String",
      });
    },
  },
  {
    blockType: "list_cycle_of_period",
    jsonInit: function () {
      this.jsonInit({
        message0: "P %1 %2",
        args0: [
          {
            type: "input_value",
            name: "calendar",
            check: "String", // Allowing either Number or String inputs
          },
          {
            type: "field_dropdown",
            name: "String_Value",
            options: [
              ["D", "D"],
              ["M", "M"],
              ["Q", "Q"],
              ["H", "H"],
              ["Y", "Y"],
            ],
          },
        ],
        message1: "%1",
        args1: [
          {
            type: "field_dropdown",
            name: "String_Value",
            options: [
              ["L0", "L0"],
              ["L1", "L1"],
            ],
          },
        ],
        colour: "#B98685",
        tooltip: "",
        output: "String",
        inputsInline: true,
      });
    },
  },
];
