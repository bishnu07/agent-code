import Swal from "sweetalert2";

export function confirmAlertBox(
  title: string,
  text: string,
  confirmButtonText?: string,
  buttonColor?: string
) {
  return Swal.fire({
    title: `<h4 class="swal-msg-font swal-text-font">${title}</h4>`,
    html: `<h5 class="swal-msg-font swal-text-font">${text}</h5>`,
    icon: "success",
    confirmButtonColor: buttonColor,
    confirmButtonText: confirmButtonText ? confirmButtonText : "OK",
  });
}

export function infoAlertBox(
  title: string,
  text: string,
  confirmButtonText?: string,
  buttonColor?: string
) {
  return Swal.fire({
    title: `<h4 class="swal-msg-font swal-text-font">${title}</h4>`,
    html: `<h5 class="swal-msg-font swal-text-font">${text}</h5>`,
    icon: "info",
    confirmButtonColor: buttonColor,
    confirmButtonText: confirmButtonText ? confirmButtonText : "OK",
  });
}

export function errorAlertBox(
  title: string,
  text: string,
  confirmButtonText?: string,
  buttonColor?: string
) {
  return Swal.fire({
    title: `<h4 class="swal-msg-font swal-text-font">${title}</h4>`,
    html: `<h5 class="swal-msg-font swal-text-font">${text}</h5>`,
    icon: "error",
    confirmButtonColor: buttonColor,
    confirmButtonText: confirmButtonText ? confirmButtonText : "OK",
  });
}
