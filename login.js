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
  } else {
    $(".error").css("display", "block");
  }
});
