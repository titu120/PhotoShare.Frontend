// Backend এর TimeAgoHelper.cs এর মতোই, শুধু JavaScript ভার্সন
export function timeAgo(dateString) {
  const now = new Date();
  const created = new Date(dateString);
  const seconds = Math.floor((now - created) / 1000);

  if (seconds < 60) return "এইমাত্র";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} মিনিট আগে`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ঘণ্টা আগে`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} দিন আগে`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} মাস আগে`;

  return `${Math.floor(months / 12)} বছর আগে`;
}