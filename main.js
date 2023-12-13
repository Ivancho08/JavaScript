const passwordVerification = () => {
  if (password.length >= 8) {
    if (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      alert("La contraseña ingresada es una contraseña válida");
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

let password;
let check = false;

do {
  password = prompt("Ingrese una contraseña para validar: ");
  check = passwordVerification(password);
} while (!password || !check);
