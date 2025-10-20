

export default function Loader({message}:{message?:string}) {
  if (!message) {
    message = "Loading...";
  }
  return (
      <p>{message}</p>
  );
}
