# 591-rent-helper
#### 目前只接受搜尋一個網址條件
#### 有需要改寫的歡迎自行clone，改完還請發個PR回

## Install
```
git install
yarn add
```
## Vars
```
cp .env.example .env.development && mv .env.example .env.production
```
1. 至[Line developer](https://developers.line.biz/zh-hant/)登入後開啟Messaging API，並複製Channel access token和Channel Secret並分別貼上 _LINE_BOT_ACCESS_TOKEN_ && _LINE_BOT_SECRET_

2. 至[Line Notify](https://notify-bot.line.me/zh_TW/)管理登入服務頁面，點選登錄服務創建一個服務，複製Client ID和Client Secret並分別貼上 _LINE_NOTIFY_CLIENT_ID_ && _LINE_NOTIFY_SECRET_

### 最後部署上Heroku即可使用