$(function () {
    // 数据格式var todolist = [{title:"xxx",done:true}]

    // 读取数据
    function getDate() {
        var data = localStorage.getItem("todolist")
        // 先判断是否存在数据
        if (data == null) {
            return [];
        } else {
            // 存在数据就返回对象形式的数据
            return JSON.parse(data);
            // console.log(JSON.parse(data));
            // 含有内容的数组
        }
    }

    // 存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染页面
    function load() {
        // 获取数据
        var data = getDate()
        // 遍历添加渲染之前先清空 ol ul 每一次添加都会遍历一遍数据 避免重复添加数据
        $("ol, ul").empty();

        // 遍历数据添加
        $.each(data, function (i, n) {
            // 如果done = true 渲染到ul中 选中状态打钩
            if (n.done) {
                $("ul").prepend(`<li><input type="checkbox" checked="checked"><p>${data[i].title}</p><a href="javascript:;" id="${i}"></a></li>`)
            } else {
                // 未完成渲染到ol中
                $("ol").prepend(`<li><input type="checkbox" ><p>${data[i].title}</p><a href="javascript:;" id="${i}"></a></li>`)
            }
        })

        $("#todocount").text($("ol").children().length);
        $("#donecount").text($("ul li").length);

    };

    // 每次刷新加载页面先渲染一次页面
    load();

    // 在title中输入内容 点击回车存储数据
    $("#title").on("keydown", function (event) {
        if (event.keyCode == 13) {
            if ($(this).val().trim() == '') {
                alert("未输入内容")
                $(this).val('');
            } else {
                // 如果点击的是回车 读取数据 ==>变量接收
                var local = getDate();
                // 修改数据
                local.push({ title: $(this).val(), done: false })
                // 存储数据
                saveDate(local);
                // 渲染页面
                load();
                // 清空输入框
                $("#title").val('');
            }
        }
    })

    // 点击a删除数据
    $("ol, ul").on("click", "a", function () {
        // 获取数据
        var data = getDate()
        // 获取当前点击的a的id索引号
        var index = $(this).prop('id');
        console.log(index);
        // 修改数据
        data.splice(index, 1)
        // 保存数据
        saveDate(data)
        // 渲染页面
        load();
    });

    // 点击完成和待办事项
    $("ol, ul").on("click", "input", function () {
        // 获取数据
        var data = getDate()
        // 修改数据
        var index = $(this).siblings('a').prop("id")
        data[index].done = $(this).prop("checked")

        // 变量保存点击完成/代办数据
        var dx = data[index];
        // 删除当前
        data.splice(index, 1);
        // 将保存的数据放到数据最后面
        data.push(dx);

        //保存数据
        saveDate(data);

        load();
    });
});


















/*
$(function () {
    // alert(11);
    // 1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                // 先读取本地存储原来的数据
                var local = getDate();
                // console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组local 存储给本地存储
                saveDate(local);
                // 2. toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });


    // 3. toDoList 删除操作
    $("ol, ul").on("click", "a", function() {
        // alert(11);
        // 先获取本地存储
        var data = getDate();
        console.log(data);
        // 修改数据
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });

    // 4. toDoList 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function() {
        // alert(11);
        // 先获取本地存储的数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        // data[?].done = ?
        data[index].done = $(this).prop("checked");
        console.log(data);

        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });

    // 读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        console.log(data);
        // 遍历之前先要清空ol里面的元素内容
        $("ol, ul").empty();
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据
        $.each(data, function(i, n) {
            // console.log(n);
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }

        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);

    }

})
*/