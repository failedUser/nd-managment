export function exportFile(url, data) {
    let params = Object.entries(data).reduce((Result, [key, value], index) => {
        if (index === 0) {
            Result += `${key}=${value}`
        } else {
            Result += `&${key}=${value}`
        }
        return Result;
        
    }, '')
    const link = document.createElement('a');
    link.href = `http://newdreamer.cn:8080/newdreamer/productInfo/exportExcel?${params}`;
    link.click();
    return Promise.resolve();
}