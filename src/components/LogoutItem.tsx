import { signOut } from "@/auth";
import Image from "next/image";
export default function LogoutItem({ item }: { item: any }) {
    return (
      <form
        action={async () => {
          await signOut({ redirectTo: '/auth/login' });
        }}
      >
        <button type="submit"
          className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 w-full"
        >
          <Image src={item.icon} alt="" width={20} height={20} />
          <span className="hidden lg:block">{item.label}</span>
        </button>
      </form>
    );
  }