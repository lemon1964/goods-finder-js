// src/app/(site)/about/page.js
import { redirect } from "next/navigation";

/*
  Страница About больше не является частью витрины.
  Старый адрес сохраняется и ведёт на Главную.
*/
export default function AboutPage() {
  redirect("/");
}
