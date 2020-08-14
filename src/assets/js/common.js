export function exportFile(stream, name) {
    const blob = new Blob([stream], {
        type: 'application/ms-excel;charset=UTF-8',
    });
    console.log(blob);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = e => {
        const a = document.createElement('a');
        a.download = name+'.xls';
        a.href = e.target.result;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}