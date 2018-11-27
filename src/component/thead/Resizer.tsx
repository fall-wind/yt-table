import * as React from 'react'
import { ResizerProps } from '../../interface'
import { genResize, genWidthVal } from '../../utils'
import { GARG_MIN_WIDTH } from '../../constant'

const defaultProps = {
    mode: 'cell',
};

class Resizer<T> extends React.Component<ResizerProps<T>, any> {
    static defaultProps = defaultProps;

    constructor(props: ResizerProps<T>) {
        super(props);
        this.resizeColumnStart = this.resizeColumnStart.bind(this);
        this.resizeColumnMoving = this.resizeColumnMoving.bind(this);
    }

    trapEvents = false;

    resizeColumnStart(event: any) {
        console.log('l am start...')
        event.stopPropagation();
        event.preventDefault();
        const parentWidth = event.target.parentElement.getBoundingClientRect().width;
        const { column, setStateWithData } = this.props;
        const { pageX } = event;

        // const { trapEvents } = this;
        setStateWithData(
            {
                currentlyResizing: {
                    key: column.key,
                    startX: pageX,
                    parentWidth,
                },
            },
            () => {
                if (this.trapEvents) {
                    return;
                }
                this.trapEvents = true;
                window.addEventListener('mousemove', this.resizeColumnMoving);
                window.addEventListener('mouseup', this.resizeColumnEnd);
                window.addEventListener('mouseleave', this.resizeColumnEnd);
            }
        );
    }

    resizeColumnMoving(event: any) {
        event.stopPropagation();
        console.log('trapEvents:', this.trapEvents)
        if (!this.trapEvents) {
            return;
        }
        const {
            currentlyResizing, setStateWithData, columns, resized, column, pColumn
        } = this.props;

        // Delete old value
        const { pageX } = event;

        // Set the min size to 10 to account for margin and border or else the
        // group headers don't line up correctly
        const newWidth = Math.max(
            currentlyResizing.parentWidth + pageX - currentlyResizing.startX,
            11
        );

        // 最小宽度
        // const minWidth = (column.styles || {}).minWidth || MIN_WIDTH
        const minWidth = GARG_MIN_WIDTH
        if (newWidth < minWidth) {
            return;
        }
        setStateWithData({
            resized: genResize({
                column,
                columns,
                pColumn, // is mul cell parent columns
                resized,
                newWidth: genWidthVal(newWidth),
                currentlyResizing,
            }),
        });
    }

    /**
     * 移除监听事件
     */
    resizeColumnEnd = (event: any) => {
        event.stopPropagation();
        // If its a touch event clear the mouse one's as well because sometimes
        // the mouseDown event gets called as well, but the mouseUp event doesn't
        this.trapEvents = false;
        window.removeEventListener('mousemove', this.resizeColumnMoving);
        window.removeEventListener('mouseup', this.resizeColumnEnd);
        window.removeEventListener('mouseleave', this.resizeColumnEnd);

        // The touch events don't propagate up to the sorting's onMouseDown event so
        // no need to prevent it from happening or else the first click after a touch
        // event resize will not sort the column.
        this.props.setStateWithData({
            skipNextSort: true,
            currentlyResizing: {},
        });
    };

    render() {
        return <div onMouseDown={this.resizeColumnStart} className="yc-thead-resizer" />;
    }
}

export default Resizer;
