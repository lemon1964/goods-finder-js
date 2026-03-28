// src/components/ui/EmptyState.js
import Link from "next/link";

/*
  EmptyState — простой UI-блок без логики.
  Используется в местах, где данных нет или список пуст.
*/
export default function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  secondaryHref,
  secondaryLabel,
}) {
  return (
    <div className="app-card app-empty">
      <div className="app-empty__title">{title}</div>

      {description ? <div className="app-empty__desc">{description}</div> : null}

      <div className="app-empty__actions">
        {actionHref ? (
          <Link href={actionHref} className="app-btn app-btn-primary">
            {actionLabel}
          </Link>
        ) : null}

        {secondaryHref ? (
          <Link href={secondaryHref} className="app-btn app-btn-ghost">
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
