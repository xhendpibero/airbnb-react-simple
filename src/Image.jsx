export default function Image({src,...rest}) {
  src = src && (src.includes('https://') || src.includes(';base64,'))
    ? src
    : 'http://localhost:4000/'+src;
  return (
    <img {...rest} src={src} alt={''} />
  );
}