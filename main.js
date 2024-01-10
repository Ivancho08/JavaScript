function User() {
  this.correctPasswords = [];
}

User.prototype.passwordVerification = function (password) {
  if (password.length >= 8) {
    if (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      alert("La contraseña ingresada es una contraseña válida");
      this.correctPasswords.push(password);
      return true;
    } else {
      alert(
        "La contraseña debe tener una mayúsucula, una minúscula y un número por lo menos"
      );
      return false;
    }
  } else {
    alert("La contraseña no contiene los carácteres suficientes");
    return false;
  }
};

User.prototype.searchPassword = function (password) {
  return this.correctPasswords.includes(password);
};

let user = new User();

let password;
let check = false;

do {
  password = prompt("Ingrese una contraseña para validar: ");
  check = user.passwordVerification(password);
} while (!password || !check);

console.log(user.correctPasswords); //Este punto solo lo utilizo para ver si se guardo correctamente la contraseña

let searchPassword = prompt("Ingrese una contraseña a buscar: ");
let found = user.searchPassword(searchPassword);

if (found) {
  alert("La contraseña fue encontrada.");
} else {
  alert("La contraseña no existe.");
}
