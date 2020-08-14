
import request from '../../../assets/js/request';

export function requestBonusSettingList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/volumeRewardConfig',
        params: data
    })
}



