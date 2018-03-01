export function getChatId(userId,targetId){
    return [userId,targetId].sort().join('_')
}

export function fixCarousel(){
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
    }, 0);
}