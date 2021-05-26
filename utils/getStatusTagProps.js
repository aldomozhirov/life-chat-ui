export default (status) => {
  switch (status) {
    case 'NEW':
      return {color: 'blue', text: 'Новая'}
    case 'POSTPONED':
      return {color: 'yellow', text: 'Отложена'}
    case 'COMPLETED':
      return {color: 'green', text: 'Завершена'}
    default:
      return {color: 'blue', text: 'Неизвестно'}
  }
};
