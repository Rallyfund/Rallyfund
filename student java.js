// ============================================================
// MOCK CONTACTS DATA
// ============================================================
const colors = ['#00E676', '#FFB300', '#64A0FF', '#FF6B6B', '#AB47BC', '#26C6DA', '#FF8A65', '#66BB6A', '#EF5350', '#42A5F5'];

const defaultMockContacts = [
    { name: 'John Mitchell', initials: 'JM', status: 'donated', amount: 50 },
    { name: 'Grandma Pat', initials: 'GP', status: 'donated', amount: 100 },
    { name: 'Uncle Dave', initials: 'UD', status: 'donated', amount: 75 },
    { name: 'Coach Williams', initials: 'CW', status: 'donated', amount: 50 },
    { name: 'Susan Reynolds', initials: 'SR', status: 'sent', amount: null },
    { name: 'David Kim', initials: 'DK', status: 'donated', amount: 25 },
    { name: 'Amy Larson', initials: 'AL', status: 'sent', amount: null },
    { name: 'Mike Torres', initials: 'MT', status: 'sent', amount: null },
    { name: 'Emily Johnson', initials: 'EJ', status: 'donated', amount: 35 },
    { name: 'Robert Chen', initials: 'RC', status: 'sent', amount: null },
    { name: 'Lisa Park', initials: 'LP', status: 'queued', amount: null },
    { name: 'Pastor Mills', initials: 'PM', status: 'donated', amount: 200 },
    { name: 'Principal Davis', initials: 'PD', status: 'sent', amount: null },
    { name: 'Aunt Carol', initials: 'AC', status: 'sent', amount: null },
    { name: 'Neighbor Bob', initials: 'NB', status: 'queued', amount: null },
    { name: 'Mr. Thompson', initials: 'MT', status: 'donated', amount: 50 },
    { name: 'Coach Sanders', initials: 'CS', status: 'sent', amount: null },
    { name: 'Family Friend Joe', initials: 'FJ', status: 'sent', amount: null },
    { name: 'Grandpa Ed', initials: 'GE', status: 'donated', amount: 75 },
    { name: 'Sarah Mitchell', initials: 'SM', status: 'sent', amount: null },
    { name: 'Dr. Ramirez', initials: 'DR', status: 'donated', amount: 100 },
    { name: 'Youth Pastor Tim', initials: 'YP', status: 'queued', amount: null },
    { name: 'Mrs. Jenkins', initials: 'MJ', status: 'sent', amount: null },
    { name: 'Uncle Carlos', initials: 'UC', status: 'donated', amount: 25 },
    { name: 'Team Mom Linda', initials: 'TL', status: 'sent', amount: null },
];

let mockContacts = [];
try {
    const stored = localStorage.getItem('rallyfund_contacts');
    mockContacts = stored ? JSON.parse(stored) : [...defaultMockContacts];
} catch (e) {
    mockContacts = [...defaultMockContacts];
}

function saveContacts() {
    localStorage.setItem('rallyfund_contacts', JSON.stringify(mockContacts));
}

// ============================================================
// RENDER CONTACTS
// ============================================================
function renderContacts(filter = 'all', search = '') {
    const list = document.getElementById('contactList');
    if (!list) return;

    let filtered = [...mockContacts];
    if (filter !== 'all') filtered = filtered.filter(c => c.status === filter);
    if (search) filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    const statusLabels = { donated: '✓ Donated', sent: '📤 Message sent', queued: '⏰ Queued by AI' };
    const statusColors = { donated: 'var(--green)', sent: 'var(--muted)', queued: 'var(--gold)' };

    list.innerHTML = filtered.map((c, i) => {
        const color = colors[i % colors.length];
        // Local AI Heuristics: Display a dynamic send time for queued contacts
        let timeText = '⏰ Queued by AI';
        if (c.status === 'queued') {
            timeText = c.optimal_send_time || '⏰ Today, 5:30 PM';
        }

        let actionBtn = '';
        if (c.status === 'queued') {
            actionBtn = `<button class="btn btn-secondary btn-sm" onclick="sendSMSMessage(${i})" style="padding: 4px 8px; font-size: 0.75rem;">💬 Send Now</button>`;
        }

        return `
      <div class="cl-item">
        <div class="cl-avatar" style="background:${color}">${c.initials}</div>
        <div style="flex:1;min-width:0">
          <div class="cl-name">${c.name}</div>
          <div class="cl-status" style="color:${statusColors[c.status]}">
            ${c.status === 'queued' ? timeText : statusLabels[c.status]}
          </div>
        </div>
        <div class="cl-amount" style="color:${c.amount ? 'var(--green)' : 'var(--muted)'}; display:flex; align-items:center; gap:10px;">
          ${actionBtn}
          ${c.amount ? '$' + c.amount : (c.status !== 'queued' ? '—' : '')}
        </div>
      </div>
    `;
    }).join('');

    if (filtered.length === 0) {
        list.innerHTML = '<p class="text-muted" style="padding:20px;text-align:center;font-size:0.85rem">No contacts found.</p>';
    }
}

