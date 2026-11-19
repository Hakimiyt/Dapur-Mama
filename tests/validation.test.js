const fs = require('fs');
const path = require('path');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const source = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'utils', 'validation.js'),
    'utf8'
  );
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
  const { validateSignUp, validateLogin, validateRecipe } = await import(moduleUrl);

  const validSignUp = validateSignUp({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '12345678',
  });
  assert(validSignUp.isValid, 'Pendaftaran yang sah ditolak');

  const invalidSignUp = validateSignUp({
    name: 'a',
    email: 'bukan-email',
    password: '123',
  });
  assert(!invalidSignUp.isValid, 'Pendaftaran tidak sah diterima');

  const invalidLogin = validateLogin({ email: 'bukan-email', password: '' });
  assert(!invalidLogin.isValid, 'Log masuk tidak sah diterima');

  const invalidRecipe = validateRecipe({
    name: '',
    category: '',
    minutes: '-5',
    ingredients: '',
    steps: '',
  });
  assert(!invalidRecipe.isValid, 'Resepi tidak sah diterima');

  console.log('[DapurMama] 4 ujian pengesahan input lulus');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
