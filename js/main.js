/* =========================================================
   1. FUNGSI UNTUK TAB & MODAL (Harus di Luar Scope agar bisa dibaca 'onclick')
   ========================================================= */

// Fungsi Switch Tab Kategori
function bukaKategori(evt, namaTab) {
  const tabcontent = document.getElementsByClassName("tab-content-block");
  const tabpills = document.getElementsByClassName("tab-pill");

  for (const panel of tabcontent) {
    panel.hidden = true;
    panel.classList.remove("active-block");
  }

  for (const tab of tabpills) {
    tab.classList.remove("active");
    tab.setAttribute("aria-selected", "false");
  }

  const target = document.getElementById(namaTab);
  if (target) {
    target.hidden = false;
    target.classList.add("active-block");
  }

  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
    evt.currentTarget.setAttribute("aria-selected", "true");
  }
}

// Fungsi Buka Modal (Mendukung Gambar & PDF)
function bukaModal(judul, urlMedia, deskripsi) {
  const modalJudul = document.getElementById('modal-judul');
  const modalDesc = document.getElementById('modal-desc');
  const imgElem = document.getElementById('modal-img');
  const pdfElem = document.getElementById('modal-pdf');
  const btnView = document.getElementById('modal-btn-view');
  const btnDownload = document.getElementById('modal-btn-download');
  const modalBukti = document.getElementById('modal-bukti');

  if (modalJudul) modalJudul.innerText = judul;
  if (modalDesc) modalDesc.innerText = deskripsi;

  // Cek apakah file berupa PDF atau Gambar
  if (urlMedia && urlMedia.toLowerCase().endsWith('.pdf')) {
    if (pdfElem) {
      pdfElem.src = urlMedia;
      pdfElem.classList.remove('d-none');
    }
    if (imgElem) imgElem.classList.add('d-none');
    
    if (btnView) btnView.href = urlMedia;
    if (btnDownload) btnDownload.href = urlMedia;
    if (btnView && btnView.parentElement) btnView.parentElement.classList.remove('d-none');
  } else {
    if (imgElem) {
      imgElem.src = urlMedia;
      imgElem.classList.remove('d-none');
    }
    if (pdfElem) pdfElem.classList.add('d-none');
    if (btnView && btnView.parentElement) btnView.parentElement.classList.add('d-none');
  }

  if (modalBukti) modalBukti.style.display = 'flex';
}

// Fungsi Tutup Modal
function tutupModalDirect() {
  const modalBukti = document.getElementById('modal-bukti');
  const pdfElem = document.getElementById('modal-pdf');
  if (modalBukti) modalBukti.style.display = 'none';
  if (pdfElem) pdfElem.src = ''; // Reset iframe
}

function tutupModal(event) {
  if (event.target.id === 'modal-bukti') {
    tutupModalDirect();
  }
}


/* =========================================================
   2. INTERAKSI HALAMAN (DIJALANKAN SETELAH DOM SIAP)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

    /* --- A. TYPING EFFECT (EFEK MENGETIK) --- */
    const typedTextSpan = document.getElementById('typed-text');
    
    // Daftar kata/peran yang akan ditampilkan bergantian
    const roles = ['Web Developer', 'UI/UX Designer', 'Frontend Specialist'];
    
    const typingSpeed = 100;     // Kecepatan mengetik (ms)
    const erasingSpeed = 50;     // Kecepatan menghapus (ms)
    const newTextDelay = 1500;    // Jeda sebelum mulai menghapus (ms)
    
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (typedTextSpan && charIndex < roles[roleIndex].length) {
            typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (typedTextSpan && charIndex > 0) {
            typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            roleIndex++;
            if (roleIndex >= roles.length) roleIndex = 0;
            setTimeout(type, typingSpeed + 300);
        }
    }

    // Jalankan efek mengetik jika elemen ditemukan
    if (typedTextSpan) {
        setTimeout(type, 500);
    }


    /* --- B. ACTIVE NAVBAR HIGHLIGHT ON SCROLL --- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // Offset untuk navbar fixed
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

});