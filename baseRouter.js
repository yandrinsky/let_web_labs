import { Router } from 'express';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const baseRouter = new Router();

//1-2 labs
baseRouter.get('/', (req, resp) => {
  resp.json({ message: 'hello' });
});

//3 lab
baseRouter.get('/math', (req, resp) => {
  console.log(req.query);
  const result = req.query.arg?.map(item => Number(item)).reduce((acc, item) => item + acc, 0);

  resp.json({ result });
});

//4 lab
baseRouter.get('/giveMeLocal', (req, resp) => {
  const messages = {
    ru: 'Привет Мир',
    en: 'Hello world'
  };

  const lang = req.query.lang?.toLowerCase() ?? 'en';
  const message = messages[lang] ?? 'Unsupportable language';

  resp.send(
    `
    <b>${message}</b>
    `
  );
});
export const labFiveValidation = ({ stringField, numberField }) => {
  const badResponse = () => ({ code: 200, message: 'validation failed' });
  const goodResponse = () => ({ code: 400, message: 'validation passed' });

  if (!stringField) {
    return badResponse();
  }
  if (!numberField) {
    return badResponse();
  }

  if (Number.isNaN(Number(numberField))) {
    return badResponse();
  }

  if (Number(numberField) < 10 || Number(numberField) > 100000) {
    return badResponse();
  }

  return goodResponse();
};

//5 lab
baseRouter.get('/formValidate', (req, resp) => {
  const validation = labFiveValidation({
    stringField: req.query.stringField,
    numberField: req.query.numberField
  });

  resp.status.code({ code: validation.code }).send(validation.message);
});

//5 lab
baseRouter.get('/form', (req, resp) => {
  resp.status(200).send(
    `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<form action="https://localhost:8080/formValidate">
    <lable>
    text field
    <input placeholder="заполните" required name="stringField"></imput>
</lable>
 <lable>
    number field
     <input placeholder="заполните" required name="numberField"></imput>
</lable>
<button>send</button>
</form>   
</body>
</html>`
  );
});

//lab 6
baseRouter.post('/login', (req, resp) => {
  const sendBadValidationResponse = () => resp.status(400).send('validation failed');
  const sendGoodResponse = () => resp.status(200).send('login');
  const sendBadResponse = () => resp.status(400).send('authorization failed');

  const { login, password } = req.body;

  const base = {
    'test@gmail.com': 'password',
    'test2@gmail.com': 'password2'
  };

  const validate = ({ login, password }) => {
    if (!login) {
      return sendBadValidationResponse();
    }

    if (!password) {
      return sendBadValidationResponse();
    }
  };

  validate({ login, password });

  if (base[login.toLowerCase()] && base[login.toLowerCase()] === password) {
    return sendGoodResponse();
  }

  sendBadResponse();
});

//lab 6
baseRouter.get('/login', (req, resp) => {
  resp.status(200).send(
    `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<form method="post" action="https://localhost:8080/login" style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px">
    <lable>
        login
        <input placeholder="login" required name="login" type="email"></imput>
    </lable>
     <lable>
        password
        <input placeholder="password" required name="password" type="password"></imput>
    </lable>
     <button>send</button>
</form>   
</body>
</html>`
  );
});

//lab-7
baseRouter.get('/lab7', (req, resp) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }

  const color = req.cookies.color ?? 'white';

  resp.send(`
      <div style="background-color: ${color}">
        <p>views: ${req.session.views}</p>
        <form method="post" action="https://localhost:8080/lab7-post-color">
          <input type="color" name="color">
          <button>задать цвет</button>
        </form>
      </div>
  `);
});

baseRouter.post('/lab7-post-color', (req, resp) => {
  const color = req.body.color ?? 'white';
  console.log('color in server', color);
  resp.cookie('color', color);
  resp.status(200).send();
});

//lab-8
baseRouter.get('/lab8', (req, resp) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  resp.sendFile(path.join(__dirname, './client/lab8.html'));
});

baseRouter.get('/lab8-get-my-name', (req, resp) => {
  resp.json('vladosik');
});
