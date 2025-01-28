import Swal from "sweetalert2";
import "animate.css";

export function swalFireResult(title, text, icon) {
    return Swal.fire({
        toast: true,
        position: "top-right",
        title: title,
        text: text,
        icon: icon,
        showConfirmButton: false,
        customClass: {
            popup: "rounded-lg",
        },
        showClass: {
            popup: `
      animate__animated
      animate__fadeInRight
      animate__faster
    `,
        },
        hideClass: {
            popup: `
      animate__animated
      animate__fadeOutRight
      animate__faster
    `,
        },
        timer: 2000,
        buttonsStyling: false,
    });
}

export function swalFireConfirm(title, text, icon) {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        cancelButtonText: "Tidak",
        confirmButtonText: "Ya",
        customClass: {
            cancelButton:
                "bg-blue-600 text-white rounded-lg p-3 hover:brightness-75 transition-all ease-linear w-1/4",
            confirmButton:
                "bg-gray-200 text-blue-600 rounded-lg p-3 hover:brightness-75 transition-all ease-linear w-1/4",
            actions: "flex flex-row gap-12 justify-center w-full",
            popup: "rounded-lg",
        },
        showClass: {
            popup: `
      animate__animated
      animate__fadeIn
      animate__faster
    `,
        },
        hideClass: {
            popup: `
      animate__animated
      animate__fadeOut
      animate__faster
    `,
        },
        buttonsStyling: false,
    });
}
