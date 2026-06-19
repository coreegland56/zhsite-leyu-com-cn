// 公共站点辅助脚本 —— 提示卡片、关键词徽章与访问说明
(function() {
  'use strict';

  // 配置数据：站点信息与关键词
  const SITE_CONFIG = {
    siteUrl: "https://zhsite-leyu.com.cn",
    keywords: ["乐鱼体育", "体育资讯", "赛事动态", "运动社区", "健康生活"],
    notice: {
      title: "访问提示",
      content: "本平台提供体育相关信息和社区交流服务。浏览内容前请确认您已年满18周岁。",
      type: "info" // info | warning | tip
    }
  };

  // 创建提示卡片
  function createNoticeCard(config) {
    const card = document.createElement('div');
    card.className = 'site-notice-card';
    card.setAttribute('role', 'alert');

    const header = document.createElement('div');
    header.className = 'notice-header';
    header.textContent = config.notice.title;

    const body = document.createElement('div');
    body.className = 'notice-body';
    body.textContent = config.notice.content;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'notice-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', '关闭提示');
    closeBtn.addEventListener('click', function() {
      card.style.display = 'none';
    });

    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(closeBtn);

    // 设置卡片类型样式
    if (config.notice.type === 'warning') {
      card.classList.add('notice-warning');
    } else if (config.notice.type === 'tip') {
      card.classList.add('notice-tip');
    } else {
      card.classList.add('notice-info');
    }

    return card;
  }

  // 创建关键词徽章列表
  function createKeywordBadges(keywords) {
    const container = document.createElement('div');
    container.className = 'keyword-badges';

    const title = document.createElement('span');
    title.className = 'badges-title';
    title.textContent = '热门关键词：';
    container.appendChild(title);

    keywords.forEach(function(keyword) {
      const badge = document.createElement('span');
      badge.className = 'keyword-badge';
      badge.textContent = keyword;
      // 点击徽章跳转到站内搜索（模拟）
      badge.addEventListener('click', function() {
        window.location.href = SITE_CONFIG.siteUrl + '/search?q=' + encodeURIComponent(keyword);
      });
      container.appendChild(badge);
    });

    return container;
  }

  // 创建访问说明区域
  function createAccessInfo(config) {
    const infoBox = document.createElement('div');
    infoBox.className = 'access-info';

    const heading = document.createElement('h3');
    heading.textContent = '访问说明';
    infoBox.appendChild(heading);

    const list = document.createElement('ul');
    const items = [
      '本站域名：' + config.siteUrl,
      '欢迎访问乐鱼体育平台，获取最新赛事动态。',
      '请遵守当地法律法规，文明参与社区讨论。',
      '如遇访问问题，可尝试刷新页面或更换网络环境。'
    ];
    items.forEach(function(text) {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
    infoBox.appendChild(list);

    const footerLink = document.createElement('a');
    footerLink.href = config.siteUrl;
    footerLink.textContent = '前往乐鱼体育首页';
    footerLink.className = 'site-link';
    footerLink.target = '_blank';
    footerLink.rel = 'noopener noreferrer';
    infoBox.appendChild(footerLink);

    return infoBox;
  }

  // 注入样式
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .site-notice-card {
        background: #f0f8ff;
        border: 1px solid #b0d4f1;
        border-radius: 8px;
        padding: 12px 20px;
        margin: 16px auto;
        max-width: 600px;
        position: relative;
        font-family: sans-serif;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      }
      .site-notice-card.notice-warning {
        background: #fff8e1;
        border-color: #ffd54f;
      }
      .site-notice-card.notice-tip {
        background: #e8f5e9;
        border-color: #a5d6a7;
      }
      .notice-header {
        font-weight: bold;
        font-size: 1.1em;
        margin-bottom: 6px;
        color: #333;
      }
      .notice-body {
        color: #555;
        line-height: 1.5;
      }
      .notice-close {
        position: absolute;
        top: 8px;
        right: 12px;
        background: transparent;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
        color: #999;
      }
      .notice-close:hover {
        color: #333;
      }
      .keyword-badges {
        margin: 20px auto;
        max-width: 600px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        font-family: sans-serif;
      }
      .badges-title {
        font-weight: 600;
        color: #444;
        margin-right: 4px;
      }
      .keyword-badge {
        display: inline-block;
        background: #e3f2fd;
        color: #1565c0;
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 0.9em;
        cursor: pointer;
        transition: background 0.2s;
        border: 1px solid #bbdefb;
      }
      .keyword-badge:hover {
        background: #bbdefb;
      }
      .access-info {
        max-width: 600px;
        margin: 20px auto;
        padding: 16px 20px;
        background: #fafafa;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        font-family: sans-serif;
      }
      .access-info h3 {
        margin-top: 0;
        color: #222;
      }
      .access-info ul {
        padding-left: 20px;
        color: #555;
      }
      .access-info li {
        margin-bottom: 4px;
      }
      .site-link {
        display: inline-block;
        margin-top: 12px;
        padding: 6px 16px;
        background: #1e88e5;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
      }
      .site-link:hover {
        background: #1565c0;
      }
    `;
    document.head.appendChild(style);
  }

  // 初始化：在页面加载完成后执行
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    injectStyles();

    const config = SITE_CONFIG;

    // 将提示卡片添加到页面顶部
    const noticeCard = createNoticeCard(config);
    document.body.insertBefore(noticeCard, document.body.firstChild);

    // 将关键词徽章添加到页面
    const badges = createKeywordBadges(config.keywords);
    document.body.appendChild(badges);

    // 将访问说明添加到页面
    const accessInfo = createAccessInfo(config);
    document.body.appendChild(accessInfo);
  }

  init();
})();