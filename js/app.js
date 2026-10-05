// Cache internal data proyek
let projectsCache = [];

// Fungsi pembantu pembuatan elemen dengan pengisian teks aman (Mencegah DOM XSS)
function createSafeElement(tag, className, textContent = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent; // Menggunakan textContent untuk sanitasi otomatis
  return el;
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadProfileData();
  await loadProjectsData();
  await loadServicesData();
  setupFormHandler();
});

// 1. Pemuatan Data Profil Dinamis
async function loadProfileData() {
  try {
    const profile = await APIService.fetchProfile();
    
    // Injeksi elemen jika elemen ID tersedia
    const cardName = document.getElementById('card-name');
    const cardNim = document.getElementById('card-nim');
    const cardProdi = document.getElementById('card-prodi');
    const cardCampus = document.getElementById('card-campus');
    const cardInterests = document.getElementById('card-interests');

    if (cardName) cardName.textContent = profile.name;
    if (cardNim) cardNim.textContent = profile.nim;
    if (cardProdi) cardProdi.textContent = profile.prodi;
    if (cardCampus) cardCampus.textContent = profile.campus;
    if (cardInterests) cardInterests.textContent = profile.interests;

    const profileStatus = document.getElementById('profile-status');
    if (profileStatus) profileStatus.textContent = profile.status;

    const contactEmail = document.getElementById('contact-email');
    const contactLoc = document.getElementById('contact-location');
    const contactGithub = document.getElementById('contact-github');

    if (contactEmail && profile.contact) contactEmail.textContent = profile.contact.email;
    if (contactLoc && profile.contact) contactLoc.textContent = profile.contact.location;
    if (contactGithub && profile.contact) contactGithub.textContent = profile.contact.github;

  } catch (err) {
    console.warn('Profile sync fallback active:', err.message);
  }
}

// 2. Pemuatan Proyek dengan Pengelolaan 4 Status UI
async function loadProjectsData() {
  const loadingEl = document.getElementById('projects-loading');
  const emptyEl = document.getElementById('projects-empty');
  const containerEl = document.getElementById('projects-container');
  const errorEl = document.getElementById('error-container');

  // Status UI 1: Loading (Tampilkan Spinner, Sembunyikan Lainnya)
  loadingEl.classList.remove('d-none');
  emptyEl.classList.add('d-none');
  errorEl.classList.add('d-none');
  containerEl.innerHTML = '';

  try {
    const projects = await APIService.fetchProjects();
    projectsCache = projects;
    
    // Sembunyikan Loading setelah berhasil
    loadingEl.classList.add('d-none');

    // Status UI 3: Empty (Jika data kosong)
    if (!projects || projects.length === 0) {
      emptyEl.classList.remove('d-none');
      return;
    }

    // Status UI 2: Success (Render Kartu Proyek)
    projects.forEach((proj) => {
      const article = document.createElement('article');
      article.className = 'project-card';

      // Gambar & Badge
      const imgBox = document.createElement('div');
      imgBox.className = 'project-img-box';

      const badge = createSafeElement('span', 'card-badge', proj.category);
      const img = document.createElement('img');
      img.src = proj.image;
      img.alt = proj.title;

      imgBox.appendChild(badge);
      imgBox.appendChild(img);

      // Body Kartu
      const cardBody = document.createElement('div');
      cardBody.className = 'project-card-body d-flex flex-column';

      const title = createSafeElement('h3', '', proj.title);
      const desc = createSafeElement('p', '', proj.description);

      // Tags
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'project-tags mb-3';
      if (Array.isArray(proj.tags)) {
        proj.tags.forEach((tagText) => {
          const tagPill = createSafeElement('span', 'pill-tag', tagText);
          tagsContainer.appendChild(tagPill);
        });
      }

      // Tombol Detail Modal
      const btnDetail = createSafeElement('button', 'btn-pink mt-auto border-0 text-center', 'Lihat Detail ↗');
      btnDetail.type = 'button';
      btnDetail.style.cursor = 'pointer';
      btnDetail.addEventListener('click', () => openUniversalModal(proj.id));

      cardBody.appendChild(title);
      cardBody.appendChild(desc);
      cardBody.appendChild(tagsContainer);
      cardBody.appendChild(btnDetail);

      article.appendChild(imgBox);
      article.appendChild(cardBody);

      containerEl.appendChild(article);
    });

  } catch (err) {
    // Status UI 4: Error (Tampilkan Alert Kegagalan)
    loadingEl.classList.add('d-none');
    errorEl.textContent = `⚠️️ Gagal memuat data portofolio: ${err.message}. Silakan periksa koneksi jaringan Anda.`;
    errorEl.classList.remove('d-none');
  }
}

