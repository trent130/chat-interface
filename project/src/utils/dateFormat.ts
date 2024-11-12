export function formatMessageTime(timestamp: string): string {
  const now = new Date();
  const messageDate = new Date();
  const [time, period] = timestamp.split(' ');
  const [hours, minutes] = time.split(':');
  
  messageDate.setHours(
    period === 'PM' ? parseInt(hours) + 12 : parseInt(hours),
    parseInt(minutes)
  );

  if (messageDate.toDateString() === now.toDateString()) {
    return timestamp;
  } else if (messageDate.getTime() > now.getTime() - 86400000) {
    return 'Yesterday';
  } else {
    return messageDate.toLocaleDateString();
  }
}