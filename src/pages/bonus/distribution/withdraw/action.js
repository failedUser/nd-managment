
import request from '../../../../assets/js/request';
import { exportFile } from '../../../../assets/js/common'

export function requestDistributorWithdrawList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backReward/pageDistributorWithdraw',
        params: data
    })
}
// 