(function () {
  var AUTH_KEY = 'mpcl-auth';
  var PASS = 'Lutti007';

  if (localStorage.getItem(AUTH_KEY) === '1') return;

  document.documentElement.style.visibility = 'hidden';

  document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.createElement('div');
    overlay.id = 'mpcl-gate';
    overlay.innerHTML = [
      '<div style="',
        'position:fixed;inset:0;z-index:99999;',
        'background:#FAFAF7;',
        'display:flex;align-items:center;justify-content:center;',
        'font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;',
      '">',
        '<div style="',
          'background:#fff;',
          'border:1px solid #E5E2DA;',
          'border-radius:20px;',
          'padding:48px 48px 40px;',
          'width:100%;max-width:400px;',
          'box-shadow:0 12px 40px rgba(14,15,17,0.08);',
        '">',
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:40px;">',
            '<div style="width:4px;height:18px;background:#B8763A;border-radius:1px;flex-shrink:0;"></div>',
            '<span style="font-size:15px;font-weight:500;color:#1A1A1C;letter-spacing:-0.01em;">MPCL IT &amp; Web Solutions</span>',
          '</div>',
          '<p style="font-size:13px;color:#9A9A9C;font-family:\'JetBrains Mono\',ui-monospace,monospace;letter-spacing:0.04em;margin:0 0 24px;text-transform:uppercase;">',
            'Zugang erforderlich',
          '</p>',
          '<form id="gate-form">',
            '<div style="margin-bottom:16px;">',
              '<label for="gate-pw" style="',
                'display:block;',
                'font-family:\'JetBrains Mono\',ui-monospace,monospace;',
                'font-size:11px;letter-spacing:0.06em;text-transform:uppercase;',
                'color:#9A9A9C;margin-bottom:8px;',
              '">Passwort</label>',
              '<input type="password" id="gate-pw" autocomplete="current-password" style="',
                'width:100%;box-sizing:border-box;',
                'background:#FAFAF7;',
                'border:1px solid #E5E2DA;',
                'color:#1A1A1C;',
                'padding:13px 16px;',
                'font-family:inherit;font-size:15px;',
                'border-radius:10px;outline:0;',
              '" />',
            '</div>',
            '<p id="gate-error" style="',
              'display:none;',
              'font-size:13px;color:#A03A2E;',
              'margin:0 0 16px;',
            '">Falsches Passwort.</p>',
            '<button type="submit" style="',
              'width:100%;padding:14px;',
              'background:#1A1A1C;color:#fff;',
              'border:0;border-radius:999px;',
              'font-family:inherit;font-size:14px;font-weight:500;',
              'cursor:pointer;letter-spacing:-0.005em;',
              'transition:background 0.2s;',
            '" onmouseover="this.style.background=\'#B8763A\'" onmouseout="this.style.background=\'#1A1A1C\'">',
              'Einloggen',
            '</button>',
          '</form>',
        '</div>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);
    document.documentElement.style.visibility = 'visible';
    document.getElementById('gate-pw').focus();

    document.getElementById('gate-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('gate-pw').value;
      if (input === PASS) {
        localStorage.setItem(AUTH_KEY, '1');
        overlay.remove();
      } else {
        document.getElementById('gate-error').style.display = 'block';
        document.getElementById('gate-pw').value = '';
        document.getElementById('gate-pw').focus();
      }
    });
  });
})();
