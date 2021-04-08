import React from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../common/scroll';
import { Content } from './style';

function Recommend () {
    const bannerList = [1,2,3,4].map(e => ({id: e, imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }))

    const recommendList = [1,2,3,4,5,6,7,8,9,10].map(item => ({
        id: item,
        picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
        playCount: 18185769,
        name: '周杰伦,林俊杰,汪峰,邓紫棋,华晨宇'
    }))

    return (
        <Content>
            <Scroll className="list">
                <div>
                    <Slider bannerList={bannerList}></Slider>
                    <RecommendList recommendList={recommendList}></RecommendList>
                </div>
            </Scroll>
        </Content>
    )
}

export default React.memo(Recommend);