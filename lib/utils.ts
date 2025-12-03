import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function timeAgo(dateString: string | undefined): string {
  if(dateString === undefined){
    return 'Never'
  }
  
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(dateString);

  const timeDifference: number = currentDate.getTime() - inputDate.getTime();
  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (hours < 24) {
    if (hours > 1) {
      return `${hours} hrs ago`;
    } else if (hours === 1) {
      return '1 hr ago';
    } else if (minutes > 1) {
      return `${minutes} mins ago`;
    } else if (minutes === 1) {
      return '1 min ago';
    } else {
      return 'Just now';
    }
  }

  const day = inputDate.getDate();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthNames[inputDate.getMonth()];
  const year = inputDate.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function formatMessageTime(dateString: string | undefined): string {
  if (!dateString) {
    return '';
  }

  const currentDate = new Date();
  const messageDate = new Date(dateString);
  const timeDifference = currentDate.getTime() - messageDate.getTime();
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 24) {
    const minutes = Math.floor(timeDifference / (1000 * 60));
    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    }
  }

  if (days < 7) {
    if (days === 1) {
      return 'Yesterday';
    }
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[messageDate.getDay()];
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[messageDate.getMonth()];
  const day = messageDate.getDate();
  const year = messageDate.getFullYear();
  const currentYear = currentDate.getFullYear();

  if (year === currentYear) {
    return `${month} ${day}`;
  } else {
    return `${month} ${day}, ${year}`;
  }
}


export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
