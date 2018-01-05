// ==UserScript==
// @name       AtCoder Beta Color
// @namespace  algon_320_atcoder_beta_color
// @version    0.2
// @description beta版atcoderコンテストの問題一覧のページにAC状況に応じて色を着けます。
// @match      https://beta.atcoder.jp/contests/*/tasks*
// @author     algon-320
// @require    https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

var page_url = location.href;
var contest_id = page_url.match(/\/contests\/(.+)\/tasks/)[1];
var status_list = {};

$.ajax({
    type: 'GET',
    url: 'https://beta.atcoder.jp/contests/' + contest_id + '/submissions/me',
    dataType: 'html',
    success: function(html) {
        function check(doc) {
            tbody = $(doc).find('tbody:first');
            $(tbody).find('tr').each(function() {
                p_url = $(this).find('td:nth-of-type(2)').find('a').attr('href');
                judge_status = $(this).find('td:nth-of-type(7)').find('span').text();
                if(p_url in status_list) {
                    if(judge_status == 'AC') {
                        status_list[p_url] = 'AC';
                    }
                } else {
                    status_list[p_url] = judge_status;
                }
            });
        }

        check(html);
        var page_num = $(html).find('ul.pagination').find('li').length;
        for(var i = 1; i <= page_num; i++) {
            var other_page_url = 'https://beta.atcoder.jp/contests/' + contest_id + '/submissions/me?page=' + i;
            $.ajax({
                url: other_page_url,
                cache: false,
                success: function(html2) {
                    check(html2);
                }
            });
        }
    }
});

if(/\/contests\/.+\/tasks$/.test(page_url)) {
    $(document).ajaxStop(function() {
        $('tbody:first > tr').each(function(i,tr) {
            p_url = $(tr).find('td > a').attr('href');
            if(p_url in status_list) {
                bg_color = '';
                switch(status_list[p_url]) {
                    case 'AC':
                        bg_color = 'rgb(212, 237, 201)';
                        break;
                    case 'WA':
                        bg_color = 'rgb(255, 227, 227)';
                        break;
                    default:
                        bg_color = 'lightyellow';
                        break;
                }
                $(tr).attr('style', 'background-color:' + bg_color);
            }
        });
    });
} else {
    var task_url = page_url.match(/.+(\/contests\/.+\/tasks\/.+)$/)[1];
    $(document).ajaxStop(function(){
        if(task_url in status_list && status_list[task_url] == 'AC') {
            var p_content = $('#task-statement').prev().html();
            p_content += ' / <span style="color:green;">✔solved</span>';
            $('#task-statement').prev().html(p_content);
        }
    });
}

