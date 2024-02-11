document.addEventListener("DOMContentLoaded", function () {
  const sha256 = require("js-sha256");

  function User() {
    this.jsonFilePath = "password.json";
    this.correctPasswords = [];

    this.loadPasswordsFromJson = async () => {
      try {
        const response = await fetch(this.jsonFilePath);
        if (response.ok) {
          const passwords = await response.json();
          this.correctPasswords = passwords;
        }
      } catch (error) {
        console.error("Error loading passwords from JSON:", error);
      }
    };

    this.loadPasswordsFromJson();
  }

  User.prototype.passwordVerification = function (password) {
    return new Promise((resolve, reject) => {
      if (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
      ) {
        const hashedPassword = sha256(password);

        this.correctPasswords.push(hashedPassword);
        this.savePasswordsToJson().then(() => {
          resolve("Contraseña Válida. Guardada correctamente.");
        });
      } else {
        reject("La contraseña no cumple con los requisitos necesarios.");
      }
    });
  };

  User.prototype.savePasswordsToJson = async function () {
    try {
      const jsonContent = JSON.stringify(this.correctPasswords);
      await fetch("http://localhost:3000/passwords", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonContent,
      });
    } catch (error) {
      console.error("Error saving passwords to JSON:", error);
    }
  };

  User.prototype.searchPassword = function (password) {
    const hashedPassword = sha256(password);

    return this.correctPasswords.includes(hashedPassword);
  };

  let user = new User();

  function passwordVerification() {
    let passwordInput = document.getElementById("passwordInput");
    let resultContainer = document.getElementById("resultContainer");

    let password = passwordInput.value;

    user
      .passwordVerification(password)
      .then((message) => {
        resultContainer.innerHTML = message;
      })
      .catch((error) => {
        resultContainer.innerHTML = error;
      });
  }

  let buttonVerification = document.getElementById("buttonVerification");
  buttonVerification.addEventListener("click", passwordVerification);
});
