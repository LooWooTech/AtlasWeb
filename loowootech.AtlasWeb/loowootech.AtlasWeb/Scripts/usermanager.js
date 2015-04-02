$(function () {
    $("#Code").bind("click", function () {
        this.src = "/Home/Code?time=" + (new Date()).getTime();
        Clear("Code");
    });

    $("[name=Code]").focus(function () {
        Clear("Code");
    }).blur(function () {
        var code = $(this).val();
        if (code == "验证码" || code == "" || code == undefined || code == null) {
            Error("Code");
            return false;
        }
        if ($.cookie("Code")) {
            if (code.toLowerCase() != $.cookie("Code").toLowerCase()) {
                Error("Code");
            } else {
                Success("Code");
            }
        }
    });

    
});

/*
   用于添加用户时，去除输入框中正确或者错误标志
   */
function Clear(ID) {
    if ($("#" + ID + "_group").hasClass("has-error")) {
        $("#" + ID + "_group").removeClass("has-error");
    }
    if ($("#" + ID + "_group").hasClass("has-success")) {
        $("#" + ID + "_group").removeClass("has-success");
    }


    if ($("#" + ID + "_label").hasClass("glyphicon-remove")) {
        $("#" + ID + "_label").removeClass("glyphicon-remove");
    }

    if ($("#" + ID + "_label").hasClass("glyphicon-ok")) {
        $("#" + ID + "_label").removeClass("glyphicon-ok");
    }
}
/*
用于输入正确时，显示正确标志
*/
function Success(ID) {
    $("#" + ID + "_label").addClass("glyphicon-ok");
    $("#" + ID + "_group").addClass("has-success");
    $("#input" + ID + "Status").html("(success)");
}
/*
用于输入错误时，显示错误标志
*/
function Error(ID) {
    $("#" + ID + "_label").addClass("glyphicon-remove");
    $("#input" + ID + "Status").html("(error)");
    $("#" + ID + "_group").addClass("has-error");
}
/*
用于检测用户输入用户是否存在
*/
function VerificationByName(Name) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("name_msg").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "/Admin/User/Verification?Name=" + Name, false);
    xmlhttp.send();
}


function VerificationByPassword(Password) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("old_msg").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "/User/VerificationByPassword?Password=" + Password, false);
    xmlhttp.send();
}