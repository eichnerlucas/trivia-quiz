export default function Button({ className, link, text }) {
  return (
    <a className={className} href={link}>
      {text}
    </a>
  )
}