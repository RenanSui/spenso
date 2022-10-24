import { reverseFormatDate } from "./formatDate.js";
import { getValuesById } from "./getLocalStorage.js";

// elements
const detailsBody = document.querySelector('#details-Body') as HTMLDivElement;
const detailsTitle = detailsBody.querySelector('#details-Title') as HTMLParagraphElement;
const detailsAmount = detailsBody.querySelector('#details-Amount') as HTMLParagraphElement;
const detailsType = detailsBody.querySelector('#details-Type') as HTMLParagraphElement;
const detailsTag = detailsBody.querySelector('#details-Tag') as HTMLParagraphElement;
const detailsDate = detailsBody.querySelector('#details-Date') as HTMLParagraphElement;
const detailsNote = detailsBody.querySelector('#details-Note') as HTMLParagraphElement;
const detailsCreatedAt = detailsBody.querySelector('#details-CreatedAt') as HTMLParagraphElement;

export const RENDER_Details = (id: number) => {
    const values = getValuesById(id);
	const {
		id: currentId,
		title,
		amountNumber,
		note,
		type,
		tag,
		date,
        createdAt
	} = values[0];

    detailsTitle.innerText = title;
    detailsAmount.innerText = amountNumber;
    detailsType.innerText = type;
    detailsTag.innerText = tag;
    detailsDate.innerText = reverseFormatDate(date);
    detailsNote.innerText = note;
    detailsCreatedAt.innerText = createdAt;
}

