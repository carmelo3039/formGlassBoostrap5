const $ = (id) => document.getElementById(id);
const form = $('form');
const success = $('success');

const setState = (input, msg = '') => {
  input.classList.toggle('is-invalid', !!msg);
  input.classList.toggle('is-valid', !msg);
  input.parentElement.querySelector('.invalid-feedback').textContent = msg;
};

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(v);
const isStrong = (v) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);

const rules = {
  nome: (v) => v.length < 3 ? 'Nome deve ter ao menos 3 caracteres' : '',
  email: (v) => !isEmail(v) ? 'E-mail inválido' : '',
  telefone: (v) => !isPhone(v) ? 'Telefone inválido' : '',
  senha: (v) => !isStrong(v) ? 'Mín. 8 caracteres, 1 maiúscula e 1 número' : '',
  confirmar: (v) => !v || v !== $('senha').value ? 'As senhas não coincidem' : ''
};

const validateField = (id) => {
  const msg = rules[id]($(id).value.trim());
  setState($(id), msg);
  return !msg;
};

$('telefone').addEventListener('input', (e) => {
  e.target.value = e.target.value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2');
});

Object.keys(rules).forEach((id) =>
  $(id).addEventListener('blur', () => validateField(id))
);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const valid = Object.keys(rules).map(validateField).every(Boolean);

  success.classList.toggle('d-none', !valid);
  if (!valid) return;

  form.reset();
  form.querySelectorAll('.is-valid').forEach((el) => el.classList.remove('is-valid'));
  setTimeout(() => success.classList.add('d-none'), 3000);
});
