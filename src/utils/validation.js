// Pengesahan input (input validation) untuk borang resepi.
// Mesej ralat mengikut mockup "Semakan ralat".
export function validateRecipe({ name, category, minutes, ingredients, steps }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = 'Nama resepi wajib diisi';
  else if (name.trim().length < 3) errors.name = 'Nama resepi terlalu pendek (min. 3 huruf)';

  if (!category) errors.category = 'Sila pilih satu kategori';

  const n = Number(String(minutes).trim());
  if (!String(minutes).trim()) errors.minutes = 'Masa memasak wajib diisi';
  else if (!Number.isInteger(n) || n <= 0) errors.minutes = 'Masa mesti nombor > 0';
  else if (n > 1440) errors.minutes = 'Masa tidak boleh melebihi 1440 minit';

  if (!ingredients || !ingredients.trim()) errors.ingredients = 'Bahan-bahan wajib diisi';
  if (!steps || !steps.trim()) errors.steps = 'Langkah memasak wajib diisi';

  return { errors, isValid: Object.keys(errors).length === 0 };
}

// Pecah teks berbilang baris kepada senarai (buang baris kosong & nombor "1." di depan)
export const toLines = (text = '') =>
  text
    .split('\n')
    .map((l) => l.replace(/^\s*\d+[.)]\s*/, '').trim())
    .filter(Boolean);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignUp({ name, email, password }) {
  const errors = {};
  if (!name || name.trim().length < 3) {
    errors.name = 'Nama penuh mesti sekurang-kurangnya 3 aksara';
  }
  if (!email || !emailPattern.test(email.trim())) {
    errors.email = 'Masukkan alamat e-mel yang sah';
  }
  if (!password) {
    errors.password = 'Kata laluan wajib diisi';
  } else if (password.length < 8) {
    errors.password = 'Kata laluan mesti sekurang-kurangnya 8 aksara';
  }
  return { errors, isValid: Object.keys(errors).length === 0 };
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email || !emailPattern.test(email.trim())) {
    errors.email = 'Masukkan alamat e-mel yang sah';
  }
  if (!password) {
    errors.password = 'Kata laluan wajib diisi';
  }
  return { errors, isValid: Object.keys(errors).length === 0 };
}
