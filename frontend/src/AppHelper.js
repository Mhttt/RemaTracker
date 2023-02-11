const anchor = document.getElementsByClassName('homer');

export function calculateEyes(event) {
  document.addEventListener('mousemove', (e) => {
    const rekt = anchor[0].getBoundingClientRect();
    const anchorX = rekt.left + rekt.width / 2;
    const anchorY = rekt.top + rekt.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

    const eyes = document.querySelectorAll('.eye');
    eyes.forEach((eye) => {
      eye.style.transform = `rotate(${90 + angleDeg}deg)`;
    });
  });
}

function angle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI;
  return deg;
}

export function inDiscountCatalogue(labelArr) {
	if (!labelArr === undefined && labelArr.includes('avisvare')) {
		return true;
	} else {
		return false;
	}
}
