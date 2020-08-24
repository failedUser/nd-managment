
import request from '../../../../assets/js/request';
import { exportFile } from '../../../../assets/js/common'

export function requestBonusSettingList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backReward/pageVolumerWithdraw',
        params: data
    })
}
// 