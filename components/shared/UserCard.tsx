import Link from "next/link";

import { Button } from "../ui/button";

type UserCardProps = {
  user: any;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link href={`/profile/${user.$id || user.id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14 object-cover"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-slate-400 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        className="bg-white text-black px-5 hover:scale-110 transition hover:bg-dark-4 hover:text-white `"
      >
        Visit Profile
      </Button>
    </Link>
  );
};

export default UserCard;
