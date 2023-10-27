import { BlocklyInterface } from "../blockly-interface";

export const annBlockDefinitions: BlocklyInterface[] = [
  {
    blockType: "ANN_ATTRIBUTES",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "contractType %1 contractRole %2 contractID %3 currency %4 nominalInterestRate %5 dayCountConvention %6 initialExchangeDate %7  notionalPrincipal %8",
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
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "#ef985a",
        tooltip: "Create ANN contract",
        // output: "Array", // Output type is an array (list)
        inputsInline: false,
      });
    },
  },

  // {
  //   blockType: "ann_do_statement",
  //   jsonInit: function () {
  //     this.jsonInit({
  //       message0: "%1 %2",
  //       args0: [
  //         {
  //           type: "field_label",
  //           name: "number_value",
  //           text: "ANN",
  //         },
  //         {
  //           type: "input_statement",
  //           name: "ann_statement",
  //           align: "BOTTOM",
  //         },
  //       ],
  //       output: "String",
  //       colour: 230,
  //       tooltip: "This block has a fixed value: 'ANN'",
  //     });
  //   },
  // },
  {
    blockType: "cycleAnchorDateOfPrincipalRedemption",
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
        colour: "#f0a26a",
        tooltip:
          "Set cycleAnchorDateOfPrincipalRedemption & cycleOfPrincipalRedemption value",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "cycleAnchorDateOfInterestCalculationBase",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "cycleAnchorDateOfInterestCalculationBase %1 cycleOfInterestCalculationBase %2 interestCalculationBase %3 interestCalculationBaseAmount %4",
        args0: [
          {
            type: "input_value",
            name: "cycleAnchorDateOfInterestCalculationBase",
            check: "String",
          },
          {
            type: "input_value",
            name: "cycleOfInterestCalculationBase",
            check: "String",
          },
          {
            type: "input_value",
            name: "interestCalculationBase",
            check: "String",
          },
          {
            type: "input_value",
            name: "interestCalculationBaseAmount",
            check: "String",
          },
        ],
        colour: "#f0a26a",
        tooltip:
          "Set cycleAnchorDateOfInterestCalculationBase & cycleOfInterestCalculationBase value",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "ann_optional_feeRate",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "feeRate %1 cycleAnchorDateOfFee %2 cycleOfFee %3 feeBasis %4 feeAccrued %5",
        args0: [
          {
            type: "input_value",
            name: "feeRate",
            check: "String",
          },
          {
            type: "input_value",
            name: "cycleAnchorDateOfFee",
            check: "String",
          },
          {
            type: "input_value",
            name: "cycleOfFee",
            check: "String",
          },
          {
            type: "input_value",
            name: "feeBasis",
            check: "String",
          },
          {
            type: "input_value",
            name: "feeAccrued",
            check: "String",
          },
        ],
        colour: "#f0a26a",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "ann_optional_scalingEffect",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "scalingEffect %1 marketObjectCodeOfScalingIndex %2 scalingIndexAtContractDealDate %3 notionalScalingMultiplier %4 interestScalingMultiplier %5 cycleAnchorDateOfScalingIndex %6 cycleOfScalingIndex %7",
        args0: [
          {
            type: "input_value",
            name: "scalingEffect",
            check: "String",
          },
          {
            type: "input_value",
            name: "marketObjectCodeOfScalingIndex",
            check: "String",
          },
          {
            type: "input_value",
            name: "scalingIndexAtContractDealDate",
            check: "String",
          },
          {
            type: "input_value",
            name: "notionalScalingMultiplier",
            check: "String",
          },
          {
            type: "input_value",
            name: "interestScalingMultiplier",
            check: "String",
          },
          {
            type: "input_value",
            name: "cycleAnchorDateOfScalingIndex",
            check: "String",
          },
          {
            type: "input_value",
            name: "cycleOfScalingIndex",
            check: "String",
          },
        ],
        colour: "#f0a26a",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "ann_optional_prepaymentEffect",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "prepaymentEffect %1 optionExerciseEndDate %2 cycleAnchorDateOfOptionality %3 cycleOfOptionality %4 penaltyType %5 penaltyRate %6 prepaymentPeriod %7",
        args0: [
          {
            type: "input_value",
            name: "prepaymentEffect",
            check: "String",
          },
          {
            type: "input_value",
            name: "optionExerciseEndDate",
            check: "String",
          },
          {
            type: "input_value",
            name: "cycleAnchorDateOfOptionality",
            check: "String",
          },
          {
            type: "input_value",
            name: "cycleOfOptionality",
            check: "String",
          },
          {
            type: "input_value",
            name: "penaltyType",
            check: "String",
          },
          {
            type: "input_value",
            name: "penaltyRate",
            check: "String",
          },
          {
            type: "input_value",
            name: "prepaymentPeriod",
            check: "String",
          },
        ],
        colour: "#f0a26a",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "ann_optional_cycleAnchorDateOfRateReset",
    jsonInit: function () {
      this.jsonInit({
        message0:
          "cycleAnchorDateOfRateReset %1 cycleOfRateReset %2 rateSpread %3 marketObjectCodeOfRateReset %4 lifeCap %5 lifeFloor %6 periodCap %7 periodFloor %8 nextResetRate %9 rateMultiplier %10",
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
          {
            type: "input_value",
            name: "rateSpread",
            check: "String",
          },
          {
            type: "input_value",
            name: "marketObjectCodeOfRateReset",
            check: "String",
          },
          {
            type: "input_value",
            name: "lifeCap",
            check: "String",
          },
          {
            type: "input_value",
            name: "lifeFloor",
            check: "String",
          },
          {
            type: "input_value",
            name: "periodCap",
            check: "String",
          },
          {
            type: "input_value",
            name: "fixingPeriod",
            check: "String",
          },
          {
            type: "input_value",
            name: "nextResetRate",
            check: "String",
          },
          {
            type: "input_value",
            name: "rateMultiplier",
            check: "String",
          },
        ],
        colour: "#f0a26a",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "ann_optional_creditLineAmount",
    jsonInit: function () {
      this.jsonInit({
        message0: "creditLineAmount %1",
        args0: [
          {
            type: "input_value",
            name: "creditLineAmount",
            check: "String",
          },
        ],
        colour: "#f0a26a",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "ann_optional_accruedInterest",
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
        colour: "#f0a26a",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
  {
    blockType: "ann_optional_nextPrincipalRedemptionPayment",
    jsonInit: function () {
      this.jsonInit({
        message0: "nextPrincipalRedemptionPayment %1",
        args0: [
          {
            type: "input_value",
            name: "nextPrincipalRedemptionPayment",
            check: "String",
          },
        ],
        colour: "#f0a26a",
        tooltip: "",
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
      });
    },
  },
];
