
import request from '../../../assets/js/request';

export function requestDistributionRewardList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/rewardConfig',
        params: data
    })
}