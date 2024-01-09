import React from 'react';
import './VisualEchoComponent.css';

const VisualEchoComponent = () => {
  const submitForm = async () => {
    const textInput = document.getElementById('text').value;
    const imageContainer = document.getElementById('imageContainer');

    try {
      imageContainer.innerHTML = 'Loading...';

      const formData = new FormData();
      formData.append('text', textInput);

      const response = await fetch('http://127.0.0.1:8000/process_text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server response was not ok');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      // Создаем изображение и добавляем его в контейнер
      const image = new Image();
      image.src = imageUrl;
      imageContainer.innerHTML = '';
      imageContainer.appendChild(image);
    } catch (error) {
      console.error('Error:', error);
      imageContainer.innerHTML = 'Error fetching data from the server';
    }
  };

  return (
    <div className="visual-echo-container">
      <h1>Visual Echo</h1>
      <div id="textInputContainer">
        <form id="textForm" action="http://127.0.0.1:8000/process_text" method="post">
          <label htmlFor="text">Введите текст:</label>
          <input type="text" id="text" name="text" required />
          <button type="button" onClick={submitForm}>
            Отправить
          </button>
        </form>
      </div>
      <div id="imageContainer"></div>
    </div>
  );
};

export default VisualEchoComponent;
