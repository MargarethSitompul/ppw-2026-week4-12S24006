/**
 * Service pemanggilan API/Data menggunakan Fetch API & async/await.
 */
const APIService = {
  async fetchProjects() {
    const response = await fetch('./data/projects.json');
    if (!response.ok) {
      throw new Error(`Gagal mengambil data proyek (HTTP Status: ${response.status})`);
    }
    return await response.json();
  },

  async fetchServices() {
    const response = await fetch('./data/services.json');
    if (!response.ok) {
      throw new Error(`Gagal mengambil data layanan (HTTP Status: ${response.status})`);
    }
    return await response.json();
  },

  async fetchProfile() {
    const response = await fetch('./data/profile.json');
    if (!response.ok) {
      throw new Error(`Gagal mengambil data profil (HTTP Status: ${response.status})`);
    }
    return await response.json();
  }
};