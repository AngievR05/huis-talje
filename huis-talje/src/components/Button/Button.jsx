import "./Button.css";
import shine from "./shine.svg";

export default function Button({
  children,
  variant = "primary",
  disabled = false,
}) {
  return (
    <button
      className={`btn btn--${variant}`}
      disabled={disabled}
    >
      <span className="btn__base" />
      <span className="btn__surface">
        <img src={shine} alt="" className="btn__shine" />
        <span className="btn__label">{children}</span>
      </span>
    </button>
  );
}
