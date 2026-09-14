"use client";

import { useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import ReviewForm from "@/components/forms/ReviewForm";

export default function ReviewDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => { dialog.current?.close(); trigger.current?.focus(); };

  return <><button className="button button-secondary" ref={trigger} onClick={() => dialog.current?.showModal()}>Share Your Experience<ArrowUpRight size={16} /></button><dialog ref={dialog} className="review-dialog" aria-labelledby="review-dialog-title" onClick={event => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
  }} onCancel={close}><div className="review-dialog-header"><div><p className="eyebrow">YOUR EXPERIENCE MATTERS</p><h2 id="review-dialog-title">Share your experience.</h2></div><button className="dialog-close" type="button" aria-label="Close review form" onClick={close}><X size={22} /></button></div><ReviewForm /></dialog></>;
}
