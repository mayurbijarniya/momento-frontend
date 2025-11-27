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


export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
