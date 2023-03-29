display();

calculate("one");
calculate("two");
calculate("three");
calculate("four");
calculate("five");
calculate("six");
calculate("seven");
calculate("eight");
calculate("nine");
calculate("ten");

// $("#totalCalculation").click(function () {
//
// });

var budgetPerMonth = 0;
var budgetPerWeek = 0;

function display() {
  let planDurationInMonth = 0;
  let budget = 0;
  $("#duration").on("input", function () {
    planDurationInMonth = Number($("#duration").val());
    console.log(planDurationInMonth);
  });

  $("#budget").on("input", function () {
    budget = Number($("#budget").val());
    budgetPerMonth = budget / planDurationInMonth;
    $("#month").text("Monthly Budget");
    $("#permonth").text("$" + budgetPerMonth.toFixed(1));
    budgetPerWeek = budgetPerMonth / 4;
    $("#week").text("Weekly Budget");
    $("#perweek").text("$" + budgetPerWeek.toFixed(1));
  });
}

let elementsShown = 0;

$("#two").hide();
$("#three").hide();
$("#four").hide();
$("#five").hide();
$("#six").hide();
$("#seven").hide();
$("#eight").hide();
$("#nine").hide();
$("#ten").hide();
function show() {
  elementsShown++;

  if (elementsShown == 1) {
    $("#two").show();
  }
  if (elementsShown == 2) {
    $("#three").show();
  }
  if (elementsShown == 3) {
    $("#four").show();
  }
  if (elementsShown == 4) {
    $("#five").show();
  }
  if (elementsShown == 5) {
    $("#six").show();
  }
  if (elementsShown == 6) {
    $("#seven").show();
  }
  if (elementsShown == 7) {
    $("#eight").show();
  }
  if (elementsShown == 8) {
    $("#nine").show();
  }
  if (elementsShown == 9) {
    $("#ten").show();
  }
}

var adding = 0;
function calculate(number) {
  let price;
  let totalPrice;
  $("#service" + number).click(function () {
    let code = serviceCode($("#service" + number).val());
    price = servicePrice($("#service" + number).val());
    $("#code" + number).text(code);
    $("#price" + number).text("$" + price);
  });

  $("#q" + number).on("input", function () {
    let qty = Number($("#q" + number).val());
    totalPrice = qty * price;
    $("#total" + number).text(totalPrice.toFixed(2));
    adding += totalPrice;
    console.log(adding);
  });
}

function totalCalculation() {
  var s1 = Number($("#totalone").text());
  var s2 = Number($("#totaltwo").text());
  var s3 = Number($("#totalthree").text());
  var s4 = Number($("#totalfour").text());
  var s5 = Number($("#totalfive").text());
  var s6 = Number($("#totalsix").text());
  var s7 = Number($("#totalseven").text());
  var s8 = Number($("#totaleight").text());
  var s9 = Number($("#totalnine").text());
  var s10 = Number($("#totalten").text());

  var totalSum = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9 + s10;
  $("#totalWeek").text("Forecasted p/w").css("color", "#3E54AC");
  $("#totalWeekPrice").text(totalSum.toFixed(2));
  var totalPerMonth = totalSum * 4;
  $("#totalMonth").text("Forecasted p/m").css("color", "#3E54AC");
  $("#totalMonthPrice").text(totalPerMonth.toFixed(2));

  var diff = budgetPerMonth - totalPerMonth;

  if (diff < 0) {
    $("#deficit").text("Over Budget p/m").css("color", "#EA5455");
    $("#calcDeficit").text(diff.toFixed(2)).css("color", "#EA5455");
  } else {
    $("#deficit").text("Under Budget p/m").css("color", "#245953");
    $("#calcDeficit").text(diff.toFixed(2)).css("color", "#245953");
  }
}

function servicePrice(serviceType) {
  switch (serviceType) {
    case "acweekdays":
      return 62.17;
      break;
    case "acsaturday":
      return 87.51;
      break;
    case "acsunday":
      return 112.85;
      break;
    case "acevening":
      return 68.5;
      break;
    case "acpublicholiday":
      return 138.2;
      break;
    case "asweekdays":
      return 62.17;
      break;
    case "assaturday":
      return 87.51;
      break;
    case "assunday":
      return 112.85;
      break;
    case "aspublicholiday":
      return 138.2;
      break;
    case "asnighttime":
      return 262.16;
      break;
    case "ga":
      return 20.68;
      break;
    case "cleaning":
      return 51.81;
      break;
    case "improvedliving":
      return 70.87;
      break;
    case "supportCoordinationLevel2":
      return 100.14;
      break;
    case "psysocialRecoveryCoaching":
      return 93.34;
      break;
    case "occupationalTherpay":
      return 193.99;
      break;
    case "Physiotherapist":
      return 193.99;
      break;
    case "exercisePhysiologist":
      return 166.99;
      break;
    case "psychologist":
      return 214.41;
      break;
    default:
      return "00";
  }
}

function serviceCode(serviceType) {
  switch (serviceType) {
    case "acweekdays":
      return "04_104_0125_6_1";
      break;
    case "acsaturday":
      return "04_105_0125_6_1";
      break;
    case "acsunday":
      return "04_106_0125_6_1";
      break;
    case "acevening":
      return "04_103_0125_6_1";
      break;
    case "acpublicholiday":
      return "04_102_0125_6_1";
      break;
    case "asweekdays":
      return "01_011_0107_1_1";
      break;
    case "assaturday":
      return "01_013_0107_1_1";
      break;
    case "assunday":
      return "01_014_0107_1_1";
      break;
    case "aspublicholiday":
      return "01_012_0107_1_1";
      break;
    case "asnighttime":
      return "01_010_0107_1_1";
      break;
    case "ga":
      return "04_180_0136_6_1";
      break;
    case "cleaning":
      return "01_020_0120_1_1";
      break;
    case "improvedliving":
      return "09_009_0117_6_3";
      break;
    case "supportCoordinationLevel2":
      return "07_002_0106_8_3";
      break;
    case "psysocialRecoveryCoaching":
      return "07_101_0106_6_3";
      break;
    case "occupationalTherpay":
      return "15_617_0128_1_3";
      break;
    case "Physiotherapist":
      return "15_055_0128_1_3";
      break;
    case "exercisePhysiologist":
      return "15_200_0126_1_3";
      break;
    case "psychologist":
      return "15_054_0128_1_3";
      break;
    default:
      return "00_000_0000_0_0";
  }
}
