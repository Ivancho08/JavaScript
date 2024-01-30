document.addEventListener("DOMContentLoaded", function () {
  function User() {
    this.correctPasswords =
      JSON.parse(localStorage.getItem("correctPasswords")) || [];
  }

  User.prototype.passwordVerification = function (password) {
    if (password.length >= 8) {
      if (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
      ) {
        this.correctPasswords.push(password);
        localStorage.setItem(
          "correctPasswords",
          JSON.stringify(this.correctPasswords)
        );
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  User.prototype.searchPassword = function (password) {
    return this.correctPasswords.includes(password);
  };

  let user = new User();

  function passwordVerification() {
    let passwordInput = document.getElementById("passwordInput");
    let resultContainer = document.getElementById("resultContainer");

    let password = passwordInput.value;
    let isValid = user.passwordVerification(password);

    if (isValid) {
      resultContainer.innerHTML = "Contraseña Válida. Guardada correctamente.";
    } else {
      resultContainer.innerHTML =
        "La contraseña no cumple con los requisitos necesarios.";
    }
  }

  let buttonVerification = document.getElementById("buttonVerification");
  buttonVerification.addEventListener("click", passwordVerification);
});
