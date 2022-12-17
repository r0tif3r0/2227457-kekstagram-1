export const getData = (onSuccess, onError) => fetch(
  'https://26.javascript.pages.academy/kekstagram/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

export const sendData = (onSuccess, onError, body) => fetch(
  'https://26.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body,
  },
)
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  })
  .catch((err) => {
    onError(err);
  });
