var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

var linvoice = Number(localStorage.getItem("invoiceNumber"));
linvoice++;
$("#invoice-number").val(linvoice);

var name = "";
var address = "";
var abn = "";
var phone = "";
var email = "";
var bsb = "";
var account = "";

$("#date").text(today);
var lName = localStorage.getItem("name");
name = $("#name").val(lName);

var laddress = localStorage.getItem("address");
address = $("#address").val(laddress);

var labn = localStorage.getItem("abn");
abn = $("#abn").val(labn);

var lphone = localStorage.getItem("phone");
phone = $("#phone").val(lphone);

var lemail = localStorage.getItem("email");
email = $("#email").val(lemail);

var lbsb = localStorage.getItem("bsb");
bsb = $("#bsb").val(lbsb);

var laccount = localStorage.getItem("account");
account = $("#accNum").val(laccount);

$("#calculate").click(function () {
  invoiceNumber = Number($("#invoice-number").val());
  localStorage.setItem("invoiceNumber", invoiceNumber);

  name = $("#name").val();
  localStorage.setItem("name", name);
  address = $("#address").val();
  localStorage.setItem("address", address);
  abn = $("#abn").val();
  localStorage.setItem("abn", abn);
  phone = $("#phone").val();
  localStorage.setItem("phone", phone);
  email = $("#email").val();
  localStorage.setItem("email", email);
  bsb = $("#bsb").val();
  localStorage.setItem("bsb", bsb);
  account = $("#accNum").val();
  localStorage.setItem("account", account);
  var weekStart = $("#weekStart").val();
  var weekEnd = $("#weekEnd").val();

  function calcTotal() {
    var hour1 = Number($("#hours1").val());
    var price1 = Number($("#price1").val());
    var total1 = hour1 * price1;
    $("#total1").text(total1);

    var hour2 = Number($("#hours2").val());
    var price2 = Number($("#price2").val());
    var total2 = hour2 * price2;
    $("#total2").text(total2);

    var hour3 = Number($("#hours3").val());
    var price3 = Number($("#price3").val());
    var total3 = hour3 * price3;
    $("#total3").text(total3);

    var hour4 = Number($("#hours4").val());
    var price4 = Number($("#price4").val());
    var total4 = hour4 * price4;
    $("#total4").text(total4);

    var hour5 = Number($("#hours5").val());
    var price5 = Number($("#price5").val());
    var total5 = hour5 * price5;
    $("#total5").text(total5);

    var addExp1 = Number($("#expense1").val());
    var addExp2 = Number($("#expense2").val());
    var addExp3 = Number($("#expense3").val());
    var addExp4 = Number($("#expense4").val());
    var addExp5 = Number($("#expense5").val());
    var addExp6 = Number($("#expense6").val());

    var totalExp = addExp1 + addExp2 + addExp3 + addExp4 + addExp5 + addExp6;

    var sum = total1 + total2 + total3 + total4 + total5 + totalExp;

    return sum;
  }

  if (
    name === "" ||
    address === "" ||
    abn === "" ||
    phone === "" ||
    email === "" ||
    bsb === "" ||
    account === "" ||
    weekStart === "" ||
    weekEnd === ""
  ) {
    alert("Please provide all the information");
  } else {
    let checkBox = document.getElementById("gst");
    if (checkBox.checked == true) {
      let subtotal = calcTotal();
      let gst = subtotal * 0.1;
      let total = gst + subtotal;
      $("#sum").text(subtotal);
      $("#gst-calculated").text(gst);
      $("#gst-total").text(total);
    } else {
      let subtotal = calcTotal();
      $("#sum").text(subtotal);
    }
  }
});

function checkGST() {
  let checkBox = document.getElementById("gst");

  if (checkBox.checked == true) {
    $(".total").hide();
    $(".subtotal").show();
    $("#gst-calculated").show();
    $(".gst-calculated").show();
    $(".gst-total").show();
    $("#gst-total").show();

    let subtotal = calcTotal();

    $("#gst-total").text(total);
  } else {
    $(".total").show();
    $(".subtotal").hide();
    $("#gst-calculated").hide();
    $(".gst-calculated").hide();
    $(".gst-total").hide();
    $("#gst-total").hide();
  }
}

$("#print").click(function () {
  window.print();
});
