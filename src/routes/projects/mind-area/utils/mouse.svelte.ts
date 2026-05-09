export const getMousePosition = () => {
	let x = $state(0);
	let y = $state(0);

	const updateMousePosition = (event) => {
		x = event.clientX;
		y = event.clientY;
	};

	$effect(() => {
		window.addEventListener('mousemove', updateMousePosition);

		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
		};
	});

	return {
		get x() {
			return x;
		},
		get y() {
			return y;
		}
	};
};