// ============================================================
// PROGRESS RING ANIMATION
// ============================================================
function animateRing(raised, goal) {
    const circumference = 2 * Math.PI * 80; // r=80
    const pct = Math.min(raised / goal, 1);
    const offset = circumference * (1 - pct);

    // Inject gradient def
    const svg = document.querySelector('.progress-ring');
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#00E676"/>
      <stop offset="100%" stop-color="#FFB300"/>
    </linearGradient>
  `;
    svg.insertBefore(defs, svg.firstChild);

    const ring = document.getElementById('ringFill');
    if (!ring) return;
    ring.style.strokeDasharray = circumference;
    setTimeout(() => { ring.style.strokeDashoffset = offset; }, 200);
}

function animateCounter(id, target, prefix = '') {
    const el = document.getElementById(id);
    if (!el) return;
    let cur = 0;
    const step = target / 60;
    const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = prefix + Math.floor(cur).toLocaleString();
    }, 16);
}

// ============================================================
// CONTACT MODAL
// ============================================================
function showModal() {
    document.getElementById('addContactModal').style.display = 'flex';
    document.getElementById('manualAddForm').style.display = 'none';
    document.getElementById('syncSimulation').style.display = 'none';
}
function hideModal() {
    document.getElementById('addContactModal').style.display = 'none';
}

async function handleSyncContacts() {
    const sim = document.getElementById('syncSimulation');
    const maf = document.getElementById('manualAddForm');
    const statusEl = document.getElementById('syncStatus');

    maf.style.display = 'none';
    sim.style.display = 'block';

    // Check if running in Native App via Capacitor
    const isNative = window.Capacitor && window.Capacitor.isNativePlatform();

    if (isNative) {
        try {
            statusEl.textContent = 'Requesting Contacts Permission (iOS/Android)...';

            // Assume the Capacitor Contacts plugin is loaded globally via a script tag or bundler in the final app
            const Contacts = window.Contacts || Capacitor.Plugins.Contacts;

            if (!Contacts) {
                throw new Error("Contacts plugin not found. Falling back to simulation.");
            }

            const permission = await Contacts.requestPermissions();
            if (permission.contacts !== 'granted') {
                statusEl.textContent = '❌ Permission denied.';
                setTimeout(hideModal, 2000);
                return;
            }

            statusEl.textContent = 'Scanning Phone Contacts...';
            const result = await Contacts.getContacts({
                projection: { name: true, phones: true }
            });

            // Filter out contacts without phone numbers
            const validContacts = result.contacts.filter(c => c.phones && c.phones.length > 0);

            statusEl.textContent = `Processing ${validContacts.length} contacts via AI...`;

            // Here we would POST validContacts to our backend: /api/contacts/sync
            // For now, we simulate the backend insertion into our mock array
            setTimeout(() => {
                validContacts.slice(0, 10).forEach(c => {
                    const name = c.name?.display || 'Unknown';
                    const initials = name.substring(0, 2).toUpperCase();
                    // Calculate optimal send time using local JS heuristics (simulated for demo)
                    const times = ['Today, 5:30 PM', 'Today, 6:15 PM', 'Tomorrow, 5:45 PM'];
                    const optimal_send_time = `⏰ ${times[Math.floor(Math.random() * times.length)]}`;

                    mockContacts.unshift({ name, initials, status: 'queued', amount: null, optimal_send_time, phone: c.phones[0]?.value });
                });
                saveContacts();
                renderContacts('all');
                hideModal();
                showToast(`Successfully synced ${validContacts.length} contacts!`, 'Native iOS/Android Address Book Imported.');
            }, 1000);

        } catch (error) {
            console.warn('Native sync failed, falling back to mock.', error);
            runSimulation();
        }
    } else {
        // Web Browser Fallback
        runSimulation();
    }

    function runSimulation() {
        const steps = ['Scanning contacts (Web Fallback)...', 'Found 312 contacts', 'Filtering duplicates...', 'Importing 284 new contacts...', '✅ Done! 284 contacts added.'];
        let i = 0;
        const timer = setInterval(() => {
            statusEl.textContent = steps[i];
            i++;
            if (i >= steps.length) {
                clearInterval(timer);
                setTimeout(() => {
                    // Simulate adding 3 mock contacts to see UI update
                    mockContacts.unshift(
                        { name: 'Aunt Mary', initials: 'AM', status: 'queued', amount: null, optimal_send_time: '⏰ Today, 6:00 PM' },
                        { name: 'Coach Miller', initials: 'CM', status: 'queued', amount: null, optimal_send_time: '⏰ Tomorrow, 5:15 PM' },
                        { name: 'Dr. Stevens', initials: 'DS', status: 'queued', amount: null, optimal_send_time: '⏰ Today, 7:30 PM' }
                    );
                    saveContacts();
                    renderContacts('all');

                    hideModal();
                    showToast('284 contacts synced!', 'Your AI messages are being scheduled.');
                }, 700);
            }
        }, 800);
    }
}

// ============================================================
// SEND LOGIC (NATIVE SMS DEEP LINK + JS HEURISTICS)
// ============================================================
window.sendSMSMessage = function (index) {
    const contact = mockContacts[index];
    if (!contact || contact.status !== 'queued') return;

    // Heuristic message variation - rotate between optimized variants without a backend API
    const templates = [
        "Hey {name}! Lincoln Football needs your support. We're raising money for our team travel. Help us hit our goal: rallyfund.hq/lincoln",
        "Hi {name}, it's Jake! We are fundraising for Lincoln High Football gear. Any contribution helps! rallyfund.hq/lincoln",
        "Hey {name}! I'm raising money for Lincoln Football this season. Takes 2 mins to donate here: rallyfund.hq/lincoln"
    ];

    // Dynamically insert first name
    const firstName = contact.name.split(' ')[0];
    const msg = templates[Math.floor(Math.random() * templates.length)].replace('{name}', firstName);

    // Fallback phone number for demo mode
    const phone = contact.phone || '1234567890';

    // Setup Native SMS Deep Link URI
    // iOS requires '&body=' generally, Android handles '?body=' best in some cases, but ?body= works mostly universally
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const separator = isIOS ? '&' : '?';
    window.location.href = `sms:${phone}${separator}body=${encodeURIComponent(msg)}`;

    // Assume sent locally, update state
    contact.status = 'sent';
    saveContacts();
    renderContacts('all');
    showToast(`Message sent to ${contact.name}!`, 'Native SMS app launched.');
};
function showToast(msg, sub) {
    let toast = document.querySelector('.success-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'success-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<span style="font-size:1.3rem">⚡</span><div><div class="toast-text">${msg}</div><div class="toast-sub text-muted" style="font-size:0.78rem">${sub}</div></div>`;
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => { toast.classList.remove('show'); }, 3500);
}

