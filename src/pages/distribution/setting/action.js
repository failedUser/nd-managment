
import { dataSource } from './data';
import { exportFile } from '../../../assets/js/common'

export function requestOrderList(data) {
    return Promise.resolve(dataSource);
}


export function requestRewardConfigExport(data) {
    exportFile('/newdreamer/rewardConfig/exportExcel', data);
}
