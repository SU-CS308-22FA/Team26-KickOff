const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const newsSchema = mongoose.Schema(
    {
        news_title: {type: String, required: true},
        news_article: {type: String, required: true},
        news_picture: {type: String, required: true},
        news_author: {type: String, required: true},
        news_date: {type: String, required: true},

    }, {timestamps: true}
);

const News = mongoose.model('news', newsSchema);
module.exports = News;