// ============================================================
// ONBOARDING
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('onboardingOverlay');
    const app = document.getElementById('studentApp');

    // Show app after brief delay (for demo, skip real auth)
    document.getElementById('onboardForm').addEventListener('submit', (e) => {
        e.preventDefault();
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.4s';
        setTimeout(() => {
            overlay.style.display = 'none';
            app.style.display = 'block';
            app.style.animation = 'fadeIn 0.5s ease';
            initApp();
        }, 400);
    });
});

function initApp() {
    // Render contacts
    renderContacts('all');

    // Animate ring ($420 of $500)
    animateRing(420, 500);

    // Animate counters
    setTimeout(() => {
        animateCounter('ringAmount', 420, '$');
        animateCounter('stat-donors', 14);
        animateCounter('stat-contacts', 48);
        animateCounter('stat-sent', 48);
    }, 400);

    // Contact filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderContacts(btn.dataset.filter, document.getElementById('contactSearch').value);
        });
    });

    // Contact search
    document.getElementById('contactSearch').addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        renderContacts(activeFilter, e.target.value);
    });

    // Add contact button
    document.getElementById('addContactBtn').addEventListener('click', showModal);
    document.getElementById('addContactClose').addEventListener('click', hideModal);
    document.getElementById('addContactModal').addEventListener('click', (e) => {
        if (e.target.id === 'addContactModal') hideModal();
    });

    // Sync phone
    document.getElementById('syncPhoneBtn').addEventListener('click', handleSyncContacts);

    // Manual add
    document.getElementById('syncManualBtn').addEventListener('click', () => {
        document.getElementById('manualAddForm').style.display = 'flex';
        document.getElementById('syncSimulation').style.display = 'none';
    });

    document.getElementById('saveContactBtn').addEventListener('click', () => {
        const name = document.getElementById('new-contact-name').value.trim();
        if (!name) return;
        const initials = name.split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2);

        // Local JS Heuristics: Assign an optimal send time locally
        const optimal_send_time = '⏰ Today, 5:45 PM';
        mockContacts.unshift({ name, initials, status: 'queued', amount: null, optimal_send_time });
        saveContacts();
        renderContacts('all');
        hideModal();
        showToast(`${name} added!`, 'AI will schedule their message.');
    });
}
