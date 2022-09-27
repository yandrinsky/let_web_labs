import { Router } from 'express';

export const baseRouter = new Router();

//1-2 labs
baseRouter.get('/', (req, resp) => {
  resp.status(400).json({ message: 'hello' });
});

//3 lab
baseRouter.get('/math', (req, resp) => {
  resp
    .status(400)
    .json({ result: req.query.arg?.map(item => Number(item)).reduce((acc, item) => item + acc) });
});

//4 lab
baseRouter.get('/giveMeLocal', (req, resp) => {
  const messages = {
    ru: 'Привет Мир',
    en: 'Hello world'
  };

  const lang = req.query.lang?.toLowerCase();
  const message = messages[lang] ?? 'Unsupportable language';

  resp.status(400).send(
    `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<b>${message}</b>
</body>
</html>`
  );
});

//5 lab
baseRouter.get('/formValidate', (req, resp) => {
  const sendBadResponse = () => resp.status(401).send('validation failed');
  const sendGoodResponse = () => resp.status(200).send('validation passed');

  const validate = ({ stringField, numberField }) => {
    if (!stringField) {
      return sendBadResponse();
    }
    if (!numberField) {
      return sendBadResponse();
    }

    if (Number.isNaN(Number(numberField))) {
      return sendBadResponse();
    }

    if (Number(numberField) < 10 || Number(numberField) > 100000) {
      return sendBadResponse();
    }

    return sendGoodResponse();
  };

  validate({ stringField: req.query.stringField, numberField: req.query.numberField });
});

//5 lab
baseRouter.get('/form', (req, resp) => {
  resp.status(400).send(
    `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<form action="http://localhost:5010/formValidate">
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
  const sendBadValidationResponse = () => resp.status(401).send('validation failed');
  const sendGoodResponse = () => resp.status(200).send('login');
  const sendBadResponse = () => resp.status(401).send('authorization failed');

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
  resp.status(400).send(
    `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<form method="post" action="https://localhost:5010/login">
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
