import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from "react";
import BScroll from "better-scroll"
import styled from "styled-components";
import PropTypes from 'prop-types';

//better-scroll接受的参数
// Scroll.propTypes = {
//     direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
//     click: true,// 是否支持点击
//     refresh: PropTypes.bool,// 是否刷新
//     onScroll: PropTypes.func,// 滑动触发的回调函数
//     pullUp: PropTypes.func,// 上拉加载逻辑
//     pullDown: PropTypes.func,// 下拉加载逻辑
//     pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
//     pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
//     bounceTop: PropTypes.bool,// 是否支持向上吸顶
//     bounceBottom: PropTypes.bool// 是否支持向下吸底
// };

const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
    const [bScroll, setBScroll] = useState();

    const scrollContainerRef = useRef();

    const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom, pullUp, pullDown, onScroll } = props;

    //创建 better-scroll
    useEffect(() => {
        const scroll = new BScroll(scrollContainerRef.current, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            mouseWheel: true,
            bounce:{
                top: bounceTop,
                bottom: bounceBottom
            }
        });
        setBScroll(scroll);
        return () => { //返回函数清除组件
            setBScroll(null)
        }
    }, []);

    //每次重新渲染都要刷新实例，防止无法滑动
    useEffect(() => {
        if (refresh && bScroll) bScroll.refresh();
    })

    //绑定scroll事件
    useEffect(() => {
        if (!bScroll || !onScroll) return;

        bScroll.on('scroll', (scroll) => onScroll(scroll));

        return () => bScroll.off('scroll');
    }, [onScroll, bScroll]);

    //进行上拉到底的判断，调用上拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullUp) return;

        bScroll.on('scrollEnd', () => {
            if (bScroll.Y <= bScroll.maxScrollY + 100) pullUp();
        });

        return () => bScroll.off('scrollEnd');
    }, [pullUp, bScroll]);

    //进行下拉的判断，调用下拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullDown) return;

        bScroll.on('touchEnd', (pos) => {
            if (pos.y > 50) pullDown();
        });

        return () => bScroll.off('touchEnd');
    }, [pullDown, bScroll]);

    //子组件暴露给父组件实例方法
    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        getBScroll() {
            if (bScroll) return bScroll;
        }
    }));

    return (
        <ScrollContainer ref={scrollContainerRef}>
            {props.children}
        </ScrollContainer>
    )
})

//设置scroll默认值
Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll:null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
}

//设置scroll默认值类型
Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,//是否支持向上吸顶
    bounceBottom: PropTypes.bool//是否支持向下吸顶
};

export default Scroll;