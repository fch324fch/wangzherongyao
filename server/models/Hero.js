//一个mongoose模型
const mongoose = require('mongoose')
//Schema 构造函数 定义数据库字段
const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    banner: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [
        {
            icon: { type: String },
            name: { type: String },
            description: { type: String },
            tips: { type: String },
            delay: { type: String },
            cost: { type: String },
        }
    ],
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        description: { type: String },
    }],
    enemys: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        description: { type: String },
    }],
    restrain: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        description: { type: String },
    }],
    userskills: [
        { type: mongoose.SchemaTypes.ObjectId, ref: "UserSkill" }
    ],
    mingwens: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Mingwen" }],
    skins: [
        {
            name: { type: String },
            banner: { type: String },
        }
    ],
    image: { type: String },
    primaryskills: [
        {
            hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
            name: { type: String },
            icon: { type: String },
        }
    ]

})
//导出创建的mongodb实例 第三个参数是集合名
module.exports = mongoose.model('Hero', schema, 'heroes')