$("#login").click(function () {
  var email = $("#email").val();
  let password = $("#inputPassword").val();

  if (email === "info@decentcare.com.au" && password === "DecentCare2020") {
    window.open("./management.html");
  } else if (
    email === "baljeet@decentcare.com.au" &&
    password === "BaljeetTL2022"
  ) {
    window.open("./directSupports.html");
  } else if (
    email === "priyanka@decentcare.com.au" &&
    password === "PriyankaSC2022"
  ) {
    window.open("./supportCoordination.html");
  } else if (
    email === "julia@decentcare.com.au" &&
    password === "JuliaSC2022"
  ) {
    window.open("./supportCoordination.html");
  } else if (
    email === "kristine@decentcare.com.au" &&
    password === "KristineSC2022"
  ) {
    window.open("./supportCoordination.html");
  } else if (email === "adel@decentcare.com.au" && password === "AdelPG2022") {
    window.open("./directSupports.html");
  } else if (email === "liz@decentcare.com.au" && password === "LizPG2022") {
    window.open("./directSupports.html");
  } else if (email === "sela@decentcare.com.au" && password === "SelaPG2022") {
    window.open("./directSupports.html");
  } else if (
    email === "arsen@decentcare.com.au" &&
    password === "ArsenPM2022"
  ) {
    window.open("./management.html");
  } else if (email === "qias@decentcare.com.au" && password === "QaisSC2022") {
    window.open("./supportCoordination.html");
  } else if (
    email === "juanita@decentcare.com.au" &&
    password === "JuanitaSC2022"
  ) {
    window.open("./supportCoordination.html");
  } else if (
    email === "baljeet@decentcare.com.au" &&
    password === "BaljeetPG2022"
  ) {
    window.open("./management.html");
  } else {
    $(".error").css("display", "block");
  }
});
