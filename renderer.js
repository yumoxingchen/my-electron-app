const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = '123'
const CLICKED_MESSAGE = 'clicked'

new Notification(NOTIFICATION_TITLE,{body:NOTIFICATION_BODY}).onclick(()=>{
    console.log(CLICKED_MESSAGE)
})