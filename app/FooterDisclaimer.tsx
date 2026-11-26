"use client";

import { useRef } from "react";

export default function FooterDisclaimer() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button className="disclaimer-trigger" type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
        Disclaimer
      </button>
      <dialog className="disclaimer-dialog" ref={dialog} aria-labelledby="disclaimer-title">
        <h2 id="disclaimer-title">Disclaimer</h2>
        <p>Melissa Cubillas will connect with the world of Spirit and utilize psychic awareness to provide insights. The readings offered are meant solely for guidance. What you choose to do with the information provided, including any/all actions you take, is entirely your personal responsibility and free will choice. Please note that readings and information provided should never be regarded as legal, medical, financial, psychological, or business advice, and they are subject to your interpretation and judgment. For legal purposes, you are advised that these readings are for entertainment purposes only. Services are not a substitute for professional services, and it is strongly recommended that you seek advice from a qualified expert in the relevant field.</p>
        <form method="dialog">
          <button className="square-button" type="submit">Close</button>
        </form>
      </dialog>
    </>
  );
}
