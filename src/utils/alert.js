import Swal from 'sweetalert2';

export const alert = (iconError, messages=[], tieme=3000) => {

	const Toast = Swal.mixin({
		toast: true,
		position: 'top',
		showConfirmButton: false,
		timer: tieme,
		customClass: {
			container: 'my-swal'
		}
	})

	Toast.fire({
		icon: iconError,
		title: messages.map(message => message),
	});
}