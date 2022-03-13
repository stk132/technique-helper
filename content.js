function makeBeatportLink(artistName, kataban) {
	const beatportLink = document.createElement("a");
	beatportLink.href = "https://www.beatport.com/search?q=" + encodeURI(artistName + " " + kataban);
	beatportLink.text = "beatportで検索";
	return beatportLink;
};

function makeBandcampLink(kataban) {
	const bandcampLink = document.createElement("a");
	bandcampLink.href = "https://bandcamp.com/search?q=" + encodeURI(kataban);
	bandcampLink.text = "bandcampで検索";
	return bandcampLink;
}

function makeExternalSearchLinks(artistName, kataban) {
	const externalLinks = document.createElement("p");
	const beatportLink = makeBeatportLink(artistName, kataban);
	const bandcampLink = makeBandcampLink(kataban);
	externalLinks.appendChild(beatportLink);
	externalLinks.appendChild(bandcampLink);
	externalLinks.style = "padding-left:10px; font-size:11px; font-weight:400;";
	return externalLinks;
};

function makeExternalSearchPNode(aTag) {
	const pNode = document.createElement("p");
	pNode.className = "detail_data_left";
	pNode.appendChild(aTag);
	return pNode;
};

function makeExternalSearchPNodeBeatport(artistName, kataban) {
	const beatportLink = makeBeatportLink(artistName, kataban);
	return makeExternalSearchPNode(beatportLink);
};

function makeExternalSearchPNodeBandcamp(kataban) {
	const bandcampLink = makeBandcampLink(kataban);
	return makeExternalSearchPNode(bandcampLink);
}

function itemListHelper() {
	const itemList = document.getElementsByClassName("item_navi_shouhin_kaisetsu_txt01");
	Array.prototype.forEach.call(itemList, (element) => {
		const artistNode = element.getElementsByTagName("a").item(0);
		const labelBlock = element.getElementsByClassName("item-list-title-label").item(0);
		const labelBlockAtags = labelBlock.getElementsByTagName("a");
		const katabanNode = labelBlockAtags.item(0);
		const labelNode = labelBlockAtags.item(1);
		const externalLinks = makeExternalSearchLinks(artistNode.text, katabanNode.text);
		element.parentNode.appendChild(externalLinks);
	});
};

function itemDetailHelper() {
	const artistNode = document.getElementsByClassName("detail_title01").item(0);
	const katabanNode = document.getElementsByClassName("detail_title02").item(0);
	const detailTextNode = document.getElementsByClassName("detail_txt_wrap").item(0);
	const beatportPNode = makeExternalSearchPNodeBeatport(artistNode.innerText, katabanNode.innerText);
	const bandcampPNode = makeExternalSearchPNodeBandcamp(katabanNode.innerText);
	detailTextNode.appendChild(beatportPNode);
	detailTextNode.appendChild(bandcampPNode);
};


const currentURL = location.href;
if (currentURL.startsWith("https://www.technique.co.jp/item/")) {
	itemDetailHelper();
} else if (currentURL.startsWith("https://www.technique.co.jp/items.html")) {
	itemListHelper();
}
