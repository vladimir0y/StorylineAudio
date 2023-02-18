// Определяем объект AudioContext для работы с аудио
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Определяем переменные для работы с микрофоном и записью звука
var microphoneStream;
var microphoneRecorder;

// Функция для начала записи аудио
function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      microphoneStream = stream;
      microphoneRecorder = new MediaRecorder(microphoneStream);

      microphoneRecorder.start();
      console.log("Запись аудио начата.");

      microphoneRecorder.ondataavailable = function(e) {
        console.log("Запись аудио завершена.");
        var audioBlob = e.data;
        var audioUrl = URL.createObjectURL(audioBlob);
        // Отправляем аудиофайл на сервер или сохраняем его на локальный диск
      }
    })
    .catch(function(err) {
      console.log("Ошибка при записи аудио: " + err);
    });
}

// Функция для остановки записи аудио
function stopRecording() {
  microphoneRecorder.stop();
  microphoneStream.getTracks().forEach(function(track) {
    track.stop();
  });
}
