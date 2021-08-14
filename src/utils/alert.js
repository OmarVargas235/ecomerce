import Swal from 'sweetalert2';

export const alert = (iconError, messages=[]) => {

	const Toast = Swal.mixin({
		toast: true,
		position: 'top',
		showConfirmButton: false,
		timer: 3000,
		customClass: {
			container: 'my-swal'
		}
	})

	Toast.fire({
		icon: iconError,
		title: messages.map(message => message),
	});
}