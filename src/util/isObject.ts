export default function isObject<T>(argument: T): argument is T & object {
  return typeof argument === 'object' && argument !== null;
}