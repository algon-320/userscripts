// ==UserScript==
// @name         Beta版AtCoderの画像を正しいリンクに直すやつ
// @namespace    algon_320_atcoder_beta_image_linker
// @version      0.1
// @description  Beta版AtCoderの画像を正しいリンクに直します。(旧バージョンのリンクに貼り直します)
// @author       algon-320
// @match        https://beta.atcoder.jp/contests/*/tasks/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

var page_url = location.href;
var contest_id = page_url.match(/\/contests\/(.+)\/tasks/)[1];
(function() {
    $('#task-statement img').each(function(_, elem) {
        $(elem).attr('src', 'https://' + contest_id + '.contest.atcoder.jp' + $(elem).attr('src'));
    });
})();
