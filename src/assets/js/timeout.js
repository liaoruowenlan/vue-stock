export default {
    outtime:function(beginTime,nowTime){
        var strb = beginTime.split (":");
        if (strb.length != 2) {
            return false;
        }
        
        var strn = nowTime.split (":");
        var endTime = "11:30"
        if(strn[0]*1>12){
            endTime = "15:00"
        }
        var stre = endTime.split (":");
         if (stre.length != 2) {
            return false;
        }
    
        var b = new Date ();
        var e = new Date ();
        var n = new Date ();
    
        b.setHours (strb[0]);
        b.setMinutes (strb[1]);
        e.setHours (stre[0]);
        e.setMinutes (stre[1]);
        n.setHours (strn[0]);
        n.setMinutes (strn[1]);
        console.log(nowTime)
        if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
            return true;
        } else {
           //  console.log("当前时间是：" + n.getHours () + ":" + n.getMinutes () + "，不在该时间范围内！");
            return false;
        }
    }
}