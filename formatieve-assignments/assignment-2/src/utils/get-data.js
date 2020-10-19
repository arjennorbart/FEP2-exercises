export default function getData(path) {
  return fetch(`/data/${path}.json`)
    .then(res => res.json())
}