/** @format */

const slide = document.querySelectorAll(".slide");

const slides = document.querySelector(".slides");

const slidesList = document.querySelector(".slides_list");

/* ширина блока slidesList*/
const slidesListWidth = slidesList.offsetWidth;
console.log(slidesListWidth);

/* отслеживание отступа */
let left = 0;

/* получил ширину элемента */
const slideWidth = slide[0].offsetWidth;

/* получение значение gap в масиве */
function getGap(el) {
	const arr = window.getComputedStyle(el)?.gap.split(" ");

	if (arr[0] === "normal") return 0;

	if (arr.length === 2) return parseInt(arr[1]);

	if (arr.length === 1) return parseInt(arr[0]);

	return 0;
}
/* получение gap если есть а иначе 0 */
const gapWidth = getGap(slidesList);

/* минимальная ширина slides */
let slidesWidth = slides.offsetWidth;
console.log(slidesWidth);

/* количество слайдев выведенно */
let setSlides = 0;

/* сколько элементов влазит (не более 3) */
function setWidthSlidesList(el = 2) {
	if (el > 3) {
		el = 3;
	}
	let elment = el * slideWidth;
	let gap = 0;
	if (el > 1) {
		gap = getGap(slidesList) * (el - 1);
	}
	slides.style.width = `${elment + gap}px`;
	setSlides = el;
	slidesWidth = elment + gap;
}
setWidthSlidesList(2);

/* изменение положения слайдов */
function elementShiftLeft(num = 0) {
	slidesList.style.left = `${num}px`;
}
elementShiftLeft();
/* функция для нажатия кнопки prev */
function btnPrevSlides() {
	left += +(slideWidth + gapWidth);
	console.log("prev", left);
	if (left >= 0) {
		console.log("if prev", left);
		left = 0;
		elementShiftLeft(left);
		return;
	}
	elementShiftLeft(left);
}

/* функция для нажатия кнопки next */
function btnNextSlides() {
	left -= slideWidth + gapWidth;
	if (left < -(slidesListWidth - slideWidth * setSlides)) {
		left = -(
			slidesListWidth -
			slideWidth * setSlides -
			gapWidth * (setSlides - 1)
		);
		console.log("if next", left);
		//elementShiftLeft(left);
		return;
	}
	console.log("next", left, slidesListWidth);
	elementShiftLeft(left);
}

document.querySelector(".btn_next").addEventListener("click", btnNextSlides);
document.querySelector(".btn_prev").addEventListener("click", btnPrevSlides);
