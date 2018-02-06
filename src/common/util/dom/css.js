export function getOffset(node) {
	const box = node.getBoundingClientRect()
	const docElem = document.documentElement
	// < ie8 不支持 win.pageXOffset, 则使用 docElem.scrollLeft
	return {
		left:
			box.left +
			(window.pageXOffset || docElem.scrollLeft) -
			(docElem.clientLeft || document.body.clientLeft || 0),
		top:
			box.top +
			(window.pageYOffset || docElem.scrollTop) -
			(docElem.clientTop || document.body.clientTop || 0),
		width: box.width,
		height: box.height,
	}
}