// 3. Pemuatan Layanan & Pengisian Dropdown Form
async function loadServicesData() {
  const selectEl = document.getElementById('layanan');
  const cardsContainer = document.getElementById('services-cards-container');

  try {
    const services = await APIService.fetchServices();

    if (selectEl) {
      selectEl.innerHTML = '<option value="" disabled selected>Pilih paket layanan konsultasi</option>';
    }
    if (cardsContainer) {
      cardsContainer.innerHTML = '';
    }

    services.forEach((srv) => {
      // 1. Populate Select Dropdown
      if (selectEl) {
        const option = document.createElement('option');
        option.value = srv.id;
        option.textContent = `${srv.name} (${srv.subtitle})`;
        selectEl.appendChild(option);
      }

      // 2. Populate Small Service Info Cards
      if (cardsContainer) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'p-3 bg-dark-subtle rounded border border-secondary-subtle';

        const title = createSafeElement('strong', 'd-block text-pink small', srv.name);
        const sub = createSafeElement('small', 'text-light-50 d-block mb-1', srv.subtitle);
        const desc = createSafeElement('small', 'text-muted d-block', srv.description);

        cardDiv.appendChild(title);
        cardDiv.appendChild(sub);
        cardDiv.appendChild(desc);
        cardsContainer.appendChild(cardDiv);
      }
    });

  } catch (err) {
    console.error('Layanan Fetch Error:', err);
  }
}

// 4. Universal Modal Renderer (Aman dari DOM XSS)
function openUniversalModal(projectId) {
  const proj = projectsCache.find((p) => p.id === projectId);
  if (!proj) return;

  const modalTitle = document.getElementById('universalModalLabel');
  const modalImg = document.getElementById('modal-image');
  const modalCat = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-description');
  const modalTech = document.getElementById('modal-tech-stack');

  // Menggunakan textContent untuk sanitasi teks
  modalTitle.textContent = proj.title;
  modalCat.textContent = proj.category;
  modalDesc.textContent = proj.description;

  if (proj.image) {
    modalImg.src = proj.image;
    modalImg.classList.remove('d-none');
  } else {
    modalImg.classList.add('d-none');
  }

  modalTech.innerHTML = '';
  if (Array.isArray(proj.tags)) {
    proj.tags.forEach((tagText) => {
      const badge = createSafeElement('span', 'badge bg-secondary', tagText);
      modalTech.appendChild(badge);
    });
  }

  const bsModal = new bootstrap.Modal(document.getElementById('universalModal'));
  bsModal.show();
}

// 5. Penanganan Formulir Asinkron & Storage LocalStorage
function setupFormHandler() {
  const form = document.getElementById('service-form');
  const btnSubmit = document.getElementById('btn-submit-service');
  const btnSpinner = document.getElementById('btn-spinner');
  const btnText = document.getElementById('btn-text');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Mencegah Full Page Reload

    const namaVal = document.getElementById('nama').value.trim();
    const emailVal = document.getElementById('email').value.trim();
    const telpVal = document.getElementById('telepon').value.trim();
    const layananVal = document.getElementById('layanan').value;
    const mediaVal = document.getElementById('media').value;
    const durasiVal = document.getElementById('durasi').value;
    const pesanVal = document.getElementById('pesan').value.trim();
    const setujuVal = document.getElementById('setuju').checked;

    if (!namaVal || !emailVal || !telpVal || !layananVal || !mediaVal || !durasiVal || !pesanVal || !setujuVal) {
      alert('Harap lengkapi seluruh isian formulir dan setujui syarat pengiriman.');
      return;
    }

    // Ubah status tombol menjadi Loading
    btnSubmit.disabled = true;
    btnSpinner.classList.remove('d-none');
    btnText.textContent = ' Memproses...';

    // Simulasi Proses Jaringan Asinkron (1 Detik)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Objek Data Pesanan
    const newOrder = {
      orderId: `ORD-${Date.now()}`,
      clientName: namaVal,
      email: emailVal,
      phone: telpVal,
      serviceId: layananVal,
      media: mediaVal,
      durationHours: durasiVal,
      message: pesanVal,
      submittedAt: new Date().toISOString()
    };

    // Simpan ke localStorage
    const savedOrders = JSON.parse(localStorage.getItem('margareth_orders') || '[]');
    savedOrders.push(newOrder);
    localStorage.setItem('margareth_orders', JSON.stringify(savedOrders));

    // Reset tombol & form
    btnSubmit.disabled = false;
    btnSpinner.classList.add('d-none');
    btnText.textContent = 'Kirim Pesan ↗';
    form.reset();

    // Tampilkan Notifikasi Bootstrap Toast
    const toastEl = document.getElementById('liveToast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = `Terima kasih ${namaVal}, pesanan layanan berhasil disimpan secara lokal!`;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  });
}