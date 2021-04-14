import {
    getHotSingleListRequest,
    getSingleListRequest
} from "../../../api/request";
import {
    CHANGE_SINGER_LIST,
    CHANGE_CATOGORY,
    CHANGE_ALPHA,
    CHANGE_PAGE_COUNT,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING,
    CHANGE_ENTER_LOADING
} from './constants';
import {
    fromJS
} from 'immutable';

export const changeSingleList = (value) => ({
    type: CHANGE_SINGER_LIST,
    data: fromJS(value)
});

export const changeEnterLoading = (data) => ({
    type: CHANGE_ENTER_LOADING,
    data
});

export const changePageCount = (data) => ({
    type: CHANGE_PAGE_COUNT,
    data
});

export const changePullUpLoading = (data) => ({
    type: CHANGE_PULLUP_LOADING,
    data
});

export const changePullDownLoading = (data) => ({
    type: CHANGE_PULLDOWN_LOADING,
    data
});

export const getHotSingleList = () => {
    return (dispatch) => {
        getHotSingleListRequest(0).then(res => {
            const data = res.artists;
            dispatch(changeSingleList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch((error) => {
            console.log(error);
            console.log('热门歌手数据获取失败');
        })
    }
}

export const refreshMoreHotSingleList = () => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singleList = getState().getIn(['singers', 'singerList']).toJS();
        getHotSingleListRequest(pageCount).then(res => {
            const data = [...singleList, ...res.artists];
            dispatch(changeSingleList(data));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('热门歌手数据获取失败');
        })
    }
}

export const getSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        getSingleListRequest(category, alpha, 0).then(res => {
            const data = res.artists;
            dispatch(changeSingleList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        })
    }
}

export const refreshMoreSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singleList = getState().getIn(['singers', 'singerList']).toJS();
        getSingleListRequest(category, alpha, pageCount).then(res => {
            const data = [...singleList, ...res.artists];
            dispatch(changeSingleList(data));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        })
    }
}