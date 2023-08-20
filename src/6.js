const completionFlags = [];

async function asyncActions() {
    // ========== Начало зоны редактирования ===============
    action('2');
    action('1');
    action('4');
    action('3');
    // ========== Конец зоны редактирования ===============
}

function action(pos) {
    completionFlags.push(pos);
}
