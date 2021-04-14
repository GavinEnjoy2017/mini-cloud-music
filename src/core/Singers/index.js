import React, { useState, useEffect } from 'react';
import Horizen from '../../common/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { 
    NavContainer,
    ListContainer,
    List,
    ListItem
  } from "./style";
import Scroll from '../../common/scroll';
import { connect } from 'react-redux';
import { changePageCount, changeSingleList, getHotSingleList, refreshMoreHotSingleList, refreshMoreSingerList } from './store/actionCreators';
import { changeEnterLoading } from '../Recommend/store/actionCreators';

function Singers (props) {
    let [category, setCategory] = useState('');
    let [alpha, setAlpha] = useState('');

    const { updateDispatch, getHotSingerDispatch, singerList } = props;

    let handleUpdateAlpha = (val) => {
        setAlpha(val);
        updateDispatch(category, val);
    }

    let handleUpdateCategory = (val) => {
        setCategory(val);
        updateDispatch(val, alpha);
    }

    useEffect(() => {
        if (!singleList.size) {
            getHotSingerDispatch();
        }
    }, [])

    const singleList = singerList ? singerList.toJS() : [];

    const renderSingleList = () => {
        return (
            <List>
                {
                    singleList.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + '' + index}>
                                <div className="img_wrapper">
                                    <img src={`${item.picUrl}?param=300*300`} width="100%" height="100%" alt="music"></img>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    return (
        <NavContainer>
            <Horizen list={categoryTypes} title={"分类(默认热门):"} handleClick={handleUpdateCategory} oldVal={category}></Horizen>
            <Horizen list={alphaTypes} title={"首字母:"} handleClick={handleUpdateAlpha} oldVal={alpha}></Horizen>
            <ListContainer>
                <Scroll>
                    {renderSingleList()}
                </Scroll>
            </ListContainer>
        </NavContainer>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
});

const mapDispatchToProps = (dispatch) => {
    return {
        getHotSingerDispatch() {
            dispatch(getHotSingleList());
        },
        updateDispatch(category, alpha) {
            dispatch(changePageCount(0));
            dispatch(changeEnterLoading(true));
            dispatch(changeSingleList(category, alpha));
        },
        pullUpRefreshDispatch(category, alpha, hot, count) {
            dispatch(changePullUpLoading(true));
            dispatch(changePageCount(count+1));
            if(hot){
                dispatch(refreshMoreHotSingleList());
            } else {
                dispatch(refreshMoreSingerList(category, alpha));
            }
        },
        pullDownRefreshDispatch(category, alpha) {
            dispatch(changePullDownLoading(true));
            dispatch(changePageCount(0));//属于重新获取数据
            if(category === '' && alpha === ''){
                dispatch(getHotSingerList());
            } else {
                dispatch(getSingerList(category, alpha));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));