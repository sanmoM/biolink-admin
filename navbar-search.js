/**
 * Navbar Global Search — Quick Navigation
 */

(function () {
    const PAGES = [
        {
            title: 'Dashboard',
            description: 'Overview, stats, and recent activity',
            href: 'dashboard.html',
            icon: 'assets/dashboard.svg',
            keywords: ['dashboard', 'overview', 'stats', 'analytics', 'traffic', 'revenue', 'clicks'],
        },
        {
            title: 'Bio Links',
            description: 'Manage your bio link pages',
            href: 'biolink.html',
            icon: 'assets/biolink-icon.svg',
            keywords: ['bio', 'biolink', 'link in bio', 'profile', 'pages'],
        },
        {
            title: 'Shortened Links',
            description: 'Create and manage short URLs',
            href: 'shortened.html',
            icon: 'assets/shortened.svg',
            keywords: ['short', 'shortened', 'url', 'link', 'redirect'],
        },
        {
            title: 'QR Codes',
            description: 'Generate and manage QR codes',
            href: 'qr-codes.html',
            icon: 'assets/qrcode.svg',
            keywords: ['qr', 'qrcode', 'code', 'scan', 'dynamic', 'static'],
        },
        {
            title: 'File Links',
            description: 'Share files via links',
            href: 'filelinks.html',
            icon: 'assets/file.svg',
            keywords: ['file', 'files', 'upload', 'download', 'pdf', 'document'],
        },
        {
            title: 'Event Links',
            description: 'Manage event pages and RSVPs',
            href: 'eventlinks.html',
            icon: 'assets/event.svg',
            keywords: ['event', 'events', 'rsvp', 'calendar', 'ticket'],
        },
        {
            title: 'Static Sites',
            description: 'Manage your hosted static sites',
            href: 'staticsite.html',
            icon: 'assets/static.svg',
            keywords: ['static', 'site', 'website', 'landing', 'page'],
        },
        {
            title: 'V-Cards',
            description: 'Create digital business cards',
            href: 'v-card.html',
            icon: 'assets/vcard.svg',
            keywords: ['vcard', 'v-card', 'business card', 'contact', 'digital card'],
        },
        {
            title: 'Link Statistics',
            description: 'View click analytics and reports',
            href: 'links-statistics.html',
            icon: 'assets/statistics.svg',
            keywords: ['statistics', 'stats', 'analytics', 'clicks', 'reports'],
        },
        {
            title: 'Directory',
            description: 'Manage team members and permissions',
            href: 'directory.html',
            icon: 'assets/directory.svg',
            keywords: ['directory', 'team', 'members', 'workspace', 'permissions', 'invite'],
        },
        {
            title: 'Data Management',
            description: 'Export, import, and backup your data',
            href: 'datamanage.html',
            icon: 'assets/data.svg',
            keywords: ['data', 'export', 'import', 'backup', 'csv', 'json'],
        },
        {
            title: 'Notifications',
            description: 'Manage your notification settings',
            href: 'notification.html',
            icon: 'assets/notification.svg',
            keywords: ['notification', 'alerts', 'email', 'sms', 'push'],
        },
        {
            title: 'Settings',
            description: 'Account, security, and app settings',
            href: 'settings.html',
            icon: 'assets/settings.svg',
            keywords: ['settings', 'account', 'security', 'password', 'profile', 'plan'],
        },
    ];

    /* Build and attach a dropdown to a given input element inside a wrapper */
    function attachSearch(input, getWrapper) {
        const wrapper = getWrapper();
        if (!wrapper) return;

        // Avoid double-init
        if (wrapper.querySelector('.gs-dropdown')) return;

        const dropdown = document.createElement('div');
        dropdown.className =
            'gs-dropdown absolute left-0 right-0 top-[calc(100%+6px)] z-[9999] bg-[#18191d] border border-white/10 rounded-xl shadow-2xl overflow-hidden hidden';
        wrapper.style.position = 'relative';
        wrapper.appendChild(dropdown);

        let activeIndex = -1;

        function render(results) {
            dropdown.innerHTML = '';
            activeIndex = -1;

            if (results.length === 0) {
                dropdown.innerHTML = `
                    <div class="px-4 py-5 text-center text-sm text-gray-500">
                        <i class="fas fa-search mb-2 text-lg block"></i>
                        No results found
                    </div>`;
                dropdown.classList.remove('hidden');
                return;
            }

            results.slice(0, 7).forEach((page, idx) => {
                const item = document.createElement('a');
                item.href = page.href;
                item.dataset.index = idx;
                item.className =
                    'flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer group border-b border-white/5 last:border-0';
                item.innerHTML = `
                    <div class="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#FACC15]/10 transition-colors">
                        <img src="${page.icon}" alt="${page.title}" class="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" onerror="this.style.display='none'">
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="text-sm font-semibold text-white truncate">${page.title}</div>
                        <div class="text-xs text-gray-500 truncate">${page.description}</div>
                    </div>
                    <i class="fas fa-arrow-right text-xs text-gray-600 group-hover:text-[#FACC15] transition-colors"></i>`;
                dropdown.appendChild(item);
            });

            dropdown.classList.remove('hidden');
        }

        function setActive(idx) {
            dropdown.querySelectorAll('a').forEach((el, i) => {
                el.classList.toggle('bg-white/5', i === idx);
                el.classList.toggle('!border-[#FACC15]/20', i === idx);
            });
        }

        function search(query) {
            const q = query.toLowerCase().trim();
            if (!q) { dropdown.classList.add('hidden'); return; }
            render(PAGES.filter(page =>
                page.title.toLowerCase().includes(q) ||
                page.description.toLowerCase().includes(q) ||
                page.keywords.some(k => k.includes(q))
            ));
        }

        input.addEventListener('input', e => search(e.target.value));
        input.addEventListener('focus', () => { if (input.value.trim()) search(input.value); });
        input.addEventListener('keydown', e => {
            const items = dropdown.querySelectorAll('a');
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = Math.min(activeIndex + 1, items.length - 1);
                setActive(activeIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = Math.max(activeIndex - 1, 0);
                setActive(activeIndex);
            } else if (e.key === 'Enter') {
                if (activeIndex >= 0 && items[activeIndex]) items[activeIndex].click();
            } else if (e.key === 'Escape') {
                dropdown.classList.add('hidden');
                input.blur();
            }
        });

        document.addEventListener('click', e => {
            if (!wrapper.contains(e.target)) dropdown.classList.add('hidden');
        });
    }

    function init() {
        // ── Desktop search ──────────────────────────────────────────────
        const desktopInput = document.getElementById('global-search');
        if (desktopInput) {
            attachSearch(desktopInput, () => desktopInput.closest('.relative'));
        }

        // ── Mobile search ───────────────────────────────────────────────
        const mobileBtn = document.getElementById('mobile-search-btn');
        const mobilePanel = document.getElementById('mobile-search-panel');
        const mobileInput = document.getElementById('mobile-search');

        if (mobileBtn && mobilePanel && mobileInput) {
            // Toggle the slide-down panel
            mobileBtn.addEventListener('click', () => {
                const isHidden = mobilePanel.classList.contains('hidden');
                mobilePanel.classList.toggle('hidden', !isHidden);
                if (isHidden) {
                    // Small delay ensures the element is visible before focus
                    setTimeout(() => mobileInput.focus(), 50);
                } else {
                    mobileInput.value = '';
                    const dd = mobilePanel.querySelector('.gs-dropdown');
                    if (dd) dd.classList.add('hidden');
                }
            });

            attachSearch(mobileInput, () => mobilePanel.querySelector('.mobile-search-wrapper'));
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
