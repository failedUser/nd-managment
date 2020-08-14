
import request from '../../../assets/js/request';

export function requestDistributionRewardList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backReward/pageDistributorReward',
        params: data
    })
}