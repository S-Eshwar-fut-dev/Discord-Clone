// lib/time.ts
export function formatMessageTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  // Today -> show 12h/24h time
  if (diff < oneDay && date.getDate() === now.getDate()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Within 7 days -> weekday + time
  if (diff < oneDay * 7) {
    return `${date.toLocaleDateString([], {
      weekday: "short",
    })} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }

  // Else -> short date + time
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
}
