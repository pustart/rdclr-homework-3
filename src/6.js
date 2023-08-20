const completionFlags = [];

// Изначальный порядок: [2, 1, 4, 3]
async function asyncActions() {
  // ========== Начало зоны редактирования ===============
  queueMicrotask(() => {
    action('2');
  });

  action('1');

  setTimeout(() => {
    action('4');
  }, 0);

  queueMicrotask(() => {
    action('3');
  });
  // ========== Конец зоны редактирования ===============
}

function action(pos) {
  completionFlags.push(pos);
}

asyncActions();

// Функция для просмотра результата
setTimeout(() => {
  console.log(completionFlags);
}, 100);
