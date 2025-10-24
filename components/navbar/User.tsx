import UserImage from "@/public/images/user.jpg";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function User() {
  const { user } = useUser();
  const profileImage = user?.imageUrl;

  return (
    <div className="relative grid h-6 w-6 place-items-center">
      <Image
        src={profileImage ? profileImage : UserImage}
        alt="User avatar"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-full object-cover"
      />
    </div>
  );
}
