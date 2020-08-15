export function exportFile(url, data) {
    let params = Object.entries(data).reduce((Result, [key, value], index) => {
        if (index === 0) {
            Result += `ids=${value}`
        } else {
            Result += `&ids=${value}`
        }
        return Result;
        
    }, '')
    const link = document.createElement('a');
    link.target ='_blank';
    link.href = `http://newdreamer.cn:8080/newdreamer/productInfo/exportExcel?${params}`;
    link.click();
    return Promise.resolve();
}