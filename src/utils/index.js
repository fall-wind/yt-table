import config from '../components/config'
const { ytTablePerfix } = config

export const triggerTableCellClick = dom => {
	if (dom) {
        dom.click()
        let subSubChild = null
        try {
            subSubChild = dom.childNodes[0].childNodes[0]
        } catch (error) {
            
        }
		if (subSubChild) {
            subSubChild.click()
            if (subSubChild.className.indexOf('select')) {
                subSubChild.click()
                subSubChild.focus()
            }
        }
	}
}

export const getDomIndex = (dom, selector) => {
	const siblingsArr = Array.from(document.querySelectorAll(selector))
	const indexLen = siblingsArr.indexOf(dom)
	return indexLen
}

function getCanFocusChildNodes(dom) {
	return (
		(dom &&
			Array.from(dom.childNodes).filter(
				node =>
					node.className.indexOf(`${ytTablePerfix}-can-focus-cell`) >
					-1,
			)) ||
		[]
	)
}

export const getNextFocus = (dom, selector) => {
	const pNode = dom.parentNode
	const canFoucesArr = getCanFocusChildNodes(pNode)
	const selfIndex = canFoucesArr.indexOf(dom)
	const cfaLen = canFoucesArr.length
	const pIndex = getDomIndex(pNode, `.${ytTablePerfix}-row`)
	let nextNode = null
	if (selfIndex < cfaLen - 1) {
		nextNode = canFoucesArr[selfIndex + 1]
	} else {
		const nextRow = document.querySelector(
			`.${ytTablePerfix}-row:nth-child(${pIndex + 2})`,
		)
		const nextRowArr = getCanFocusChildNodes(nextRow)
		nextNode = nextRowArr[0]
	}
	if (nextNode) {
		triggerTableCellClick(nextNode)
	}
}

export function getFlexWidth(widthStr) {
    let widthPx = widthStr + ''
    if (widthPx.indexOf('px') === -1) {
        widthPx = widthPx + 'px'
    }
    return `0 0 ${widthPx}`
}

export function subStrNoPx(param) {
    if ((param + '').indexOf('px') > -1) {
        return (param + '').slice(-2)
    }
    return param
}

export function pxAdd(...args) {
    return args.reduce((cur, pre) => {
        return cur + Number(subStrNoPx(pre))
    }, 0)
}

export function accArrWidth(arr = [], keyCall) {
    const getObjNum = (obj, keyCall) => {
        let item = obj
        if (keyCall) {
            item = keyCall(obj)
        }
        return Number(item)
    }
    return arr.reduce((pre, cur) => {
        return pre + getObjNum(cur,keyCall)
    }, 0)
}
