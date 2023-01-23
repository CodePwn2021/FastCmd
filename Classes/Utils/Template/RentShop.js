module.exports = {
    '禁用_示例': {
        '禁用_物品示例': {
            type: 'item',
            price: 20,
            desc: '这里是32个苹果',
            extra: {
                item: 'minecraft:apple',
                amount: 32
            }
        },
        '禁用_箱子示例': {
            type: 'chest',
            price: 100,
            desc: '这里是一个箱子',
            extra: {
                chestPos: '5 14 6'
            }
        },
        '禁用_生物示例': {
            type: 'entity',
            price: 233,
            desc: '这是一个生物',
            extra: {
                entity_id: 'minecraft:cat'
            }
        }
    }
};