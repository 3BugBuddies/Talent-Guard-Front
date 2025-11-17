import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <Link to="/login">
      <button
        className="
    w-[17.1875rem] h-[3.8125rem] flex-shrink-0
    rounded-[0.625rem] border-2 border-[var(--Azul,#2F80ED)]
    bg-[var(--Neutrals-White,#FFF)]
    text-[var(--Azul,#2F80ED)]  text-[1.5rem]
    font-bold leading-none
    text-center flex items-center justify-center
  "
      >
        Entrar na Minha Conta
      </button>
    </Link>
  );
}
