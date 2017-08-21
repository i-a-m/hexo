---
title: Javascript 操作select控件大全（新增、修改、删除、选中、清空、判断存在等）
tags: [前端,js,]
categories: 前端
---
​         1![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)判断select选项中 是否存在Value="paraValue"的Item 

​         2![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)向select选项中 加入一个Item 

​         3![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)从select选项中 删除一个Item 

​         4![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)删除select中选中的项 

​         5![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)修改select选项中 value="paraValue"的text为"paraText" 

​         6![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)设置select中text="paraText"的第一个Item为选中 

​         7![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)设置select中value="paraValue"的Item为选中 

​         8![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)得到select的当前选中项的value 

​         9![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)得到select的当前选中项的text 

​        10![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)得到select的当前选中项的Index 

​        11![img](http://www.cnblogs.com/Images/OutliningIndicators/None.gif)清空select的项 


    js 代码
    // 1.判断select选项中 是否存在Value="paraValue"的Item        
    function jsSelectIsExitItem(objSelect, objItemValue) { 
    var isExit = false;        
    for (var i = 0; i < objSelect.options.length; i++) {        
        if (objSelect.options[i].value == objItemValue) {        
            isExit = true;        
            break;        
        }        
    }        
    return isExit;
    } 
    // 2.向select选项中 加入一个Item        
    
    function jsAddItemToSelect(objSelect, objItemText, objItemValue) {    
    
    //判断是否存在        
    if (jsSelectIsExitItem(objSelect, objItemValue)) {        
        alert("该Item的Value值已经存在");        
    } else {        
        var varItem = new Option(objItemText, objItemValue);      
        objSelect.options.add(varItem);     
        alert("成功加入");     
    }  
    } 
    // 3.从select选项中 删除一个Item 
    function jsRemoveItemFromSelect(objSelect, objItemValue) { 
    //判断是否存在        
    if (jsSelectIsExitItem(objSelect, objItemValue)) {        
        for (var i = 0; i < objSelect.options.length; i++) {        
            if (objSelect.options[i].value == objItemValue) {        
                objSelect.options.remove(i);        
                break;        
            }        
        }        
        alert("成功删除");        
    } else {        
        alert("该select中 不存在该项");        
    }  
    } 
    // 4.删除select中选中的项 
    function jsRemoveSelectedItemFromSelect(objSelect) { 
    var length = objSelect.options.length - 1;    
    for(var i = length; i >= 0; i--){    
        if(objSelect[i].selected == true){    
            objSelect.options[i] = null;    
        }    
    }   
    }  
    
    // 5.修改select选项中 value="paraValue"的text为"paraText"        
    
    function jsUpdateItemToSelect(objSelect, objItemText, objItemValue) { 
    
    //判断是否存在        
    if (jsSelectIsExitItem(objSelect, objItemValue)) {        
        for (var i = 0; i < objSelect.options.length; i++) {        
            if (objSelect.options[i].value == objItemValue) {        
                objSelect.options[i].text = objItemText;        
                break;        
            }        
        }        
        alert("成功修改");        
    } else {        
        alert("该select中 不存在该项");        
    }
    }  
      
    // 6.设置select中text="paraText"的第一个Item为选中        
    
    function jsSelectItemByValue(objSelect, objItemText) {     
    
    //判断是否存在        
    var isExit = false;        
    for (var i = 0; i < objSelect.options.length; i++) {        
        if (objSelect.options[i].text == objItemText) {        
            objSelect.options[i].selected = true;        
            isExit = true;        
            break;        
        }        
    }              
    //Show出结果        
    if (isExit) {        
        alert("成功选中");        
    } else {        
        alert("该select中 不存在该项");        
    }  
    } 
    
    // 7.设置select中value="paraValue"的Item为选中    
    
    document.all.objSelect.value = objItemValue;   
    // 8.得到select的当前选中项的value 
    var currSelectValue = document.all.objSelect.value;  
    // 9.得到select的当前选中项的text   
    var currSelectText = document.all.objSelect.options[document.all.objSelect.selectedIndex].text;     
    // 10.得到select的当前选中项的Index
    var currSelectIndex = document.all.objSelect.selectedIndex;    
    // 11.清空select的项   
    document.all.objSelect.options.length = 0; 
​    

