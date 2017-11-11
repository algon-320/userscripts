// ==UserScript==
// @name         AtCoder Jump to Beta
// @namespace    algon_320_atcoder_jump_to_beta
// @version      0.1
// @description  AtCoderのコンテストページにbeta版へのリンクを追加します。
// @author       algon-320
// @match        http*://*.contest.atcoder.jp/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

url = location.href;
contest_id = url.match(/\/\/(.+)\.contest\.atcoder\.jp/)[1];
beta_url = 'https://beta.atcoder.jp/contests/' + contest_id;

$('ul.nav').first().append('<li class="divider-vertical"></li>');
$('ul.nav').first().append('<li><a href="' + beta_url + '" target="_blank"><span class="lang lang-selected"><span class="lang-en lang-child hidden-lang">jump to beta</span><span class="lang-ja lang-child">beta版へ</span></span></a></li>');
