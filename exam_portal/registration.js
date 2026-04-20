// ── Student Registration JS ───────────────────────────────────
let phoneVerified = false;
let emailVerified = false;
let phoneTimerInterval, emailTimerInterval;

// ── OTP cell auto-advance ────────────────────────────────────
function initOtpCells(groupId) {
  const cells = document.querySelectorAll(`#${groupId} .otp-cell`);
  cells.forEach((cell, i) => {
    cell.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '');
      if (this.value && i < cells.length - 1) cells[i + 1].focus();
    });
    cell.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !this.value && i > 0) cells[i - 1].focus();
    });
  });
}

initOtpCells('phoneOtpFields');
initOtpCells('emailOtpFields');

// ── Countdown helper ─────────────────────────────────────────
function startCountdown(spanId, clearFn) {
  clearFn();
  let secs = 60;
  document.getElementById(spanId).textContent = secs;
  return setInterval(() => {
    secs--;
    const el = document.getElementById(spanId);
    if (el) el.textContent = secs;
    if (secs <= 0) clearInterval(phoneTimerInterval);
  }, 1000);
}

// ── Phone OTP ────────────────────────────────────────────────
function sendPhoneOTP() {
  const phone = document.getElementById('phoneInput').value.trim();
  if (phone.length !== 10 || !/^\d+$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }
  document.getElementById('phoneDisplay').textContent = '+91 ' + phone;
  document.getElementById('phoneOtpPanel').classList.add('active');
  document.getElementById('sendPhoneBtn').disabled = true;
  phoneTimerInterval = startCountdown('phoneTimer', () => clearInterval(phoneTimerInterval));
  alert('OTP sent to +91 ' + phone + ' (Demo: use any 6 digits)');
}

function verifyPhoneOTP() {
  const otp = [...document.querySelectorAll('#phoneOtpFields .otp-cell')].map(c => c.value).join('');
  if (otp.length !== 6) { alert('Please enter the 6-digit OTP.'); return; }
  phoneVerified = true;
  document.getElementById('phoneOtpPanel').classList.remove('active');
  document.getElementById('phoneVerifiedBadge').style.display = 'inline-flex';
  clearInterval(phoneTimerInterval);
}

// ── Email OTP ────────────────────────────────────────────────
function sendEmailOTP() {
  const email = document.getElementById('emailInput').value.trim();
  if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
  document.getElementById('emailDisplay').textContent = email;
  document.getElementById('emailOtpPanel').classList.add('active');
  document.getElementById('sendEmailBtn').disabled = true;
  emailTimerInterval = startCountdown('emailTimer', () => clearInterval(emailTimerInterval));
  alert('OTP sent to ' + email + ' (Demo: use any 6 digits)');
}

function verifyEmailOTP() {
  const otp = [...document.querySelectorAll('#emailOtpFields .otp-cell')].map(c => c.value).join('');
  if (otp.length !== 6) { alert('Please enter the 6-digit OTP.'); return; }
  emailVerified = true;
  document.getElementById('emailOtpPanel').classList.remove('active');
  document.getElementById('emailVerifiedBadge').style.display = 'inline-flex';
  clearInterval(emailTimerInterval);
}

// ── Submit ───────────────────────────────────────────────────
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (!phoneVerified && !emailVerified) {
    alert('Please verify at least one contact method (Phone or Email) before registering.');
    return;
  }
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Registering…';
  btn.disabled = true;

  setTimeout(() => {
    alert('Registration successful! Redirecting to login…');
    window.location.href = 'index.html';
  }, 1600);
});
