export default function debounce(callback: (value: any) => void, delay: number) {
  let timeout;
  return function (argument) {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay, argument);
  };
}
