function getItem() {
    return {
        key: Math.random() * 100000,
        name1: '122123',
        name2: '1212113',
        name3: '121212',
        name4: '12124',
        name5: '1251',
        name6: '1327',
        name7: '1219',
        name8: '124-',
        name9: Array.from({length: Math.random() * 8}, () => 'http://alpha-2115.caibeike.com/i/db23aabcc32b698375babffd50de72c4-cXni3O-bMOMwiAMhj2@!750c445'),
        name10: Array.from({length: Math.random() * 8}, () => 'http://alpha-2115.caibeike.com/i/db23aabcc32b698375babffd50de72c4-cXni3O-bMOMwiAMhj2@!750c445'),
        name11: '1262',
    }
}

export default Array.from({length: Math.random() * 20}, getItem);