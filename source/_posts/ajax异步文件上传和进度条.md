---
title: ajax异步文件上传和进度条
tags: [前端,ajax,上传]
categories: 前端
---
###一、ajax异步文件上传

　　之前有说过在form表单内的文件上传，但是会刷新页面，下面就来实现不刷新页面的异步文件上传

```
<div class="uploding_div">
    <input class="up_input" type="file" id="file_test" onchange="change_file_name()">
    <span class="put_upload" onclick="FileUpload()">上传</span>
</div>
```

```
<script>
function FileUpload(){
        var formData = new FormData();//生成空的form对象
        formData.append("file",$("#file_test")[0].files[0]);//把该文件对象放入formData
        $.ajax({
            url: "{% url 'file_upload' %}",
            data: formData,
            type: 'POST',
            processData:false,
            contentType:false,
            success: function(arg){
                // 当请求执行完成之后，自动调用
                // arg:服务器返回的数据
                alert("上传成功");
            },
            error: function(){
                // 当请求错误之后，自动调用
            }
        })
    }
}
</script>
```

后台views

```
def file_upload(request):
    if request.method == "POST":
        file_obj=request.FILES.get("file") #获取到封装了文件操作的对象
        new_file_path = "upload/%s/%s"%(request.user.userprofile.id,file_obj.name)
        f = open(new_file_path,"wb")
        for line in file_obj.chunks(): #循环取数据
            f.write(line)   #写入
        f.close()
        return HttpResponse("ok")
```



###二、进度条的实现

从Bootstrap找一个进度条

```
<!--进度条-->
<div class="progress_div">
    <div class="progress hide">
      <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
        0%
      </div>
    </div>
 </div>
<!--进度条-->
```

```
<div class="uploding_div">
    <input class="up_input" type="file" id="file_test" onchange="change_file_name()">
    <span class="put_upload" onclick="FileUpload()">上传</span>
</div>
<div style="width: 120px">
    <span class="up_icon">未选择</span>
</div>
```

```
<script>
function change_file_name(){

        $(".up_icon").text("已选择");
        $(".up_icon").css("color","blue");
    }

//上传文件图片
function FileUpload(){
    var upload_type = $(".up_input")[0].value;
    if (upload_type == '') {   //如果等于空
        console.log("没选择文件")
    }else {
        var formData = new FormData();//生成空的form对象
        formData.append("file",$("#file_test")[0].files[0]);//把该文件对象放入formData
        $.ajax({
            url: "{% url 'file_upload' %}",
            data: formData,
            type: 'POST',
            processData:false,
            contentType:false,
            success: function(arg){
                // 当请求执行完成之后，自动调用
                // arg:服务器返回的数据

                $(".up_input").val("");
                $(".up_icon").text("未选择");
                $(".up_icon").css("color","whitesmoke");
            },
            error: function(){
                // 当请求错误之后，自动调用
            }
        });//end ajax
        $(".progress").removeClass("hide");
        GetFileUploadProgress($("#file_test")[0].files[0])
    }
}

function GetFileUploadProgress(fileobj){
    var UploadProgressRefresh = setInterval(function(){
        $.getJSON("{% url 'file_progress' %}",{filename:fileobj.name},function(callback){
            console.log(callback);

            //计算进度条
            var current_percent = parseInt((callback.recv_size/fileobj.size)*100)+"%";//计算百分比
            $(".progress-bar").css("width",current_percent);
            $(".progress-bar").text(current_percent);

            if (fileobj.size == callback.recv_size){//如果文件的大小等于后台传回的大小，终止定时器
                clearInterval(UploadProgressRefresh);

                $(".progress").addClass("hide");
                alert("上传成功");
                //清空进度条
                $(".progress-bar").css("width","0%");
                $(".progress-bar").text(0);

                //传完后删除key
                $.getJSON("{% url 'delete_cache_key' %}",{cache_key:fileobj.name},function(callback){
                    console.log("")

                })
            }

        })
    },1000);
}

</script>

js代码
```

```
#上传文件
def file_upload(request):
    if request.method == "POST":
        file_obj=request.FILES.get("file") #获取到封装了文件操作的对象
        new_file_path = "upload/%s/%s"%(request.user.userprofile.id,file_obj.name)
        recv_size = 0
        f = open(new_file_path,"wb")
        for line in file_obj.chunks(): #循环取数据
            f.write(line)   #写入
            recv_size += len(line)
            cache.set(file_obj.name,recv_size) #以文件名为key存入缓存
        f.close()
        return HttpResponse("ok")

#进度条获取大小
def file_progress(request):
    filename = request.GET.get("filename")
    progress = cache.get(filename)

    return HttpResponse(json.dumps({"recv_size":progress}))

#传完后删除key
def delete_cache_key(requeat):
    cache_key = requeat.GET.get("cache_key")
    cache.delete(cache_key)
    return HttpResponse("delete cache_key ceccess")

views
```



 